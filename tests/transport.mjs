import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import axios from 'axios';
import EfiPay from '../dist/esm/index.js';
import { buildHttpsAgent, SDK_IDENTIFIER } from '../dist/esm/httpClient.js';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const originalAdapter = axios.defaults.adapter;

function headersOf(config) {
  return Object.fromEntries(Object.entries(config.headers ?? {}).map(([key, value]) => [key.toLowerCase(), String(value)]));
}

function bodyOf(config) {
  if (typeof config.data !== 'string') return config.data;

  try {
    return JSON.parse(config.data);
  } catch {
    return config.data;
  }
}

function installAdapter(handler) {
  axios.defaults.adapter = async (config) => {
    const data = await handler(config);
    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  };
}

function isAuth(config) {
  return config.url.endsWith('/authorize') || config.url.endsWith('/oauth/token');
}

function authResponse() {
  return {
    access_token: 'access-token',
    expires_in: 3600,
    token_type: 'Bearer',
  };
}

function options(overrides = {}) {
  return {
    sandbox: true,
    client_id: 'client-id',
    client_secret: 'client-secret',
    ...overrides,
  };
}

test.afterEach(() => {
  axios.defaults.adapter = originalAdapter;
});

test('routes path params, query params and body without leaking path params', async () => {
  const requests = [];
  installAdapter((config) => {
    if (isAuth(config)) return authResponse();
    requests.push(config);
    return { ok: true };
  });

  const sdk = new EfiPay(options());
  const body = { items: [{ name: 'Item', value: 100, amount: 1 }] };

  await sdk.createCharge(body);
  await sdk.createCharge({}, body);
  await sdk.detailCharge({ id: 123 });
  await sdk.listCharges({ begin_date: '2026-01-01', end_date: '2026-01-31', limit: 10 });
  await sdk.createChargeCard({ payment: { credit_card: {} }, items: [], customer: {}, tds_info: {} });

  assert.equal(requests[0].url, 'https://cobrancas-h.api.efipay.com.br/v1/charge');
  assert.equal(requests[0].method, 'post');
  assert.deepEqual(bodyOf(requests[0]), body);
  assert.deepEqual(bodyOf(requests[1]), body);
  assert.equal(requests[2].url, 'https://cobrancas-h.api.efipay.com.br/v1/charge/123');
  assert.equal(requests[2].params, undefined);
  assert.deepEqual(requests[3].params, {
    begin_date: '2026-01-01',
    end_date: '2026-01-31',
    limit: 10,
  });
  assert.equal(requests[4].url, 'https://cobrancas-h.api.efipay.com.br/v2/charge/card');
});

test('selects production and sandbox environments', async () => {
  const urls = [];
  installAdapter((config) => {
    urls.push(config.url);
    return isAuth(config) ? authResponse() : {};
  });

  await new EfiPay(options({ sandbox: false })).detailCharge({ id: 1 });
  await new EfiPay(options()).detailCharge({ id: 2 });

  assert.deepEqual(urls, [
    'https://cobrancas.api.efipay.com.br/v1/authorize',
    'https://cobrancas.api.efipay.com.br/v1/charge/1',
    'https://cobrancas-h.api.efipay.com.br/v1/authorize',
    'https://cobrancas-h.api.efipay.com.br/v1/charge/2',
  ]);
});

test('deduplicates concurrent authentication and caches tokens per API', async () => {
  const authUrls = [];
  installAdapter(async (config) => {
    if (isAuth(config)) {
      authUrls.push(config.url);
      await new Promise((resolve) => setTimeout(resolve, 20));
      return authResponse();
    }
    return {};
  });

  const sdk = new EfiPay(options({ certificate: 'AA==', cert_base64: true }));
  await Promise.all([
    sdk.pixDetailCharge({ txid: 'one' }),
    sdk.pixDetailCharge({ txid: 'two' }),
    sdk.pixDetailCharge({ txid: 'three' }),
  ]);
  await sdk.pixDetailCharge({ txid: 'four' });
  await sdk.ofListPixPayment({ identificador: 'payment-id' });
  await sdk.ofListPixPayment({ identificador: 'payment-id' });

  assert.equal(authUrls.filter((url) => url.includes('pix')).length, 1);
  assert.equal(authUrls.filter((url) => url.includes('openfinance')).length, 1);
});

test('does not cache tokens when cache is disabled', async () => {
  let authentications = 0;
  installAdapter((config) => {
    if (isAuth(config)) {
      authentications += 1;
      return authResponse();
    }
    return {};
  });

  const sdk = new EfiPay(options({ cache: false }));
  await sdk.detailCharge({ id: 1 });
  await sdk.detailCharge({ id: 2 });
  assert.equal(authentications, 2);
});

test('restricts idempotency keys to Open Finance with the documented precedence', async () => {
  const requests = [];
  installAdapter((config) => {
    if (isAuth(config)) return authResponse();
    requests.push(config);
    return {};
  });

  const certificate = { certificate: 'AA==', cert_base64: true };
  const withGlobalKey = new EfiPay(options({ ...certificate, idempotencyKey: 'global-key' }));
  await withGlobalKey.detailCharge({ id: 1 });
  await withGlobalKey.ofListPixPayment({ identificador: 'one' });
  await withGlobalKey.ofListPixPayment({ identificador: 'two' }, { 'X-Idempotency-Key': 'request-key' });

  const withGeneratedKey = new EfiPay(options(certificate));
  await withGeneratedKey.ofListPixPayment({ identificador: 'three' });

  assert.equal(headersOf(requests[0])['x-idempotency-key'], undefined);
  assert.equal(headersOf(requests[1])['x-idempotency-key'], 'global-key');
  assert.equal(headersOf(requests[2])['x-idempotency-key'], 'request-key');
  assert.match(headersOf(requests[3])['x-idempotency-key'], /^[A-Za-z0-9]{72}$/);
});

test('only sends the mTLS bypass header while configuring webhooks', async () => {
  const requests = [];
  installAdapter((config) => {
    if (isAuth(config)) return authResponse();
    requests.push(config);
    return {};
  });

  const sdk = new EfiPay(options({
    certificate: 'AA==',
    cert_base64: true,
    validateMtls: false,
  }));

  await sdk.pixConfigWebhook({ chave: 'pix-key' }, { webhookUrl: 'https://example.test/webhook' });
  await sdk.pixDetailCharge({ txid: 'charge-id' });

  assert.equal(headersOf(requests[0])['x-skip-mtls-checking'], 'true');
  assert.equal(headersOf(requests[1])['x-skip-mtls-checking'], undefined);
});

test('fails before authentication when an mTLS API has no certificate', async () => {
  let calls = 0;
  installAdapter(() => {
    calls += 1;
    return authResponse();
  });

  const sdk = new EfiPay(options());
  await assert.rejects(
    sdk.pixDetailCharge({ txid: 'charge-id' }),
    /certificate e obrigatorio para consumir a API PIX/,
  );
  assert.equal(calls, 0);
});

test('supports P12 file/base64 and PEM certificate pairs', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'efi-certificates-'));
  const certificatePath = path.join(directory, 'certificate.pem');
  const keyPath = path.join(directory, 'key.pem');

  try {
    await writeFile(certificatePath, 'certificate-content');
    await writeFile(keyPath, 'key-content');

    const p12FileAgent = buildHttpsAgent({ certificate: certificatePath });
    const pemFileAgent = buildHttpsAgent({ certificate: certificatePath, pemKey: keyPath });
    const p12Base64Agent = buildHttpsAgent({ certificate: Buffer.from('p12').toString('base64'), cert_base64: true });
    const pemBase64Agent = buildHttpsAgent({
      certificate: Buffer.from('certificate').toString('base64'),
      pemKey: Buffer.from('key').toString('base64'),
      cert_base64: true,
    });

    assert.equal(p12FileAgent.options.pfx.toString(), 'certificate-content');
    assert.equal(pemFileAgent.options.cert.toString(), 'certificate-content');
    assert.equal(pemFileAgent.options.key.toString(), 'key-content');
    assert.equal(p12Base64Agent.options.pfx.toString(), 'p12');
    assert.equal(pemBase64Agent.options.cert.toString(), 'certificate');
    assert.equal(pemBase64Agent.options.key.toString(), 'key');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('preserves API error payloads and arraybuffer receipts', async () => {
  let receiptRequest;
  let shouldFail = true;
  const receipt = Buffer.from('receipt');

  installAdapter((config) => {
    if (isAuth(config)) return authResponse();
    if (shouldFail) {
      shouldFail = false;
      throw { response: { data: { nome: 'invalid_request', mensagem: 'Request invalido' } } };
    }
    receiptRequest = config;
    return receipt;
  });

  const sdk = new EfiPay(options({ certificate: 'AA==', cert_base64: true }));
  let error;
  try {
    await sdk.pixDetailCharge({ txid: 'charge-id' });
  } catch (caught) {
    error = caught;
  }

  assert.deepEqual(error, { nome: 'invalid_request', mensagem: 'Request invalido' });
  const response = await sdk.pixGetReceipt({ txid: 'charge-id' });
  assert.equal(receiptRequest.responseType, 'arraybuffer');
  assert.deepEqual(response, receipt);
});

test('keeps api-sdk synchronized with the package version', async () => {
  const headers = [];
  installAdapter((config) => {
    headers.push(headersOf(config));
    return isAuth(config) ? authResponse() : {};
  });

  await new EfiPay(options()).detailCharge({ id: 1 });

  assert.equal(SDK_IDENTIFIER, `efi-node-${packageJson.version}`);
  assert.equal(headers[0]['api-sdk'], SDK_IDENTIFIER);
  assert.equal(headers[1]['api-sdk'], SDK_IDENTIFIER);
});

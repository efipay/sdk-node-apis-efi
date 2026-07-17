import assert from 'node:assert/strict';
import EfiPay from '../dist/esm/index.js';
import { computeCRC } from '../dist/esm/pixStatic.js';

const tlv = (tag, value) => `${tag}${String(value.length).padStart(2, '0')}${value}`;

const sdk = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' });
const staticPix = await sdk.pixGenerateStaticQRCode({
  chave: 'pix@example.test',
  merchantName: 'EFI TESTE',
  merchantCity: 'BELO HORIZONTE',
  transactionAmount: 10,
  txid: 'pedido-1',
});

assert.match(staticPix.qrcode, /^000201/);
assert.equal(staticPix.qrcode.slice(-4), computeCRC(staticPix.qrcode.slice(0, -4)));
assert.match(staticPix.imagemQrcode, /^data:image\/svg\+xml;base64,/);

const merchantAccount = tlv('00', 'br.gov.bcb.pix') + tlv('25', 'example.test/cobv/payload');
let dynamicPix = tlv('00', '01') + tlv('26', merchantAccount) + tlv('52', '0000') + tlv('53', '986');
dynamicPix += tlv('58', 'BR') + tlv('59', 'EFI TESTE') + tlv('60', 'BELO HORIZONTE') + tlv('62', tlv('05', '***'));
dynamicPix += '6304';
dynamicPix += computeCRC(dynamicPix);

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const jwt = `${encode({ alg: 'none' })}.${encode({ txid: 'txid-local', valor: { final: '10.00' } })}.signature`;
const originalFetch = globalThis.fetch;
let requestedUrl;
globalThis.fetch = async (url) => {
  requestedUrl = String(url);
  return { ok: true, text: async () => jwt };
};

try {
  const detail = await sdk.pixQrCodeDetail({ pixCopiaECola: dynamicPix });
  assert.equal(detail.tipoCob, 'cobv');
  assert.equal(detail.txid, 'txid-local');
  assert.match(requestedUrl, /^https:\/\/example\.test\/cobv\/payload\?DPP=/);
} finally {
  globalThis.fetch = originalFetch;
}

await assert.rejects(
  sdk.pixQrCodeDetail({ pixCopiaECola: '   ' }),
  /pixCopiaECola/,
);

console.log('Metodos Pix locais validados sem transporte HTTP do SDK.');

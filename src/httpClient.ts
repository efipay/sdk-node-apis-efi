import axios, { AxiosRequestConfig } from 'axios';
import fs from 'node:fs';
import https from 'node:https';
import { PACKAGE_VERSION } from './version.js';

export interface Endpoint {
  route: string;
  method: string;
  responseType?: AxiosRequestConfig['responseType'];
}

export const SDK_IDENTIFIER = `efi-node-${PACKAGE_VERSION}`;

export interface CertificateOptions {
  certificate?: string;
  pemKey?: string;
  cert_base64?: boolean;
}

export interface HttpClientOptions extends CertificateOptions {
  baseUrl: string;
  endpoint: Endpoint;
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string | number | boolean>;
  partner_token?: string;
  skipMtlsChecking?: boolean;
  authorization?: string;
  idempotencyKey?: string;
}

export function buildHttpsAgent(options: CertificateOptions): https.Agent | undefined {
  if (!options.certificate) return undefined;

  try {
    if (options.cert_base64) {
      if (options.pemKey) {
        return new https.Agent({
          cert: Buffer.from(options.certificate, 'base64'),
          key: Buffer.from(options.pemKey, 'base64'),
          passphrase: '',
        });
      }

      return new https.Agent({
        pfx: Buffer.from(options.certificate, 'base64'),
        passphrase: '',
      });
    }

    if (options.pemKey) {
      return new https.Agent({
        cert: fs.readFileSync(options.certificate),
        key: fs.readFileSync(options.pemKey),
        passphrase: '',
      });
    }

    return new https.Agent({
      pfx: fs.readFileSync(options.certificate),
      passphrase: '',
    });
  } catch (error) {
    throw new Error('Erro ao ler o certificado ou chave: ' + (error as Error).message);
  }
}

function resolveRoute(route: string, params: Record<string, unknown> = {}) {
  const queryParams: Record<string, unknown> = { ...params };

  const resolvedRoute = route.replace(/:([a-zA-Z0-9_]+)/g, (_, key: string) => {
    const value = queryParams[key];
    if (value === undefined || value === null) {
      throw new Error(`Parametro de rota ausente: ${key}`);
    }

    delete queryParams[key];
    return encodeURIComponent(String(value));
  });

  return { route: resolvedRoute, queryParams };
}

function hasQueryParams(params: Record<string, unknown>) {
  return Object.keys(params).some((key) => params[key] !== undefined);
}

function normalizeError(error: any) {
  let errorData = error.response?.data ?? error;
  const errorUrl = error.request?.res?.responseUrl || '';

  if (errorUrl.includes('/v2/gn/pix/comprovantes')) {
    try {
      const decoder = new TextDecoder('utf-8');
      const errorText = decoder.decode(errorData);
      errorData = JSON.parse(errorText);
    } catch {
      errorData = error.response?.data ?? error;
    }
  }

  return errorData;
}

export async function httpRequest<T = unknown>(options: HttpClientOptions): Promise<T> {
  const {
    baseUrl,
    endpoint,
    body,
    params = {},
    headers = {},
    partner_token,
    skipMtlsChecking,
    authorization,
    idempotencyKey,
  } = options;

  const { route, queryParams } = resolveRoute(endpoint.route, params);
  const agent = buildHttpsAgent(options);

  const defaultHeaders: Record<string, string> = {
    'api-sdk': SDK_IDENTIFIER,
    ...(authorization ? { Authorization: authorization } : {}),
    ...(skipMtlsChecking ? { 'x-skip-mtls-checking': 'true' } : {}),
    ...(partner_token ? { 'partner-token': partner_token } : {}),
    ...(idempotencyKey ? { 'x-idempotency-key': idempotencyKey } : {}),
  };

  const config: AxiosRequestConfig = {
    url: baseUrl + route,
    method: endpoint.method.toLowerCase() as AxiosRequestConfig['method'],
    data: body,
    headers: { ...defaultHeaders, ...headers },
    ...(endpoint.responseType ? { responseType: endpoint.responseType } : {}),
    ...(hasQueryParams(queryParams) ? { params: queryParams } : {}),
    ...(agent ? { httpsAgent: agent } : {}),
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

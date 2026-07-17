import axios from 'axios';
import { randomInt } from 'node:crypto';
import { endpoints, type ApiKey } from './constants/endpoints.js';
import { buildHttpsAgent, httpRequest, SDK_IDENTIFIER, type Endpoint } from './httpClient.js';
import { createStaticPix, type StaticPixData, type StaticPixResponse } from './pixStatic.js';
import type * as Types from './types/index.js';

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const TOKEN_EXPIRATION_MARGIN_SECONDS = 30;
const WEBHOOK_CONFIGURATION_ENDPOINTS = new Set([
  'pixConfigWebhook',
  'pixConfigWebhookRecurrenceAutomatic',
  'pixConfigWebhookAutomaticCharge',
  'payConfigWebhook',
  'accountConfigWebhook',
]);

export interface SdkOptions {
  sandbox: boolean;
  client_id: string;
  client_secret: string;
  certificate?: string;
  pemKey?: string;
  cert_base64?: boolean;
  partner_token?: string;
  validateMtls?: boolean;
  cache?: boolean;
  idempotencyKey?: string;
}

interface AuthData {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
  authDate: number;
}

type EndpointContext = {
  apiKey: ApiKey;
  endpoint: Endpoint;
  baseUrl: string;
  authRoute: Endpoint;
};

function generateIdempotencyKey(length = 72) {
  let key = '';
  for (let i = 0; i < length; i += 1) {
    key += ALPHANUMERIC[randomInt(0, ALPHANUMERIC.length)];
  }
  return key;
}

function getBaseUrl(apiKey: ApiKey, sandbox: boolean) {
  const api = endpoints.APIS[apiKey];
  return sandbox ? api.URL.SANDBOX : api.URL.PRODUCTION;
}

function normalizeParams(params?: Types.AnyObject | Types.EmptyParams) {
  return (params ?? {}) as Types.AnyObject;
}

function isEmptyParams(value: unknown): value is Types.EmptyParams {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0;
}

function hasHeader(headers: Types.RequestHeaders | undefined, name: string) {
  const normalizedName = name.toLowerCase();
  return Object.keys(headers ?? {}).some((headerName) => headerName.toLowerCase() === normalizedName);
}

function handleAuthError(authError: any): never {
  const error = authError?.response?.data || authError?.cause || authError;

  switch (error?.message) {
    case 'socket hang up':
      throw new Error('Verifique sandbox e certificate para o ambiente desejado.');
    case 'header too long':
      throw new Error('Verifique se o certificado foi enviado no formato correto.');
    case 'wrong tag':
    case 'error:0909006C:PEM routines:get_name:no start line':
      throw new Error('Foi enviado um certificado .pem sem pemKey correspondente.');
    default:
      throw error;
  }
}

export class EfiPay {
  private readonly options: SdkOptions;
  private readonly authCache = new Map<string, AuthData>();
  private readonly authInFlight = new Map<string, Promise<AuthData>>();

  constructor(options: SdkOptions) {
    if (!options.client_id || !options.client_secret) {
      throw new Error('client_id e client_secret sao obrigatorios');
    }

    this.options = { ...options, cache: options.cache ?? true };
  }

  private resolveRequestContext(name: string): EndpointContext {
    const apiKeys = Object.keys(endpoints.APIS) as ApiKey[];
    const defaultEndpoint = endpoints.APIS.DEFAULT.ENDPOINTS[name as keyof typeof endpoints.APIS.DEFAULT.ENDPOINTS];

    if (defaultEndpoint) {
      return {
        apiKey: 'DEFAULT',
        endpoint: defaultEndpoint,
        baseUrl: getBaseUrl('DEFAULT', this.options.sandbox),
        authRoute: endpoints.APIS.DEFAULT.ENDPOINTS.authorize,
      };
    }

    for (const apiKey of apiKeys) {
      const endpoint = endpoints.APIS[apiKey].ENDPOINTS[name as keyof (typeof endpoints.APIS)[typeof apiKey]['ENDPOINTS']];
      if (endpoint) {
        return {
          apiKey,
          endpoint,
          baseUrl: getBaseUrl(apiKey, this.options.sandbox),
          authRoute: endpoints.APIS[apiKey].ENDPOINTS.authorize,
        };
      }
    }

    throw new Error(`Endpoint "${name}" nao encontrado`);
  }

  private isExpired(auth: AuthData) {
    if (!this.options.cache) return true;

    const now = Date.now() / 1000;
    return now > auth.authDate + auth.expires_in - TOKEN_EXPIRATION_MARGIN_SECONDS;
  }

  private async authenticate(context: EndpointContext): Promise<AuthData> {
    const cachedAuth = this.authCache.get(context.baseUrl);
    if (cachedAuth && !this.isExpired(cachedAuth)) {
      return cachedAuth;
    }

    const inFlight = this.authInFlight.get(context.baseUrl);
    if (inFlight) return inFlight;

    const authentication = this.requestAuthentication(context);
    this.authInFlight.set(context.baseUrl, authentication);

    try {
      return await authentication;
    } finally {
      if (this.authInFlight.get(context.baseUrl) === authentication) {
        this.authInFlight.delete(context.baseUrl);
      }
    }
  }

  private async requestAuthentication(context: EndpointContext): Promise<AuthData> {

    const authParams: any = {
      method: 'POST',
      url: context.baseUrl + context.authRoute.route,
      headers: {
        'api-sdk': SDK_IDENTIFIER,
      },
      data: {
        grant_type: 'client_credentials',
      },
    };

    if (context.apiKey === 'DEFAULT') {
      authParams.auth = {
        username: this.options.client_id,
        password: this.options.client_secret,
      };
    } else {
      const token = Buffer.from(`${this.options.client_id}:${this.options.client_secret}`).toString('base64');
      authParams.headers.Authorization = `Basic ${token}`;
      authParams.headers['Content-Type'] = 'application/json';
      authParams.httpsAgent = buildHttpsAgent(this.options);
    }

    try {
      const res = await axios(authParams);
      const auth = {
        ...res.data,
        authDate: Date.now() / 1000,
      } as AuthData;
      this.authCache.set(context.baseUrl, auth);
      return auth;
    } catch (error) {
      handleAuthError(error);
    }
  }

  private async call<T = unknown>(
    endpointName: string,
    params?: Types.AnyObject | Types.EmptyParams,
    body?: unknown,
    headers?: Types.RequestHeaders,
  ): Promise<T> {
    const context = this.resolveRequestContext(endpointName);

    if (context.apiKey !== 'DEFAULT' && !this.options.certificate) {
      throw new Error(`certificate e obrigatorio para consumir a API ${context.apiKey}`);
    }

    const auth = await this.authenticate(context);
    const certificateOptions =
      context.apiKey === 'DEFAULT'
        ? {}
        : {
            certificate: this.options.certificate,
            pemKey: this.options.pemKey,
            cert_base64: this.options.cert_base64,
          };

    return httpRequest<T>({
      baseUrl: context.baseUrl,
      endpoint: context.endpoint,
      params: normalizeParams(params),
      body,
      headers,
      authorization: `Bearer ${auth.access_token}`,
      partner_token: this.options.partner_token,
      skipMtlsChecking: WEBHOOK_CONFIGURATION_ENDPOINTS.has(endpointName) && this.options.validateMtls === false,
      idempotencyKey:
        context.apiKey === 'OPENFINANCE' && !hasHeader(headers, 'x-idempotency-key')
          ? this.options.idempotencyKey ?? generateIdempotencyKey()
          : undefined,
      ...certificateOptions,
    });
  }

  private callBodyEndpoint<T>(
    endpointName: string,
    bodyOrParams: unknown,
    bodyOrHeaders?: unknown,
    legacyHeaders?: Types.RequestHeaders,
  ): Promise<T> {
    if (isEmptyParams(bodyOrParams)) {
      return this.call<T>(endpointName, {}, bodyOrHeaders, legacyHeaders);
    }

    return this.call<T>(endpointName, {}, bodyOrParams, bodyOrHeaders as Types.RequestHeaders | undefined);
  }

  private callWithoutParams<T>(
    endpointName: string,
    paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders,
    legacyHeaders?: Types.RequestHeaders,
  ): Promise<T> {
    const headers = isEmptyParams(paramsOrHeaders) ? legacyHeaders : paramsOrHeaders;
    return this.call<T>(endpointName, {}, undefined, headers);
  }

  // Cobranças
  createOneStepCharge(body: Types.CreateOneStepChargeBody, headers?: Types.RequestHeaders): Promise<Types.CreateOneStepChargeResponse>;
  /** @deprecated Use createOneStepCharge(body, headers?). */
  createOneStepCharge(params: Types.EmptyParams, body: Types.CreateOneStepChargeBody, headers?: Types.RequestHeaders): Promise<Types.CreateOneStepChargeResponse>;
  createOneStepCharge(bodyOrParams: Types.CreateOneStepChargeBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateOneStepChargeBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateOneStepChargeResponse>('createOneStepCharge', bodyOrParams, bodyOrHeaders, headers);
  }

  createCharge(body: Types.CreateChargeBody, headers?: Types.RequestHeaders): Promise<Types.CreateChargeResponse>;
  /** @deprecated Use createCharge(body, headers?). */
  createCharge(params: Types.EmptyParams, body: Types.CreateChargeBody, headers?: Types.RequestHeaders): Promise<Types.CreateChargeResponse>;
  createCharge(bodyOrParams: Types.CreateChargeBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateChargeBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateChargeResponse>('createCharge', bodyOrParams, bodyOrHeaders, headers);
  }

  definePayMethod(params: Types.DefinePayMethodParams, body: Types.DefinePayMethodBody, headers?: Types.RequestHeaders): Promise<Types.DefinePayMethodResponse> {
    return this.call<Types.DefinePayMethodResponse>('definePayMethod', params, body, headers);
  }

  detailCharge(params: Types.DetailChargeParams, headers?: Types.RequestHeaders): Promise<Types.DetailChargeResponse> {
    return this.call<Types.DetailChargeResponse>('detailCharge', params, undefined, headers);
  }

  listCharges(params: Types.ListChargesParams, headers?: Types.RequestHeaders): Promise<Types.ListChargesResponse> {
    return this.call<Types.ListChargesResponse>('listCharges', params, undefined, headers);
  }

  updateChargeMetadata(params: Types.UpdateChargeMetadataParams, body: Types.UpdateChargeMetadataBody, headers?: Types.RequestHeaders): Promise<Types.UpdateChargeMetadataResponse> {
    return this.call<Types.UpdateChargeMetadataResponse>('updateChargeMetadata', params, body, headers);
  }

  updateBillet(params: Types.UpdateBilletParams, body: Types.UpdateBilletBody, headers?: Types.RequestHeaders): Promise<Types.UpdateBilletResponse> {
    return this.call<Types.UpdateBilletResponse>('updateBillet', params, body, headers);
  }

  cancelCharge(params: Types.CancelChargeParams, headers?: Types.RequestHeaders): Promise<Types.CancelChargeResponse> {
    return this.call<Types.CancelChargeResponse>('cancelCharge', params, undefined, headers);
  }

  sendBilletEmail(params: Types.SendBilletEmailParams, body?: Types.SendBilletEmailBody, headers?: Types.RequestHeaders): Promise<Types.SendBilletEmailResponse> {
    return this.call<Types.SendBilletEmailResponse>('sendBilletEmail', params, body, headers);
  }

  createChargeHistory(params: Types.CreateChargeHistoryParams, body: Types.CreateChargeHistoryBody, headers?: Types.RequestHeaders): Promise<Types.CreateChargeHistoryResponse> {
    return this.call<Types.CreateChargeHistoryResponse>('createChargeHistory', params, body, headers);
  }

  defineBalanceSheetBillet(params: Types.DefineBalanceSheetBilletParams, body: Types.DefineBalanceSheetBilletBody, headers?: Types.RequestHeaders): Promise<Types.DefineBalanceSheetBilletResponse> {
    return this.call<Types.DefineBalanceSheetBilletResponse>('defineBalanceSheetBillet', params, body, headers);
  }

  settleCharge(params: Types.SettleChargeParams, headers?: Types.RequestHeaders): Promise<Types.SettleChargeResponse> {
    return this.call<Types.SettleChargeResponse>('settleCharge', params, undefined, headers);
  }

  cardPaymentRetry(params: Types.CardPaymentRetryParams, body: Types.CardPaymentRetryBody, headers?: Types.RequestHeaders): Promise<Types.CardPaymentRetryResponse> {
    return this.call<Types.CardPaymentRetryResponse>('cardPaymentRetry', params, body, headers);
  }

  refundCard(params: Types.RefundCardParams, body: Types.RefundCardBody, headers?: Types.RequestHeaders): Promise<Types.RefundCardResponse> {
    return this.call<Types.RefundCardResponse>('refundCard', params, body, headers);
  }

  getInstallments(params: Types.GetInstallmentsParams, headers?: Types.RequestHeaders): Promise<Types.GetInstallmentsResponse> {
    return this.call<Types.GetInstallmentsResponse>('getInstallments', params, undefined, headers);
  }

  createCarnet(body: Types.CreateCarnetBody, headers?: Types.RequestHeaders): Promise<Types.CreateCarnetResponse>;
  /** @deprecated Use createCarnet(body, headers?). */
  createCarnet(params: Types.EmptyParams, body: Types.CreateCarnetBody, headers?: Types.RequestHeaders): Promise<Types.CreateCarnetResponse>;
  createCarnet(bodyOrParams: Types.CreateCarnetBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateCarnetBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateCarnetResponse>('createCarnet', bodyOrParams, bodyOrHeaders, headers);
  }

  detailCarnet(params: Types.DetailCarnetParams, headers?: Types.RequestHeaders): Promise<Types.DetailCarnetResponse> {
    return this.call<Types.DetailCarnetResponse>('detailCarnet', params, undefined, headers);
  }

  updateCarnetMetadata(params: Types.UpdateCarnetMetadataParams, body: Types.UpdateCarnetMetadataBody, headers?: Types.RequestHeaders): Promise<Types.UpdateCarnetMetadataResponse> {
    return this.call<Types.UpdateCarnetMetadataResponse>('updateCarnetMetadata', params, body, headers);
  }

  updateCarnetParcel(params: Types.UpdateCarnetParcelParams, body: Types.UpdateCarnetParcelBody, headers?: Types.RequestHeaders): Promise<Types.UpdateCarnetParcelResponse> {
    return this.call<Types.UpdateCarnetParcelResponse>('updateCarnetParcel', params, body, headers);
  }

  updateCarnetParcels(params: Types.UpdateCarnetParcelsParams, body: Types.UpdateCarnetParcelsBody, headers?: Types.RequestHeaders): Promise<Types.UpdateCarnetParcelsResponse> {
    return this.call<Types.UpdateCarnetParcelsResponse>('updateCarnetParcels', params, body, headers);
  }

  cancelCarnet(params: Types.CancelCarnetParams, headers?: Types.RequestHeaders): Promise<Types.CancelCarnetResponse> {
    return this.call<Types.CancelCarnetResponse>('cancelCarnet', params, undefined, headers);
  }

  cancelCarnetParcel(params: Types.CancelCarnetParcelParams, headers?: Types.RequestHeaders): Promise<Types.CancelCarnetParcelResponse> {
    return this.call<Types.CancelCarnetParcelResponse>('cancelCarnetParcel', params, undefined, headers);
  }

  sendCarnetEmail(params: Types.SendCarnetEmailParams, body?: Types.SendCarnetEmailBody, headers?: Types.RequestHeaders): Promise<Types.SendCarnetEmailResponse> {
    return this.call<Types.SendCarnetEmailResponse>('sendCarnetEmail', params, body, headers);
  }

  sendCarnetParcelEmail(params: Types.SendCarnetParcelEmailParams, body?: Types.SendCarnetParcelEmailBody, headers?: Types.RequestHeaders): Promise<Types.SendCarnetParcelEmailResponse> {
    return this.call<Types.SendCarnetParcelEmailResponse>('sendCarnetParcelEmail', params, body, headers);
  }

  createCarnetHistory(params: Types.CreateCarnetHistoryParams, body: Types.CreateCarnetHistoryBody, headers?: Types.RequestHeaders): Promise<Types.CreateCarnetHistoryResponse> {
    return this.call<Types.CreateCarnetHistoryResponse>('createCarnetHistory', params, body, headers);
  }

  settleCarnet(params: Types.SettleCarnetParams, headers?: Types.RequestHeaders): Promise<Types.SettleCarnetResponse> {
    return this.call<Types.SettleCarnetResponse>('settleCarnet', params, undefined, headers);
  }

  settleCarnetParcel(params: Types.SettleCarnetParcelParams, headers?: Types.RequestHeaders): Promise<Types.SettleCarnetParcelResponse> {
    return this.call<Types.SettleCarnetParcelResponse>('settleCarnetParcel', params, undefined, headers);
  }

  createPlan(body: Types.CreatePlanBody, headers?: Types.RequestHeaders): Promise<Types.CreatePlanResponse>;
  /** @deprecated Use createPlan(body, headers?). */
  createPlan(params: Types.EmptyParams, body: Types.CreatePlanBody, headers?: Types.RequestHeaders): Promise<Types.CreatePlanResponse>;
  createPlan(bodyOrParams: Types.CreatePlanBody | Types.EmptyParams, bodyOrHeaders?: Types.CreatePlanBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreatePlanResponse>('createPlan', bodyOrParams, bodyOrHeaders, headers);
  }

  listPlans(params?: Types.ListPlansParams, headers?: Types.RequestHeaders): Promise<Types.ListPlansResponse> {
    return this.call<Types.ListPlansResponse>('listPlans', params, undefined, headers);
  }

  updatePlan(params: Types.UpdatePlanParams, body: Types.UpdatePlanBody, headers?: Types.RequestHeaders): Promise<Types.UpdatePlanResponse> {
    return this.call<Types.UpdatePlanResponse>('updatePlan', params, body, headers);
  }

  deletePlan(params: Types.DeletePlanParams, headers?: Types.RequestHeaders): Promise<Types.DeletePlanResponse> {
    return this.call<Types.DeletePlanResponse>('deletePlan', params, undefined, headers);
  }

  createOneStepSubscription(params: Types.CreateOneStepSubscriptionParams, body: Types.CreateOneStepSubscriptionBody, headers?: Types.RequestHeaders): Promise<Types.CreateOneStepSubscriptionResponse> {
    return this.call<Types.CreateOneStepSubscriptionResponse>('createOneStepSubscription', params, body, headers);
  }

  createSubscription(params: Types.CreateSubscriptionParams, body: Types.CreateSubscriptionBody, headers?: Types.RequestHeaders): Promise<Types.CreateSubscriptionResponse> {
    return this.call<Types.CreateSubscriptionResponse>('createSubscription', params, body, headers);
  }

  defineSubscriptionPayMethod(params: Types.DefineSubscriptionPayMethodParams, body: Types.DefineSubscriptionPayMethodBody, headers?: Types.RequestHeaders): Promise<Types.DefineSubscriptionPayMethodResponse> {
    return this.call<Types.DefineSubscriptionPayMethodResponse>('defineSubscriptionPayMethod', params, body, headers);
  }

  detailSubscription(params: Types.DetailSubscriptionParams, headers?: Types.RequestHeaders): Promise<Types.DetailSubscriptionResponse> {
    return this.call<Types.DetailSubscriptionResponse>('detailSubscription', params, undefined, headers);
  }

  createOneStepSubscriptionLink(params: Types.CreateOneStepSubscriptionLinkParams, body: Types.CreateOneStepSubscriptionLinkBody, headers?: Types.RequestHeaders): Promise<Types.CreateOneStepSubscriptionLinkResponse> {
    return this.call<Types.CreateOneStepSubscriptionLinkResponse>('createOneStepSubscriptionLink', params, body, headers);
  }

  updateSubscriptionMetadata(params: Types.UpdateSubscriptionMetadataParams, body: Types.UpdateSubscriptionMetadataBody, headers?: Types.RequestHeaders): Promise<Types.UpdateSubscriptionMetadataResponse> {
    return this.call<Types.UpdateSubscriptionMetadataResponse>('updateSubscriptionMetadata', params, body, headers);
  }

  updateSubscription(params: Types.UpdateSubscriptionParams, body: Types.UpdateSubscriptionBody, headers?: Types.RequestHeaders): Promise<Types.UpdateSubscriptionResponse> {
    return this.call<Types.UpdateSubscriptionResponse>('updateSubscription', params, body, headers);
  }

  cancelSubscription(params: Types.CancelSubscriptionParams, headers?: Types.RequestHeaders): Promise<Types.CancelSubscriptionResponse> {
    return this.call<Types.CancelSubscriptionResponse>('cancelSubscription', params, undefined, headers);
  }

  createSubscriptionHistory(params: Types.CreateSubscriptionHistoryParams, body: Types.CreateSubscriptionHistoryBody, headers?: Types.RequestHeaders): Promise<Types.CreateSubscriptionHistoryResponse> {
    return this.call<Types.CreateSubscriptionHistoryResponse>('createSubscriptionHistory', params, body, headers);
  }

  sendSubscriptionLinkEmail(params: Types.SendSubscriptionLinkEmailParams, body?: Types.SendSubscriptionLinkEmailBody, headers?: Types.RequestHeaders): Promise<Types.SendSubscriptionLinkEmailResponse> {
    return this.call<Types.SendSubscriptionLinkEmailResponse>('sendSubscriptionLinkEmail', params, body, headers);
  }

  createOneStepLink(body: Types.CreateOneStepLinkBody, headers?: Types.RequestHeaders): Promise<Types.CreateOneStepLinkResponse>;
  /** @deprecated Use createOneStepLink(body, headers?). */
  createOneStepLink(params: Types.EmptyParams, body: Types.CreateOneStepLinkBody, headers?: Types.RequestHeaders): Promise<Types.CreateOneStepLinkResponse>;
  createOneStepLink(bodyOrParams: Types.CreateOneStepLinkBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateOneStepLinkBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateOneStepLinkResponse>('createOneStepLink', bodyOrParams, bodyOrHeaders, headers);
  }

  defineLinkPayMethod(params: Types.DefineLinkPayMethodParams, body: Types.DefineLinkPayMethodBody, headers?: Types.RequestHeaders): Promise<Types.DefineLinkPayMethodResponse> {
    return this.call<Types.DefineLinkPayMethodResponse>('defineLinkPayMethod', params, body, headers);
  }

  updateChargeLink(params: Types.UpdateChargeLinkParams, body: Types.UpdateChargeLinkBody, headers?: Types.RequestHeaders): Promise<Types.UpdateChargeLinkResponse> {
    return this.call<Types.UpdateChargeLinkResponse>('updateChargeLink', params, body, headers);
  }

  sendLinkEmail(params: Types.SendLinkEmailParams, body?: Types.SendLinkEmailBody, headers?: Types.RequestHeaders): Promise<Types.SendLinkEmailResponse> {
    return this.call<Types.SendLinkEmailResponse>('sendLinkEmail', params, body, headers);
  }

  getNotification(params: Types.GetNotificationParams, headers?: Types.RequestHeaders): Promise<Types.GetNotificationResponse> {
    return this.call<Types.GetNotificationResponse>('getNotification', params, undefined, headers);
  }

  createChargeCard(body: Types.CreateChargeCardBody, headers?: Types.RequestHeaders): Promise<Types.CreateChargeCardResponse>;
  /** @deprecated Use createChargeCard(body, headers?). */
  createChargeCard(params: Types.EmptyParams, body: Types.CreateChargeCardBody, headers?: Types.RequestHeaders): Promise<Types.CreateChargeCardResponse>;
  createChargeCard(bodyOrParams: Types.CreateChargeCardBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateChargeCardBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateChargeCardResponse>('createChargeCard', bodyOrParams, bodyOrHeaders, headers);
  }

  // Pix
  pixCreateImmediateCharge(body: Types.PixCreateImmediateChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateImmediateChargeResponse>;
  /** @deprecated Use pixCreateImmediateCharge(body, headers?). */
  pixCreateImmediateCharge(params: Types.EmptyParams, body: Types.PixCreateImmediateChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateImmediateChargeResponse>;
  pixCreateImmediateCharge(bodyOrParams: Types.PixCreateImmediateChargeBody | Types.EmptyParams, bodyOrHeaders?: Types.PixCreateImmediateChargeBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixCreateImmediateChargeResponse>('pixCreateImmediateCharge', bodyOrParams, bodyOrHeaders, headers);
  }

  pixCreateCharge(params: Types.PixCreateChargeParams, body: Types.PixCreateChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateChargeResponse> {
    return this.call<Types.PixCreateChargeResponse>('pixCreateCharge', params, body, headers);
  }

  pixUpdateCharge(params: Types.PixUpdateChargeParams, body: Types.PixUpdateChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixUpdateChargeResponse> {
    return this.call<Types.PixUpdateChargeResponse>('pixUpdateCharge', params, body, headers);
  }

  pixDetailCharge(params: Types.PixDetailChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailChargeResponse> {
    return this.call<Types.PixDetailChargeResponse>('pixDetailCharge', params, undefined, headers);
  }

  pixListCharges(params: Types.PixListChargesParams, headers?: Types.RequestHeaders): Promise<Types.PixListChargesResponse> {
    return this.call<Types.PixListChargesResponse>('pixListCharges', params, undefined, headers);
  }

  pixCreateDueCharge(params: Types.PixCreateDueChargeParams, body: Types.PixCreateDueChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateDueChargeResponse> {
    return this.call<Types.PixCreateDueChargeResponse>('pixCreateDueCharge', params, body, headers);
  }

  pixUpdateDueCharge(params: Types.PixUpdateDueChargeParams, body: Types.PixUpdateDueChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixUpdateDueChargeResponse> {
    return this.call<Types.PixUpdateDueChargeResponse>('pixUpdateDueCharge', params, body, headers);
  }

  pixDetailDueCharge(params: Types.PixDetailDueChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailDueChargeResponse> {
    return this.call<Types.PixDetailDueChargeResponse>('pixDetailDueCharge', params, undefined, headers);
  }

  pixListDueCharges(params: Types.PixListDueChargesParams, headers?: Types.RequestHeaders): Promise<Types.PixListDueChargesResponse> {
    return this.call<Types.PixListDueChargesResponse>('pixListDueCharges', params, undefined, headers);
  }

  pixSend(params: Types.PixSendParams, body: Types.PixSendBody, headers?: Types.RequestHeaders): Promise<Types.PixSendResponse> {
    return this.call<Types.PixSendResponse>('pixSend', params, body, headers);
  }

  pixSendDetail(params: Types.PixSendDetailParams, headers?: Types.RequestHeaders): Promise<Types.PixSendDetailResponse> {
    return this.call<Types.PixSendDetailResponse>('pixSendDetail', params, undefined, headers);
  }

  pixSendDetailId(params: Types.PixSendDetailIdParams, headers?: Types.RequestHeaders): Promise<Types.PixSendDetailIdResponse> {
    return this.call<Types.PixSendDetailIdResponse>('pixSendDetailId', params, undefined, headers);
  }

  pixSendList(params: Types.PixSendListParams, headers?: Types.RequestHeaders): Promise<Types.PixSendListResponse> {
    return this.call<Types.PixSendListResponse>('pixSendList', params, undefined, headers);
  }

  pixQrCodeDetail(body: Types.PixQrCodeDetailBody): Promise<Types.PixQrCodeDetailResponse>;
  /** @deprecated Use pixQrCodeDetail(body). */
  pixQrCodeDetail(params: Types.EmptyParams, body: Types.PixQrCodeDetailBody): Promise<Types.PixQrCodeDetailResponse>;
  async pixQrCodeDetail(bodyOrParams: Types.PixQrCodeDetailBody | Types.EmptyParams, legacyBody?: Types.PixQrCodeDetailBody): Promise<Types.PixQrCodeDetailResponse> {
    const payload = legacyBody ?? (bodyOrParams as Types.PixQrCodeDetailBody);
    if (!payload || typeof payload.pixCopiaECola !== 'string' || payload.pixCopiaECola.trim() === '') {
      throw new Error('O campo "pixCopiaECola" e obrigatorio e deve ser uma string.');
    }

    const { getDecodedPixJwt } = await import('pix-qr-code-detail');
    const decoded = await getDecodedPixJwt(payload.pixCopiaECola);
    const tipoCob = payload.pixCopiaECola.includes('/cobv/') ? 'cobv' : 'cob';
    if (decoded.payload && typeof decoded.payload === 'object') {
      return { tipoCob, ...(decoded.payload as Types.AnyObject) } as Types.PixQrCodeDetailResponse;
    }
    return decoded.payload as unknown as Types.PixQrCodeDetailResponse;
  }

  pixQrCodePay(params: Types.PixQrCodePayParams, body: Types.PixQrCodeBody, headers?: Types.RequestHeaders): Promise<Types.PixQrCodePayResponse> {
    return this.call<Types.PixQrCodePayResponse>('pixQrCodePay', params, body, headers);
  }

  pixDetailReceived(params: Types.PixDetailReceivedParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailReceivedResponse> {
    return this.call<Types.PixDetailReceivedResponse>('pixDetailReceived', params, undefined, headers);
  }

  pixReceivedList(params: Types.PixListReceivedParams, headers?: Types.RequestHeaders): Promise<Types.PixListReceivedResponse> {
    return this.call<Types.PixListReceivedResponse>('pixReceivedList', params, undefined, headers);
  }

  pixDevolution(params: Types.PixDevolutionParams, body: Types.PixDevolutionBody, headers?: Types.RequestHeaders): Promise<Types.PixDevolutionResponse> {
    return this.call<Types.PixDevolutionResponse>('pixDevolution', params, body, headers);
  }

  pixDetailDevolution(params: Types.PixDetailDevolutionParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailDevolutionResponse> {
    return this.call<Types.PixDetailDevolutionResponse>('pixDetailDevolution', params, undefined, headers);
  }

  pixCreateLocation(body: Types.PixCreateLocationBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateLocationResponse>;
  /** @deprecated Use pixCreateLocation(body, headers?). */
  pixCreateLocation(params: Types.EmptyParams, body: Types.PixCreateLocationBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateLocationResponse>;
  pixCreateLocation(bodyOrParams: Types.PixCreateLocationBody | Types.EmptyParams, bodyOrHeaders?: Types.PixCreateLocationBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixCreateLocationResponse>('pixCreateLocation', bodyOrParams, bodyOrHeaders, headers);
  }

  pixLocationList(params: Types.PixLocationListParams, headers?: Types.RequestHeaders): Promise<Types.PixLocationListResponse> {
    return this.call<Types.PixLocationListResponse>('pixLocationList', params, undefined, headers);
  }

  pixDetailLocation(params: Types.PixDetailLocationParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailLocationResponse> {
    return this.call<Types.PixDetailLocationResponse>('pixDetailLocation', params, undefined, headers);
  }

  pixGenerateQRCode(params: Types.PixGenerateQRCodeParams, headers?: Types.RequestHeaders): Promise<Types.PixGenerateQRCodeResponse> {
    return this.call<Types.PixGenerateQRCodeResponse>('pixGenerateQRCode', params, undefined, headers);
  }

  pixUnlinkTxidLocation(params: Types.PixUnlinkTxidLocationParams, headers?: Types.RequestHeaders): Promise<Types.PixUnlinkTxidLocationResponse> {
    return this.call<Types.PixUnlinkTxidLocationResponse>('pixUnlinkTxidLocation', params, undefined, headers);
  }

  pixCreateDueChargeBatch(params: Types.PixCreateDueChargeBatchParams, body: Types.PixCreateDueChargeBatchBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateDueChargeBatchResponse> {
    return this.call<Types.PixCreateDueChargeBatchResponse>('pixCreateDueChargeBatch', params, body, headers);
  }

  pixUpdateDueChargeBatch(params: Types.PixUpdateDueChargeBatchParams, body: Types.PixUpdateDueChargeBatchBody, headers?: Types.RequestHeaders): Promise<Types.PixUpdateDueChargeBatchResponse> {
    return this.call<Types.PixUpdateDueChargeBatchResponse>('pixUpdateDueChargeBatch', params, body, headers);
  }

  pixDetailDueChargeBatch(params: Types.PixDetailDueChargeBatchParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailDueChargeBatchResponse> {
    return this.call<Types.PixDetailDueChargeBatchResponse>('pixDetailDueChargeBatch', params, undefined, headers);
  }

  pixListDueChargeBatch(params: Types.PixListDueChargeBatchParams, headers?: Types.RequestHeaders): Promise<Types.PixListDueChargeBatchResponse> {
    return this.call<Types.PixListDueChargeBatchResponse>('pixListDueChargeBatch', params, undefined, headers);
  }

  pixSplitConfig(body: Types.PixSplitConfigBody, headers?: Types.RequestHeaders): Promise<Types.PixSplitConfigResponse>;
  /** @deprecated Use pixSplitConfig(body, headers?). */
  pixSplitConfig(params: Types.EmptyParams, body: Types.PixSplitConfigBody, headers?: Types.RequestHeaders): Promise<Types.PixSplitConfigResponse>;
  pixSplitConfig(bodyOrParams: Types.PixSplitConfigBody | Types.EmptyParams, bodyOrHeaders?: Types.PixSplitConfigBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixSplitConfigResponse>('pixSplitConfig', bodyOrParams, bodyOrHeaders, headers);
  }

  pixSplitConfigId(params: Types.PixSplitConfigIdParams, body: Types.PixSplitConfigIdBody, headers?: Types.RequestHeaders): Promise<Types.PixSplitConfigIdResponse> {
    return this.call<Types.PixSplitConfigIdResponse>('pixSplitConfigId', params, body, headers);
  }

  pixSplitDetailConfig(params: Types.PixSplitDetailConfigParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitDetailConfigResponse> {
    return this.call<Types.PixSplitDetailConfigResponse>('pixSplitDetailConfig', params, undefined, headers);
  }

  pixSplitLinkCharge(params: Types.PixSplitLinkChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitLinkChargeResponse> {
    return this.call<Types.PixSplitLinkChargeResponse>('pixSplitLinkCharge', params, undefined, headers);
  }

  pixSplitLinkDueCharge(params: Types.PixSplitLinkDueChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitLinkDueChargeResponse> {
    return this.call<Types.PixSplitLinkDueChargeResponse>('pixSplitLinkDueCharge', params, undefined, headers);
  }

  pixSplitUnlinkCharge(params: Types.PixSplitUnlinkChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitUnlinkChargeResponse> {
    return this.call<Types.PixSplitUnlinkChargeResponse>('pixSplitUnlinkCharge', params, undefined, headers);
  }

  pixSplitUnlinkDueCharge(params: Types.PixSplitUnlinkDueChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitUnlinkDueChargeResponse> {
    return this.call<Types.PixSplitUnlinkDueChargeResponse>('pixSplitUnlinkDueCharge', params, undefined, headers);
  }

  pixSplitDetailCharge(params: Types.PixSplitDetailChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitDetailChargeResponse> {
    return this.call<Types.PixSplitDetailChargeResponse>('pixSplitDetailCharge', params, undefined, headers);
  }

  pixSplitDetailDueCharge(params: Types.PixSplitDetailDueChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixSplitDetailDueChargeResponse> {
    return this.call<Types.PixSplitDetailDueChargeResponse>('pixSplitDetailDueCharge', params, undefined, headers);
  }

  pixConfigWebhook(params: Types.PixConfigWebhookParams, body: Types.PixConfigWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PixConfigWebhookResponse> {
    return this.call<Types.PixConfigWebhookResponse>('pixConfigWebhook', params, body, headers);
  }

  pixDetailWebhook(params: Types.PixDetailWebhookParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailWebhookResponse> {
    return this.call<Types.PixDetailWebhookResponse>('pixDetailWebhook', params, undefined, headers);
  }

  pixListWebhook(params?: Types.PixListWebhookParams, headers?: Types.RequestHeaders): Promise<Types.PixListWebhookResponse> {
    return this.call<Types.PixListWebhookResponse>('pixListWebhook', params, undefined, headers);
  }

  pixDeleteWebhook(params: Types.PixDeleteWebhookParams, headers?: Types.RequestHeaders): Promise<Types.PixDeleteWebhookResponse> {
    return this.call<Types.PixDeleteWebhookResponse>('pixDeleteWebhook', params, undefined, headers);
  }

  /** @deprecated Use pixCreateEvp(headers?). */
  pixCreateEvp(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixCreateEvpResponse>;
  pixCreateEvp(headers?: Types.RequestHeaders): Promise<Types.PixCreateEvpResponse>;
  pixCreateEvp(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixCreateEvpResponse>('pixCreateEvp', paramsOrHeaders, headers);
  }

  /** @deprecated Use pixListEvp(headers?). */
  pixListEvp(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixListEvpResponse>;
  pixListEvp(headers?: Types.RequestHeaders): Promise<Types.PixListEvpResponse>;
  pixListEvp(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixListEvpResponse>('pixListEvp', paramsOrHeaders, headers);
  }

  pixDeleteEvp(params: Types.PixDeleteEvpParams, headers?: Types.RequestHeaders): Promise<Types.PixDeleteEvpResponse> {
    return this.call<Types.PixDeleteEvpResponse>('pixDeleteEvp', params, undefined, headers);
  }

  getAccountBalance(params?: Types.GetAccountBalanceParams, headers?: Types.RequestHeaders): Promise<Types.GetAccountBalanceResponse> {
    return this.call<Types.GetAccountBalanceResponse>('getAccountBalance', params, undefined, headers);
  }

  updateAccountConfig(body: Types.UpdateAccountConfigBody, headers?: Types.RequestHeaders): Promise<Types.UpdateAccountConfigResponse>;
  /** @deprecated Use updateAccountConfig(body, headers?). */
  updateAccountConfig(params: Types.EmptyParams, body: Types.UpdateAccountConfigBody, headers?: Types.RequestHeaders): Promise<Types.UpdateAccountConfigResponse>;
  updateAccountConfig(bodyOrParams: Types.UpdateAccountConfigBody | Types.EmptyParams, bodyOrHeaders?: Types.UpdateAccountConfigBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.UpdateAccountConfigResponse>('updateAccountConfig', bodyOrParams, bodyOrHeaders, headers);
  }

  /** @deprecated Use listAccountConfig(headers?). */
  listAccountConfig(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.ListAccountConfigResponse>;
  listAccountConfig(headers?: Types.RequestHeaders): Promise<Types.ListAccountConfigResponse>;
  listAccountConfig(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.ListAccountConfigResponse>('listAccountConfig', paramsOrHeaders, headers);
  }

  medList(params?: Types.MedListParams, headers?: Types.RequestHeaders): Promise<Types.MedListResponse> {
    return this.call<Types.MedListResponse>('medList', params, undefined, headers);
  }

  medDefense(params: Types.MedSubmitDefenseParams, body: Types.MedSubmitDefenseBody, headers?: Types.RequestHeaders): Promise<Types.MedSubmitDefenseResponse> {
    return this.call<Types.MedSubmitDefenseResponse>('medDefense', params, body, headers);
  }

  createReport(body: Types.CreateReportBody, headers?: Types.RequestHeaders): Promise<Types.CreateReportResponse>;
  /** @deprecated Use createReport(body, headers?). */
  createReport(params: Types.EmptyParams, body: Types.CreateReportBody, headers?: Types.RequestHeaders): Promise<Types.CreateReportResponse>;
  createReport(bodyOrParams: Types.CreateReportBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateReportBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateReportResponse>('createReport', bodyOrParams, bodyOrHeaders, headers);
  }

  detailReport(params: Types.DetailReportParams, headers?: Types.RequestHeaders): Promise<Types.DetailReportResponse> {
    return this.call<Types.DetailReportResponse>('detailReport', params, undefined, headers);
  }

  pixResendWebhook(body: Types.PixResendWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PixResendWebhookResponse>;
  /** @deprecated Use pixResendWebhook(body, headers?). */
  pixResendWebhook(params: Types.EmptyParams, body: Types.PixResendWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PixResendWebhookResponse>;
  pixResendWebhook(bodyOrParams: Types.PixResendWebhookBody | Types.EmptyParams, bodyOrHeaders?: Types.PixResendWebhookBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixResendWebhookResponse>('pixResendWebhook', bodyOrParams, bodyOrHeaders, headers);
  }

  pixGetReceipt(params: Types.PixGetReceiptParams, headers?: Types.RequestHeaders): Promise<Types.PixGetReceiptResponse> {
    return this.call<Types.PixGetReceiptResponse>('pixGetReceipt', params, undefined, headers);
  }

  pixDetailRecurrenceAutomatic(params: Types.PixDetailRecurrenceAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailRecurrenceAutomaticResponse> {
    return this.call<Types.PixDetailRecurrenceAutomaticResponse>('pixDetailRecurrenceAutomatic', params, undefined, headers);
  }

  pixUpdateRecurrenceAutomatic(params: Types.PixUpdateRecurrenceAutomaticParams, body: Types.PixUpdateRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixUpdateRecurrenceAutomaticResponse> {
    return this.call<Types.PixUpdateRecurrenceAutomaticResponse>('pixUpdateRecurrenceAutomatic', params, body, headers);
  }

  pixListRecurrenceAutomatic(params: Types.PixListRecurrenceAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixListRecurrenceAutomaticResponse> {
    return this.call<Types.PixListRecurrenceAutomaticResponse>('pixListRecurrenceAutomatic', params, undefined, headers);
  }

  pixCreateRecurrenceAutomatic(body: Types.PixCreateRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateRecurrenceAutomaticResponse>;
  /** @deprecated Use pixCreateRecurrenceAutomatic(body, headers?). */
  pixCreateRecurrenceAutomatic(params: Types.EmptyParams, body: Types.PixCreateRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateRecurrenceAutomaticResponse>;
  pixCreateRecurrenceAutomatic(bodyOrParams: Types.PixCreateRecurrenceAutomaticBody | Types.EmptyParams, bodyOrHeaders?: Types.PixCreateRecurrenceAutomaticBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixCreateRecurrenceAutomaticResponse>('pixCreateRecurrenceAutomatic', bodyOrParams, bodyOrHeaders, headers);
  }

  pixCreateRequestRecurrenceAutomatic(body: Types.PixCreateRequestRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateRequestRecurrenceAutomaticResponse>;
  /** @deprecated Use pixCreateRequestRecurrenceAutomatic(body, headers?). */
  pixCreateRequestRecurrenceAutomatic(params: Types.EmptyParams, body: Types.PixCreateRequestRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateRequestRecurrenceAutomaticResponse>;
  pixCreateRequestRecurrenceAutomatic(bodyOrParams: Types.PixCreateRequestRecurrenceAutomaticBody | Types.EmptyParams, bodyOrHeaders?: Types.PixCreateRequestRecurrenceAutomaticBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixCreateRequestRecurrenceAutomaticResponse>('pixCreateRequestRecurrenceAutomatic', bodyOrParams, bodyOrHeaders, headers);
  }

  pixDetailRequestRecurrenceAutomatic(params: Types.PixDetailRequestRecurrenceAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailRequestRecurrenceAutomaticResponse> {
    return this.call<Types.PixDetailRequestRecurrenceAutomaticResponse>('pixDetailRequestRecurrenceAutomatic', params, undefined, headers);
  }

  pixUpdateRequestRecurrenceAutomatic(params: Types.PixUpdateRequestRecurrenceAutomaticParams, body: Types.PixUpdateRequestRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixUpdateRequestRecurrenceAutomaticResponse> {
    return this.call<Types.PixUpdateRequestRecurrenceAutomaticResponse>('pixUpdateRequestRecurrenceAutomatic', params, body, headers);
  }

  pixCreateAutomaticChargeTxid(params: Types.PixCreateAutomaticChargeTxidParams, body: Types.PixCreateAutomaticChargeTxidBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateAutomaticChargeTxidResponse> {
    return this.call<Types.PixCreateAutomaticChargeTxidResponse>('pixCreateAutomaticChargeTxid', params, body, headers);
  }

  pixUpdateAutomaticCharge(params: Types.PixUpdateAutomaticChargeParams, body: Types.PixUpdateAutomaticChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixUpdateAutomaticChargeResponse> {
    return this.call<Types.PixUpdateAutomaticChargeResponse>('pixUpdateAutomaticCharge', params, body, headers);
  }

  pixDetailAutomaticCharge(params: Types.PixDetailAutomaticChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailAutomaticChargeResponse> {
    return this.call<Types.PixDetailAutomaticChargeResponse>('pixDetailAutomaticCharge', params, undefined, headers);
  }

  pixCreateAutomaticCharge(body: Types.PixCreateAutomaticChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateAutomaticChargeResponse>;
  /** @deprecated Use pixCreateAutomaticCharge(body, headers?). */
  pixCreateAutomaticCharge(params: Types.EmptyParams, body: Types.PixCreateAutomaticChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixCreateAutomaticChargeResponse>;
  pixCreateAutomaticCharge(bodyOrParams: Types.PixCreateAutomaticChargeBody | Types.EmptyParams, bodyOrHeaders?: Types.PixCreateAutomaticChargeBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixCreateAutomaticChargeResponse>('pixCreateAutomaticCharge', bodyOrParams, bodyOrHeaders, headers);
  }

  pixListAutomaticCharge(params: Types.PixListAutomaticChargeParams, headers?: Types.RequestHeaders): Promise<Types.PixListAutomaticChargeResponse> {
    return this.call<Types.PixListAutomaticChargeResponse>('pixListAutomaticCharge', params, undefined, headers);
  }

  pixRetryRequestAutomatic(params: Types.PixRetryRequestAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixRetryRequestAutomaticResponse> {
    return this.call<Types.PixRetryRequestAutomaticResponse>('pixRetryRequestAutomatic', params, undefined, headers);
  }

  /** @deprecated Use pixCreateLocationRecurrenceAutomatic(headers?). */
  pixCreateLocationRecurrenceAutomatic(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixCreateLocationRecurrenceAutomaticResponse>;
  pixCreateLocationRecurrenceAutomatic(headers?: Types.RequestHeaders): Promise<Types.PixCreateLocationRecurrenceAutomaticResponse>;
  pixCreateLocationRecurrenceAutomatic(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixCreateLocationRecurrenceAutomaticResponse>('pixCreateLocationRecurrenceAutomatic', paramsOrHeaders, headers);
  }

  pixListLocationRecurrenceAutomatic(params: Types.PixListLocationRecurrenceAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixListLocationRecurrenceAutomaticResponse> {
    return this.call<Types.PixListLocationRecurrenceAutomaticResponse>('pixListLocationRecurrenceAutomatic', params, undefined, headers);
  }

  pixDetailLocationRecurrenceAutomatic(params: Types.PixDetailLocationRecurrenceAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixDetailLocationRecurrenceAutomaticResponse> {
    return this.call<Types.PixDetailLocationRecurrenceAutomaticResponse>('pixDetailLocationRecurrenceAutomatic', params, undefined, headers);
  }

  pixUnlinkLocationRecurrenceAutomatic(params: Types.PixUnlinkLocationRecurrenceAutomaticParams, headers?: Types.RequestHeaders): Promise<Types.PixUnlinkLocationRecurrenceAutomaticResponse> {
    return this.call<Types.PixUnlinkLocationRecurrenceAutomaticResponse>('pixUnlinkLocationRecurrenceAutomatic', params, undefined, headers);
  }

  pixConfigWebhookRecurrenceAutomatic(body: Types.PixConfigWebhookRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixConfigWebhookRecurrenceAutomaticResponse>;
  /** @deprecated Use pixConfigWebhookRecurrenceAutomatic(body, headers?). */
  pixConfigWebhookRecurrenceAutomatic(params: Types.EmptyParams, body: Types.PixConfigWebhookRecurrenceAutomaticBody, headers?: Types.RequestHeaders): Promise<Types.PixConfigWebhookRecurrenceAutomaticResponse>;
  pixConfigWebhookRecurrenceAutomatic(bodyOrParams: Types.PixConfigWebhookRecurrenceAutomaticBody | Types.EmptyParams, bodyOrHeaders?: Types.PixConfigWebhookRecurrenceAutomaticBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixConfigWebhookRecurrenceAutomaticResponse>('pixConfigWebhookRecurrenceAutomatic', bodyOrParams, bodyOrHeaders, headers);
  }

  /** @deprecated Use pixListWebhookRecurrenceAutomatic(headers?). */
  pixListWebhookRecurrenceAutomatic(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixListWebhookRecurrenceAutomaticResponse>;
  pixListWebhookRecurrenceAutomatic(headers?: Types.RequestHeaders): Promise<Types.PixListWebhookRecurrenceAutomaticResponse>;
  pixListWebhookRecurrenceAutomatic(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixListWebhookRecurrenceAutomaticResponse>('pixListWebhookRecurrenceAutomatic', paramsOrHeaders, headers);
  }

  /** @deprecated Use pixDeleteWebhookRecurrenceAutomatic(headers?). */
  pixDeleteWebhookRecurrenceAutomatic(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixDeleteWebhookRecurrenceAutomaticResponse>;
  pixDeleteWebhookRecurrenceAutomatic(headers?: Types.RequestHeaders): Promise<Types.PixDeleteWebhookRecurrenceAutomaticResponse>;
  pixDeleteWebhookRecurrenceAutomatic(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixDeleteWebhookRecurrenceAutomaticResponse>('pixDeleteWebhookRecurrenceAutomatic', paramsOrHeaders, headers);
  }

  pixConfigWebhookAutomaticCharge(body: Types.PixConfigWebhookAutomaticChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixConfigWebhookAutomaticChargeResponse>;
  /** @deprecated Use pixConfigWebhookAutomaticCharge(body, headers?). */
  pixConfigWebhookAutomaticCharge(params: Types.EmptyParams, body: Types.PixConfigWebhookAutomaticChargeBody, headers?: Types.RequestHeaders): Promise<Types.PixConfigWebhookAutomaticChargeResponse>;
  pixConfigWebhookAutomaticCharge(bodyOrParams: Types.PixConfigWebhookAutomaticChargeBody | Types.EmptyParams, bodyOrHeaders?: Types.PixConfigWebhookAutomaticChargeBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PixConfigWebhookAutomaticChargeResponse>('pixConfigWebhookAutomaticCharge', bodyOrParams, bodyOrHeaders, headers);
  }

  /** @deprecated Use pixListWebhookAutomaticCharge(headers?). */
  pixListWebhookAutomaticCharge(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixListWebhookAutomaticChargeResponse>;
  pixListWebhookAutomaticCharge(headers?: Types.RequestHeaders): Promise<Types.PixListWebhookAutomaticChargeResponse>;
  pixListWebhookAutomaticCharge(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixListWebhookAutomaticChargeResponse>('pixListWebhookAutomaticCharge', paramsOrHeaders, headers);
  }

  /** @deprecated Use pixDeleteWebhookAutomaticCharge(headers?). */
  pixDeleteWebhookAutomaticCharge(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixDeleteWebhookAutomaticChargeResponse>;
  pixDeleteWebhookAutomaticCharge(headers?: Types.RequestHeaders): Promise<Types.PixDeleteWebhookAutomaticChargeResponse>;
  pixDeleteWebhookAutomaticCharge(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixDeleteWebhookAutomaticChargeResponse>('pixDeleteWebhookAutomaticCharge', paramsOrHeaders, headers);
  }

  pixSplitDevolution(params: Types.PixSplitDevolutionParams, body: Types.PixSplitDevolutionBody, headers?: Types.RequestHeaders): Promise<Types.PixSplitDevolutionResponse> {
    return this.call<Types.PixSplitDevolutionResponse>('pixSplitDevolution', params, body, headers);
  }

  pixSendSameOwnership(params: Types.PixSendSameOwnershipParams, body: Types.PixSendSameOwnershipBody, headers?: Types.RequestHeaders): Promise<Types.PixSendSameOwnershipResponse> {
    return this.call<Types.PixSendSameOwnershipResponse>('pixSendSameOwnership', params, body, headers);
  }

  /** @deprecated Use pixKeysBucket(headers?). */
  pixKeysBucket(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.PixKeysBucketResponse>;
  pixKeysBucket(headers?: Types.RequestHeaders): Promise<Types.PixKeysBucketResponse>;
  pixKeysBucket(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.PixKeysBucketResponse>('pixKeysBucket', paramsOrHeaders, headers);
  }

  pixGenerateStaticQRCode(pixData: StaticPixData): Promise<StaticPixResponse> {
    return createStaticPix(pixData);
  }

  // Open Finance
  /** @deprecated Use ofConfigDetail(headers?). */
  ofConfigDetail(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceConfigResponse>;
  ofConfigDetail(headers?: Types.RequestHeaders): Promise<Types.OpenFinanceConfigResponse>;
  ofConfigDetail(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.OpenFinanceConfigResponse>('ofConfigDetail', paramsOrHeaders, headers);
  }

  ofConfigUpdate(body: Types.OpenFinanceConfigBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceConfigResponse>;
  /** @deprecated Use ofConfigUpdate(body, headers?). */
  ofConfigUpdate(params: Types.EmptyParams, body: Types.OpenFinanceConfigBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceConfigResponse>;
  ofConfigUpdate(bodyOrParams: Types.OpenFinanceConfigBody | Types.EmptyParams, bodyOrHeaders?: Types.OpenFinanceConfigBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OpenFinanceConfigResponse>('ofConfigUpdate', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListParticipants(params?: Types.OfListParticipantsParams, headers?: Types.RequestHeaders): Promise<Types.OfListParticipantsResponse> {
    return this.call<Types.OfListParticipantsResponse>('ofListParticipants', params, undefined, headers);
  }

  ofListPixPayment(params: Types.OfListPixPaymentParams, headers?: Types.RequestHeaders): Promise<Types.OfListPixPaymentResponse> {
    return this.call<Types.OfListPixPaymentResponse>('ofListPixPayment', params, undefined, headers);
  }

  ofStartPixPayment(body: Types.OfStartPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  /** @deprecated Use ofStartPixPayment(body, headers?). */
  ofStartPixPayment(params: Types.EmptyParams, body: Types.OfStartPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  ofStartPixPayment(bodyOrParams: Types.OfStartPixPaymentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfStartPixPaymentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OpenFinanceStartPaymentResponse>('ofStartPixPayment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofDevolutionPix(params: Types.OfDevolutionPixParams, body: Types.OfDevolutionPixBody, headers?: Types.RequestHeaders): Promise<Types.OfDevolutionPixResponse> {
    return this.call<Types.OfDevolutionPixResponse>('ofDevolutionPix', params, body, headers);
  }

  ofStartSchedulePixPayment(body: Types.OfStartSchedulePixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  /** @deprecated Use ofStartSchedulePixPayment(body, headers?). */
  ofStartSchedulePixPayment(params: Types.EmptyParams, body: Types.OfStartSchedulePixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  ofStartSchedulePixPayment(bodyOrParams: Types.OfStartSchedulePixPaymentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfStartSchedulePixPaymentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OpenFinanceStartPaymentResponse>('ofStartSchedulePixPayment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListSchedulePixPayment(params: Types.OfListSchedulePixPaymentParams, headers?: Types.RequestHeaders): Promise<Types.OfListSchedulePixPaymentResponse> {
    return this.call<Types.OfListSchedulePixPaymentResponse>('ofListSchedulePixPayment', params, undefined, headers);
  }

  ofCancelSchedulePix(params: Types.OfCancelSchedulePixParams, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceCancelPaymentResponse> {
    return this.call<Types.OpenFinanceCancelPaymentResponse>('ofCancelSchedulePix', params, undefined, headers);
  }

  ofDevolutionSchedulePix(params: Types.OfDevolutionSchedulePixParams, body: Types.OfDevolutionSchedulePixBody, headers?: Types.RequestHeaders): Promise<Types.OfDevolutionSchedulePixResponse> {
    return this.call<Types.OfDevolutionSchedulePixResponse>('ofDevolutionSchedulePix', params, body, headers);
  }

  ofStartRecurrencyPixPayment(body: Types.OfStartRecurrencyPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  /** @deprecated Use ofStartRecurrencyPixPayment(body, headers?). */
  ofStartRecurrencyPixPayment(params: Types.EmptyParams, body: Types.OfStartRecurrencyPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  ofStartRecurrencyPixPayment(bodyOrParams: Types.OfStartRecurrencyPixPaymentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfStartRecurrencyPixPaymentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OpenFinanceStartPaymentResponse>('ofStartRecurrencyPixPayment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListRecurrencyPixPayment(params: Types.OfListRecurrencyPixPaymentParams, headers?: Types.RequestHeaders): Promise<Types.OfListRecurrencyPixPaymentResponse> {
    return this.call<Types.OfListRecurrencyPixPaymentResponse>('ofListRecurrencyPixPayment', params, undefined, headers);
  }

  ofCancelRecurrencyPix(params: Types.OfCancelRecurrencyPixParams, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceCancelPaymentResponse> {
    return this.call<Types.OpenFinanceCancelPaymentResponse>('ofCancelRecurrencyPix', params, undefined, headers);
  }

  ofDevolutionRecurrencyPix(params: Types.OfDevolutionRecurrencyPixParams, body: Types.OfDevolutionRecurrencyPixBody, headers?: Types.RequestHeaders): Promise<Types.OfDevolutionRecurrencyPixResponse> {
    return this.call<Types.OfDevolutionRecurrencyPixResponse>('ofDevolutionRecurrencyPix', params, body, headers);
  }

  ofReplaceRecurrencyPixParcel(params: Types.OfReplaceRecurrencyPixParcelParams, body: Types.OfReplaceRecurrencyPixParcelBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse> {
    return this.call<Types.OpenFinanceStartPaymentResponse>('ofReplaceRecurrencyPixParcel', params, body, headers);
  }

  ofCreateBiometricEnrollment(body: Types.OfCreateBiometricEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfCreateBiometricEnrollmentResponse>;
  /** @deprecated Use ofCreateBiometricEnrollment(body, headers?). */
  ofCreateBiometricEnrollment(params: Types.EmptyParams, body: Types.OfCreateBiometricEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfCreateBiometricEnrollmentResponse>;
  ofCreateBiometricEnrollment(bodyOrParams: Types.OfCreateBiometricEnrollmentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfCreateBiometricEnrollmentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OfCreateBiometricEnrollmentResponse>('ofCreateBiometricEnrollment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListBiometricEnrollment(params: Types.OfListBiometricEnrollmentParams, headers?: Types.RequestHeaders): Promise<Types.OfListBiometricEnrollmentResponse> {
    return this.call<Types.OfListBiometricEnrollmentResponse>('ofListBiometricEnrollment', params, undefined, headers);
  }

  ofCreateBiometricPixPayment(body: Types.OfCreateBiometricPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  /** @deprecated Use ofCreateBiometricPixPayment(body, headers?). */
  ofCreateBiometricPixPayment(params: Types.EmptyParams, body: Types.OfCreateBiometricPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OpenFinanceStartPaymentResponse>;
  ofCreateBiometricPixPayment(bodyOrParams: Types.OfCreateBiometricPixPaymentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfCreateBiometricPixPaymentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OpenFinanceStartPaymentResponse>('ofCreateBiometricPixPayment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListBiometricPixPayment(params: Types.OfListBiometricPixPaymentParams, headers?: Types.RequestHeaders): Promise<Types.OfListBiometricPixPaymentResponse> {
    return this.call<Types.OfListBiometricPixPaymentResponse>('ofListBiometricPixPayment', params, undefined, headers);
  }

  ofRevokeBiometricEnrollment(body: Types.OfRevokeBiometricEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfRevokeBiometricEnrollmentResponse>;
  /** @deprecated Use ofRevokeBiometricEnrollment(body, headers?). */
  ofRevokeBiometricEnrollment(params: Types.EmptyParams, body: Types.OfRevokeBiometricEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfRevokeBiometricEnrollmentResponse>;
  ofRevokeBiometricEnrollment(bodyOrParams: Types.OfRevokeBiometricEnrollmentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfRevokeBiometricEnrollmentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OfRevokeBiometricEnrollmentResponse>('ofRevokeBiometricEnrollment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofCreateAutomaticEnrollment(body: Types.OfCreateAutomaticEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfCreateAutomaticEnrollmentResponse>;
  /** @deprecated Use ofCreateAutomaticEnrollment(body, headers?). */
  ofCreateAutomaticEnrollment(params: Types.EmptyParams, body: Types.OfCreateAutomaticEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfCreateAutomaticEnrollmentResponse>;
  ofCreateAutomaticEnrollment(bodyOrParams: Types.OfCreateAutomaticEnrollmentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfCreateAutomaticEnrollmentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OfCreateAutomaticEnrollmentResponse>('ofCreateAutomaticEnrollment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListAutomaticEnrollment(params: Types.OfListAutomaticEnrollmentParams, headers?: Types.RequestHeaders): Promise<Types.OfListAutomaticEnrollmentResponse> {
    return this.call<Types.OfListAutomaticEnrollmentResponse>('ofListAutomaticEnrollment', params, undefined, headers);
  }

  ofUpdateAutomaticEnrollment(body: Types.OfUpdateAutomaticEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfUpdateAutomaticEnrollmentResponse>;
  /** @deprecated Use ofUpdateAutomaticEnrollment(body, headers?). */
  ofUpdateAutomaticEnrollment(params: Types.EmptyParams, body: Types.OfUpdateAutomaticEnrollmentBody, headers?: Types.RequestHeaders): Promise<Types.OfUpdateAutomaticEnrollmentResponse>;
  ofUpdateAutomaticEnrollment(bodyOrParams: Types.OfUpdateAutomaticEnrollmentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfUpdateAutomaticEnrollmentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OfUpdateAutomaticEnrollmentResponse>('ofUpdateAutomaticEnrollment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofCreateAutomaticPixPayment(body: Types.OfCreateAutomaticPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OfCreateAutomaticPixPaymentResponse>;
  /** @deprecated Use ofCreateAutomaticPixPayment(body, headers?). */
  ofCreateAutomaticPixPayment(params: Types.EmptyParams, body: Types.OfCreateAutomaticPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OfCreateAutomaticPixPaymentResponse>;
  ofCreateAutomaticPixPayment(bodyOrParams: Types.OfCreateAutomaticPixPaymentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfCreateAutomaticPixPaymentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OfCreateAutomaticPixPaymentResponse>('ofCreateAutomaticPixPayment', bodyOrParams, bodyOrHeaders, headers);
  }

  ofListAutomaticPixPayment(params: Types.OfListAutomaticPixPaymentParams, headers?: Types.RequestHeaders): Promise<Types.OfListAutomaticPixPaymentResponse> {
    return this.call<Types.OfListAutomaticPixPaymentResponse>('ofListAutomaticPixPayment', params, undefined, headers);
  }

  ofCancelAutomaticPixPayment(body: Types.OfCancelAutomaticPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OfCancelAutomaticPixPaymentResponse>;
  /** @deprecated Use ofCancelAutomaticPixPayment(body, headers?). */
  ofCancelAutomaticPixPayment(params: Types.EmptyParams, body: Types.OfCancelAutomaticPixPaymentBody, headers?: Types.RequestHeaders): Promise<Types.OfCancelAutomaticPixPaymentResponse>;
  ofCancelAutomaticPixPayment(bodyOrParams: Types.OfCancelAutomaticPixPaymentBody | Types.EmptyParams, bodyOrHeaders?: Types.OfCancelAutomaticPixPaymentBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.OfCancelAutomaticPixPaymentResponse>('ofCancelAutomaticPixPayment', bodyOrParams, bodyOrHeaders, headers);
  }

  // Pagamento de Contas
  payDetailBarCode(params: Types.PayDetailBarCodeParams, headers?: Types.RequestHeaders): Promise<Types.PayDetailBarCodeResponse> {
    return this.call<Types.PayDetailBarCodeResponse>('payDetailBarCode', params, undefined, headers);
  }

  payRequestBarCode(params: Types.PayRequestBarCodeParams, body: Types.PayRequestBarCodeBody, headers?: Types.RequestHeaders): Promise<Types.PayRequestBarCodeResponse> {
    return this.call<Types.PayRequestBarCodeResponse>('payRequestBarCode', params, body, headers);
  }

  payDetailPayment(params: Types.PayDetailPaymentParams, headers?: Types.RequestHeaders): Promise<Types.PayDetailPaymentResponse> {
    return this.call<Types.PayDetailPaymentResponse>('payDetailPayment', params, undefined, headers);
  }

  payListPayments(params: Types.PayListPaymentsParams, headers?: Types.RequestHeaders): Promise<Types.PayListPaymentsResponse> {
    return this.call<Types.PayListPaymentsResponse>('payListPayments', params, undefined, headers);
  }

  payConfigWebhook(body: Types.PayWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PayConfigWebhookResponse>;
  /** @deprecated Use payConfigWebhook(body, headers?). */
  payConfigWebhook(params: Types.EmptyParams, body: Types.PayWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PayConfigWebhookResponse>;
  payConfigWebhook(bodyOrParams: Types.PayWebhookBody | Types.EmptyParams, bodyOrHeaders?: Types.PayWebhookBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PayConfigWebhookResponse>('payConfigWebhook', bodyOrParams, bodyOrHeaders, headers);
  }

  payListWebhook(params: Types.PayListWebhookParams, headers?: Types.RequestHeaders): Promise<Types.PayListWebhookResponse> {
    return this.call<Types.PayListWebhookResponse>('payListWebhook', params, undefined, headers);
  }

  payDeleteWebhook(body: Types.PayDeleteWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PayDeleteWebhookResponse>;
  /** @deprecated Use payDeleteWebhook(body, headers?). */
  payDeleteWebhook(params: Types.EmptyParams, body: Types.PayDeleteWebhookBody, headers?: Types.RequestHeaders): Promise<Types.PayDeleteWebhookResponse>;
  payDeleteWebhook(bodyOrParams: Types.PayDeleteWebhookBody | Types.EmptyParams, bodyOrHeaders?: Types.PayDeleteWebhookBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.PayDeleteWebhookResponse>('payDeleteWebhook', bodyOrParams, bodyOrHeaders, headers);
  }

  // Abertura de Contas
  createAccount(body: Types.CreateAccountBody, headers?: Types.RequestHeaders): Promise<Types.CreateAccountResponse>;
  /** @deprecated Use createAccount(body, headers?). */
  createAccount(params: Types.EmptyParams, body: Types.CreateAccountBody, headers?: Types.RequestHeaders): Promise<Types.CreateAccountResponse>;
  createAccount(bodyOrParams: Types.CreateAccountBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateAccountBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateAccountResponse>('createAccount', bodyOrParams, bodyOrHeaders, headers);
  }

  getAccountCredentials(params: Types.GetAccountCredentialsParams, headers?: Types.RequestHeaders): Promise<Types.GetAccountCredentialsResponse> {
    return this.call<Types.GetAccountCredentialsResponse>('getAccountCredentials', params, undefined, headers);
  }

  createAccountCertificate(params: Types.CreateAccountCertificateParams, headers?: Types.RequestHeaders): Promise<Types.CreateAccountCertificateResponse> {
    return this.call<Types.CreateAccountCertificateResponse>('createAccountCertificate', params, undefined, headers);
  }

  accountConfigWebhook(body: Types.AccountWebhookBody, headers?: Types.RequestHeaders): Promise<Types.AccountConfigWebhookResponse>;
  /** @deprecated Use accountConfigWebhook(body, headers?). */
  accountConfigWebhook(params: Types.EmptyParams, body: Types.AccountWebhookBody, headers?: Types.RequestHeaders): Promise<Types.AccountConfigWebhookResponse>;
  accountConfigWebhook(bodyOrParams: Types.AccountWebhookBody | Types.EmptyParams, bodyOrHeaders?: Types.AccountWebhookBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.AccountConfigWebhookResponse>('accountConfigWebhook', bodyOrParams, bodyOrHeaders, headers);
  }

  accountDetailWebhook(params: Types.AccountDetailWebhookParams, headers?: Types.RequestHeaders): Promise<Types.AccountDetailWebhookResponse> {
    return this.call<Types.AccountDetailWebhookResponse>('accountDetailWebhook', params, undefined, headers);
  }

  accountListWebhook(params: Types.AccountListWebhookParams, headers?: Types.RequestHeaders): Promise<Types.AccountListWebhookResponse> {
    return this.call<Types.AccountListWebhookResponse>('accountListWebhook', params, undefined, headers);
  }

  accountDeleteWebhook(params: Types.AccountDeleteWebhookParams, headers?: Types.RequestHeaders): Promise<Types.AccountDeleteWebhookResponse> {
    return this.call<Types.AccountDeleteWebhookResponse>('accountDeleteWebhook', params, undefined, headers);
  }

  // Extratos
  /** @deprecated Use listStatementFiles(headers?). */
  listStatementFiles(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.ListStatementFilesResponse>;
  listStatementFiles(headers?: Types.RequestHeaders): Promise<Types.ListStatementFilesResponse>;
  listStatementFiles(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.ListStatementFilesResponse>('listStatementFiles', paramsOrHeaders, headers);
  }

  getStatementFile(params: Types.GetStatementFileParams, headers?: Types.RequestHeaders): Promise<Types.GetStatementFileResponse> {
    return this.call<Types.GetStatementFileResponse>('getStatementFile', params, undefined, headers);
  }

  /** @deprecated Use listStatementRecurrences(headers?). */
  listStatementRecurrences(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.ListStatementRecurrencesResponse>;
  listStatementRecurrences(headers?: Types.RequestHeaders): Promise<Types.ListStatementRecurrencesResponse>;
  listStatementRecurrences(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.ListStatementRecurrencesResponse>('listStatementRecurrences', paramsOrHeaders, headers);
  }

  createStatementRecurrency(body: Types.CreateStatementRecurrencyBody, headers?: Types.RequestHeaders): Promise<Types.CreateStatementRecurrencyResponse>;
  /** @deprecated Use createStatementRecurrency(body, headers?). */
  createStatementRecurrency(params: Types.EmptyParams, body: Types.CreateStatementRecurrencyBody, headers?: Types.RequestHeaders): Promise<Types.CreateStatementRecurrencyResponse>;
  createStatementRecurrency(bodyOrParams: Types.CreateStatementRecurrencyBody | Types.EmptyParams, bodyOrHeaders?: Types.CreateStatementRecurrencyBody | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callBodyEndpoint<Types.CreateStatementRecurrencyResponse>('createStatementRecurrency', bodyOrParams, bodyOrHeaders, headers);
  }

  updateStatementRecurrency(params: Types.UpdateStatementRecurrencyParams, body: Types.UpdateStatementRecurrencyBody, headers?: Types.RequestHeaders): Promise<Types.UpdateStatementRecurrencyResponse> {
    return this.call<Types.UpdateStatementRecurrencyResponse>('updateStatementRecurrency', params, body, headers);
  }

  /** @deprecated Use createSftpKey(headers?). */
  createSftpKey(params: Types.EmptyParams, headers?: Types.RequestHeaders): Promise<Types.CreateSftpKeyResponse>;
  createSftpKey(headers?: Types.RequestHeaders): Promise<Types.CreateSftpKeyResponse>;
  createSftpKey(paramsOrHeaders?: Types.EmptyParams | Types.RequestHeaders, headers?: Types.RequestHeaders) {
    return this.callWithoutParams<Types.CreateSftpKeyResponse>('createSftpKey', paramsOrHeaders, headers);
  }
}

export default EfiPay;

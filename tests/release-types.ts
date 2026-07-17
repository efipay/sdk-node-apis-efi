import EfiPay, {
  ChargeCarnetStatusSchema,
  CreateChargeResponseSchema,
  type AccountListWebhookResponse,
  type ChargeCarnetStatus,
  type CreateChargeCardResponse,
  type CreateChargeResponse,
  type DetailCarnetResponse,
  type OfListPixPaymentResponse,
  type OpenFinanceConfigResponse,
  type PayDetailBarCodeResponse,
  type PayDetailPaymentResponse,
  type RefundCardResponse,
  type CreateStatementRecurrencyResponse,
  type PayDeleteWebhookResponse,
  type PixGetReceiptResponse,
  type PixListAutomaticChargeResponse,
  type PixQrCodeDetailResponse,
  type RequestHeaders,
} from 'sdk-node-apis-efi';

declare const sdk: EfiPay;

const chargeBody = {
  items: [{ name: 'Produto', value: 1000, amount: 1 }],
};

// Modern and legacy body-only signatures.
const modernCharge = sdk.createCharge(chargeBody, { 'x-request-id': 'modern' });
const legacyCharge = sdk.createCharge({}, chargeBody, { 'x-request-id': 'legacy' });
const typedCharge: Promise<CreateChargeResponse> = modernCharge;
CreateChargeResponseSchema.parse({
  code: 200,
  data: { charge_id: 1, total: 1000, status: 'new', custom_id: null, created_at: '2026-07-15' },
});
// @ts-expect-error the deprecated overload still requires a body.
sdk.createCharge({});

const refundResponse: Promise<RefundCardResponse> = sdk.refundCard({ id: 1 }, {});
const carnetResponse: Promise<DetailCarnetResponse> = sdk.detailCarnet({ id: 1 });
const carnetStatus: ChargeCarnetStatus = 'up_to_date';
ChargeCarnetStatusSchema.parse(carnetStatus);
// @ts-expect-error active is not a valid carnet status.
const invalidCarnetStatus: ChargeCarnetStatus = 'active';

// Modern and legacy signatures for endpoints without params or body.
const modernStatements = sdk.listStatementFiles({ 'x-request-id': 'modern' });
const legacyStatements = sdk.listStatementFiles({}, { 'x-request-id': 'legacy' });

sdk.payConfigWebhook({ url: 'https://example.test/webhook' });
sdk.payConfigWebhook({}, { url: 'https://example.test/webhook' });
// @ts-expect-error the deprecated overload cannot omit its body.
sdk.payConfigWebhook({});

sdk.payDeleteWebhook({ url: 'https://example.test/webhook' });
// @ts-expect-error webhook bodies are closed and require url.
sdk.payDeleteWebhook({ webhookUrl: 'https://example.test/webhook' });

sdk.payDetailPayment({ idPagamento: 'payment-id' });
// @ts-expect-error idPagamento is a string.
sdk.payDetailPayment({ idPagamento: 123 });
sdk.payListPayments({ dataInicio: '2026-01-01', dataFim: '2026-01-31' });
// @ts-expect-error both ends of the period are required.
sdk.payListPayments({ dataInicio: '2026-01-01' });

sdk.listPlans({ name: 'Plano', limit: 20, offset: 0 });
// @ts-expect-error listPlans uses offset, not page.
sdk.listPlans({ page: 1 });

sdk.updateSubscription(
  { id: 1 },
  {
    customer: { email: 'cliente@example.com', phone_number: '31999999999' },
    payment_token: '0123456789abcdef0123456789abcdef01234567',
  },
);
// @ts-expect-error metadata is changed through updateSubscriptionMetadata.
sdk.updateSubscription({ id: 1 }, { metadata: { custom_id: 'pedido' } });

sdk.pixUpdateDueCharge({ txid: 'charge-id' }, { valor: { original: '10.00' } });
sdk.pixUpdateDueChargeBatch(
  { id: 1 },
  { cobsv: [{ txid: 'charge-id', calendario: { dataDeVencimento: '2026-08-15' } }] },
);
sdk.pixCreateAutomaticCharge({
  idRec: 'RR000000000000000000000000001',
  calendario: { dataDeVencimento: '2026-08-15' },
  valor: { original: '10.00' },
  ajusteDiaUtil: true,
  devedor: { email: 'cliente@example.com', cidade: 'Belo Horizonte', uf: 'MG' },
  recebedor: { agencia: '0001', conta: '12345', tipoConta: 'CORRENTE' },
});
sdk.pixSendDetail({ e2eId: 'E0000000000000000000000000000000' });
// @ts-expect-error the documented parameter is e2eId.
sdk.pixSendDetail({ e2eid: 'E0000000000000000000000000000000' });
const webhookHeaders: RequestHeaders = { 'x-skip-mtls-checking': false };
sdk.pixConfigWebhook({ chave: 'pix-key' }, { webhookUrl: 'https://example.test/pix' }, webhookHeaders);

sdk.accountListWebhook({
  inicio: '2026-01-01T00:00:00-03:00',
  fim: '2026-01-31T23:59:59-03:00',
  'paginacao.paginaAtual': 0,
});
// @ts-expect-error the webhook list period is required.
sdk.accountListWebhook({});

sdk.accountConfigWebhook({ webhookUrl: 'https://example.test/webhook' });
sdk.accountConfigWebhook({ url: 'https://example.test/webhook', chave: 'webhook-id' });
// @ts-expect-error create and update webhook fields are mutually exclusive.
sdk.accountConfigWebhook({ webhookUrl: 'https://example.test/one', url: 'https://example.test/two', chave: 'id' });

sdk.ofListPixPayment({ identificador: 'payment-id' });
sdk.ofListPixPayment({ inicio: '2026-01-01', fim: '2026-01-31' });
// @ts-expect-error identifier or a complete period is required.
sdk.ofListPixPayment({ inicio: '2026-01-01' });
sdk.ofDevolutionPix(
  { identificadorPagamento: 'payment-id' },
  [{ endToEndId: 'E123', valor: '0.01' }],
);
// @ts-expect-error devolution bodies are arrays of Pix transactions.
sdk.ofDevolutionPix({ identificadorPagamento: 'payment-id' }, { valor: '0.01' });

const cardResponse: Promise<CreateChargeCardResponse> = sdk.createChargeCard({
  items: [{ name: 'Produto', value: 1000 }],
  customer: {
    name: 'Cliente',
    cpf: '12345678909',
    email: 'cliente@example.com',
    phone_number: '31999999999',
  },
  payment_token: '0123456789abcdef0123456789abcdef01234567',
  tds_info: {
    tds_identifier: '550e8400-e29b-41d4-a716-446655440000',
    challenge_callback_url: 'https://example.test/3ds',
  },
});

declare const inferredCardResponse: CreateChargeCardResponse;
if (inferredCardResponse.status === 'unpaid') {
  const refusalReason: string = inferredCardResponse.refusal.reason;
  void refusalReason;
}
if (inferredCardResponse.status === 'waiting' && inferredCardResponse.tds_challenge?.form_data) {
  const challengeRequest: string = inferredCardResponse.tds_challenge.form_data.creq;
  void challengeRequest;
}

const openFinanceConfig: OpenFinanceConfigResponse = {
  redirectURL: 'https://example.test/redirect',
  webhookURL: 'https://example.test/webhook',
  webhookSecurity: { type: 'hmac', hash: 'secret' },
  processPayment: 'async',
  generateTxIdForInic: true,
};
const invalidOpenFinanceConfig: OpenFinanceConfigResponse = {
  redirectURL: 'https://example.test/redirect',
  webhookURL: 'https://example.test/webhook',
  // @ts-expect-error HMAC responses require hash.
  webhookSecurity: { type: 'hmac' },
  processPayment: 'async',
  generateTxIdForInic: true,
};

declare const openFinancePayments: OfListPixPaymentResponse;
for (const payment of openFinancePayments.pagamentos) {
  if (payment.status === 'aceito') {
    const endToEndId: string = payment.endToEndId;
    const value: string = payment.valor;
    void endToEndId;
    void value;
  }
}

declare const barCodeResponse: PayDetailBarCodeResponse;
if (barCodeResponse.tipo === 'boleto') {
  const bankName: string = barCodeResponse.banco.nome;
  void bankName;
} else if (barCodeResponse.sacadorAvalista) {
  const guarantorDocument: string = barCodeResponse.sacadorAvalista.documento;
  void guarantorDocument;
}

declare const paymentResponse: PayDetailPaymentResponse;
const paymentId: string = paymentResponse.idPagamento;
if (paymentResponse.status === 'LIQUIDADO') {
  const paidAt: string = paymentResponse.data.pagamento;
  void paidAt;
}

declare const qrCodeResponse: PixQrCodeDetailResponse;
if (qrCodeResponse.tipoCob === 'cobv') {
  const dueDate: string = qrCodeResponse.calendario.dataDeVencimento;
  void dueDate;
}

declare const automaticChargeList: PixListAutomaticChargeResponse;
const automaticCharges = automaticChargeList.cobsr;

// @ts-expect-error tds_info is required by card v2.
sdk.createChargeCard({
  items: [{ name: 'Produto', value: 1000 }],
  customer: {
    name: 'Cliente',
    cpf: '12345678909',
    email: 'cliente@example.com',
    phone_number: '31999999999',
  },
  payment_token: '0123456789abcdef0123456789abcdef01234567',
});

const accountResponse: Promise<AccountListWebhookResponse> = sdk.accountListWebhook({
  inicio: '2026-01-01T00:00:00-03:00',
  fim: '2026-01-31T23:59:59-03:00',
});
const statementResponse: Promise<CreateStatementRecurrencyResponse> = sdk.createStatementRecurrency({
  periodicidade: 'mensal',
  envia_email: true,
  comprimir_arquivos: false,
});
const receiptResponse: Promise<PixGetReceiptResponse> = sdk.pixGetReceipt({ txid: 'charge-id' });
const webhookDeleteResponse: Promise<PayDeleteWebhookResponse> = sdk.payDeleteWebhook({
  url: 'https://example.test/webhook',
});

void modernCharge;
void legacyCharge;
void typedCharge;
void refundResponse;
void carnetResponse;
void invalidCarnetStatus;
void modernStatements;
void legacyStatements;
void cardResponse;
void accountResponse;
void statementResponse;
void receiptResponse;
void webhookDeleteResponse;
void openFinanceConfig;
void invalidOpenFinanceConfig;
void paymentId;
void automaticCharges;

import * as z from "zod";

const DateSchema = z.iso.date();
const DateTimeSchema = z.iso.datetime({ offset: true });
const PaymentStatusSchema = z.enum([
  'EM_PROCESSAMENTO',
  'AGENDADO',
  'REALIZADO',
  'LIQUIDADO',
  'CANCELADO',
  'NAO_REALIZADO',
]);

export const PayDetailBarCodeParamsSchema = z
  .object({ codBarras: z.string().regex(/^\d{44,48}$/) })
  .strict();
export type PayDetailBarCodeParams = z.infer<typeof PayDetailBarCodeParamsSchema>;

export const PayRequestBarCodeParamsSchema = PayDetailBarCodeParamsSchema;
export type PayRequestBarCodeParams = z.infer<typeof PayRequestBarCodeParamsSchema>;

export const PayRequestBarCodeBodySchema = z
  .object({
    valor: z.number().int().positive(),
    dataPagamento: DateSchema,
    descricao: z.string().optional(),
  })
  .strict();
export type PayRequestBarCodeBody = z.infer<typeof PayRequestBarCodeBodySchema>;

export const PayDetailPaymentParamsSchema = z.object({ idPagamento: z.string() }).strict();
export type PayDetailPaymentParams = z.infer<typeof PayDetailPaymentParamsSchema>;

export const PayListPaymentsParamsSchema = z
  .object({
    dataInicio: DateSchema,
    dataFim: DateSchema,
  })
  .strict();
export type PayListPaymentsParams = z.infer<typeof PayListPaymentsParamsSchema>;

export const PayWebhookBodySchema = z.object({ url: z.url() }).strict();
export type PayWebhookBody = z.infer<typeof PayWebhookBodySchema>;

export const PayListWebhookParamsSchema = z
  .object({
    dataInicio: DateTimeSchema,
    dataFim: DateTimeSchema,
  })
  .strict();
export type PayListWebhookParams = z.infer<typeof PayListWebhookParamsSchema>;

export const PayDeleteWebhookBodySchema = PayWebhookBodySchema;
export type PayDeleteWebhookBody = z.infer<typeof PayDeleteWebhookBodySchema>;

const PayPartySchema = z
  .object({
    nome: z.string(),
    documento: z.string(),
  })
  .loose();

const PayBilletValuesSchema = z
  .object({
    original: z.number(),
    abatimento: z.number(),
    multa: z.number(),
    juros: z.number(),
    desconto: z.number(),
    final: z.number(),
  })
  .loose();

const PayInformationSchema = z
  .object({
    divergente: z
      .object({
        deveAceitar: z.boolean(),
        valorMinimo: z.number(),
        valorMaximo: z.number(),
      })
      .loose(),
    parcial: z
      .object({
        deveAceitar: z.boolean(),
        limiteDePagamentos: z.number().int(),
      })
      .loose(),
    podeSerPago: z.boolean(),
  })
  .loose();

const PayDetailBilletResponseSchema = z
  .object({
    tipo: z.literal('boleto'),
    banco: z
      .object({
        codigo: z.number().int(),
        nome: z.string(),
      })
      .loose(),
    codBarras: z.string(),
    linhaDigitavel: z.string(),
    datas: z
      .object({
        vencimento: z.string(),
        limitePagamento: z.string(),
      })
      .loose(),
    beneficiario: PayPartySchema.extend({ fantasia: z.string() }).loose(),
    pagador: PayPartySchema,
    valores: PayBilletValuesSchema,
    informacoesPagamento: PayInformationSchema,
  })
  .loose();

const PayDetailTaxResponseSchema = z
  .object({
    tipo: z.literal('tributo'),
    banco: z.null(),
    codBarras: z.string(),
    linhaDigitavel: z.string(),
    datas: z
      .object({
        vencimento: z.string(),
        limitePagamento: z.null(),
      })
      .loose(),
    beneficiario: z.null(),
    pagador: z.null(),
    sacadorAvalista: PayPartySchema.nullable(),
    valores: z
      .object({
        original: z.number(),
        abatimento: z.number().nullable(),
        pago: z.number().nullable(),
        final: z.number(),
      })
      .loose(),
    informacoesPagamento: z.null(),
  })
  .loose();

export const PayDetailBarCodeResponseSchema = z.discriminatedUnion('tipo', [
  PayDetailBilletResponseSchema,
  PayDetailTaxResponseSchema,
]);
export type PayDetailBarCodeResponse = z.infer<typeof PayDetailBarCodeResponseSchema>;

const PayRequestDateResponseSchema = z
  .object({
    solicitacao: z.string(),
    pagamento: z.string(),
  })
  .loose();

export const PayRequestBarCodeResponseSchema = z
  .object({
    idPagamento: z.string(),
    valorPago: z.number().int(),
    status: PaymentStatusSchema,
    data: PayRequestDateResponseSchema,
  })
  .loose();
export type PayRequestBarCodeResponse = z.infer<typeof PayRequestBarCodeResponseSchema>;

const PayLiquidatedPaymentResponseSchema = z
  .object({
    idPagamento: z.string(),
    valorPago: z.number().int(),
    status: z.literal('LIQUIDADO'),
    motivoRecusa: z.string().nullable(),
    data: z
      .object({
        solicitacao: z.string(),
        pagamento: z.string(),
      })
      .loose(),
  })
  .loose();

const PayFailedPaymentResponseSchema = z
  .object({
    idPagamento: z.string(),
    codBarras: z.string(),
    linhaDigitavel: z.string(),
    valorPago: z.number().int(),
    status: z.literal('NAO_REALIZADO'),
    retornoBancario: z.string(),
    protocolo: z.string().nullable(),
    descricao: z.string(),
    horario: z
      .object({
        solicitacao: z.string(),
      })
      .loose(),
  })
  .loose();

const PayPendingPaymentResponseSchema = z
  .object({
    idPagamento: z.string(),
    status: z.enum(['EM_PROCESSAMENTO', 'AGENDADO', 'REALIZADO', 'CANCELADO']),
    codBarras: z.string().optional(),
    linhaDigitavel: z.string().optional(),
    valorPago: z.number().int().optional(),
    motivoRecusa: z.string().nullable().optional(),
    retornoBancario: z.string().nullable().optional(),
    protocolo: z.string().nullable().optional(),
    descricao: z.string().optional(),
    data: z
      .object({
        solicitacao: z.string(),
        pagamento: z.string().nullable().optional(),
      })
      .loose()
      .optional(),
    horario: z
      .object({
        solicitacao: z.string(),
      })
      .loose()
      .optional(),
  })
  .loose();

export const PayDetailPaymentResponseSchema = z.discriminatedUnion('status', [
  PayLiquidatedPaymentResponseSchema,
  PayFailedPaymentResponseSchema,
  PayPendingPaymentResponseSchema,
]);
export type PayDetailPaymentResponse = z.infer<typeof PayDetailPaymentResponseSchema>;

export const PayListPaymentsResponseSchema = z
  .object({
    datas: z
      .object({
        inicial: DateSchema,
        final: DateSchema,
      })
      .loose(),
    solicitacoes: z
      .object({
        total: z.number().int(),
        processando: z.number().int(),
        sucesso: z.number().int(),
        falha: z.number().int(),
        cancelada: z.number().int(),
      })
      .loose(),
    solicitacoesFalhas: z.array(z.number().int()),
  })
  .loose();
export type PayListPaymentsResponse = z.infer<typeof PayListPaymentsResponseSchema>;

export const PayConfigWebhookResponseSchema = z.object({ url: z.string() }).loose();
export type PayConfigWebhookResponse = z.infer<typeof PayConfigWebhookResponseSchema>;

export const PayListWebhookResponseSchema = z
  .object({
    parametros: z
      .object({
        inicio: z.string(),
        fim: z.string(),
        paginacao: z
          .object({
            paginaAtual: z.number().int(),
            itensPorPagina: z.number().int(),
            quantidadeDePaginas: z.number().int(),
            quantidadeTotalDeItens: z.number().int(),
          })
          .loose(),
      })
      .loose(),
    webhooks: z.array(
      z
        .object({
          url: z.string(),
          criacao: z.string(),
        })
        .loose(),
    ),
  })
  .loose();
export type PayListWebhookResponse = z.infer<typeof PayListWebhookResponseSchema>;

export type PayDeleteWebhookResponse = void;

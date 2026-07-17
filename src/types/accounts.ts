import * as z from "zod";

const UfSchema = z.enum([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]);

const Rfc3339DateTimeSchema = z.iso.datetime({ offset: true });

export const CreateAccountBodySchema = z
  .object({
    clienteFinal: z
      .object({
        cpf: z.string(),
        nomeCompleto: z.string(),
        dataNascimento: z.string(),
        nomeMae: z.string().optional(),
        celular: z.string(),
        email: z.email(),
        cnpj: z.string().optional(),
        razaoSocial: z.string().optional(),
        endereco: z
          .object({
            cep: z.string(),
            estado: UfSchema,
            cidade: z.string(),
            bairro: z.string(),
            logradouro: z.string(),
            numero: z.string(),
            complemento: z.string().optional(),
          })
          .strict(),
      })
      .strict(),
    meioDeNotificacao: z.array(z.enum(['sms', 'whatsapp'])).min(1),
    escoposIntegrados: z.array(z.string()).min(1),
    cupom: z.string().min(1).max(20).optional(),
  })
  .strict();
export type CreateAccountBody = z.infer<typeof CreateAccountBodySchema>;

export const AccountIdParamsSchema = z.object({ idContaSimplificada: z.string() }).strict();
export const GetAccountCredentialsParamsSchema = AccountIdParamsSchema;
export type GetAccountCredentialsParams = z.infer<typeof GetAccountCredentialsParamsSchema>;
export const CreateAccountCertificateParamsSchema = AccountIdParamsSchema;
export type CreateAccountCertificateParams = z.infer<typeof CreateAccountCertificateParamsSchema>;

const CreateAccountWebhookBodySchema = z
  .object({
    webhookUrl: z.url(),
    url: z.never().optional(),
    chave: z.never().optional(),
  })
  .strict();

const UpdateAccountWebhookBodySchema = z
  .object({
    url: z.url(),
    chave: z.string(),
    webhookUrl: z.never().optional(),
  })
  .strict();

export const AccountWebhookBodySchema = z.union([
  CreateAccountWebhookBodySchema,
  UpdateAccountWebhookBodySchema,
]);
export type AccountWebhookBody = z.infer<typeof AccountWebhookBodySchema>;

export const AccountWebhookParamsSchema = z.object({ identificadorWebhook: z.string() }).strict();
export const AccountDetailWebhookParamsSchema = AccountWebhookParamsSchema;
export type AccountDetailWebhookParams = z.infer<typeof AccountDetailWebhookParamsSchema>;
export const AccountListWebhookParamsSchema = z
  .object({
    inicio: Rfc3339DateTimeSchema,
    fim: Rfc3339DateTimeSchema,
    'paginacao.paginaAtual': z.number().int().min(0).optional(),
    'paginacao.itensPorPagina': z.number().int().min(1).max(1000).optional(),
  })
  .strict();
export type AccountListWebhookParams = z.infer<typeof AccountListWebhookParamsSchema>;
export const AccountDeleteWebhookParamsSchema = AccountWebhookParamsSchema;
export type AccountDeleteWebhookParams = z.infer<typeof AccountDeleteWebhookParamsSchema>;

export const CreateAccountResponseSchema = z
  .object({
    contaSimplificada: z.object({ identificador: z.string() }).loose(),
  })
  .loose();
export type CreateAccountResponse = z.infer<typeof CreateAccountResponseSchema>;

export const GetAccountCredentialsResponseSchema = z
  .object({
    clientId: z.string(),
    clientSecret: z.string(),
    conta: z
      .object({
        numero: z.string(),
        digito: z.string(),
        payeeCode: z.string(),
      })
      .loose(),
    escopos: z.array(z.string()),
    ativo: z.boolean(),
  })
  .loose();
export type GetAccountCredentialsResponse = z.infer<typeof GetAccountCredentialsResponseSchema>;

export const CreateAccountCertificateResponseSchema = z.string();
export type CreateAccountCertificateResponse = z.infer<typeof CreateAccountCertificateResponseSchema>;

export const AccountConfigWebhookResponseSchema = z
  .object({ identificadorWebhook: z.string() })
  .loose();
export type AccountConfigWebhookResponse = z.infer<typeof AccountConfigWebhookResponseSchema>;

export const AccountDetailWebhookResponseSchema = z
  .object({
    webhookUrl: z.url(),
    identificadorWebhook: z.string(),
    criacao: Rfc3339DateTimeSchema,
  })
  .loose();
export type AccountDetailWebhookResponse = z.infer<typeof AccountDetailWebhookResponseSchema>;

export const AccountListWebhookResponseSchema = z
  .object({
    parametros: z
      .object({
        inicio: Rfc3339DateTimeSchema,
        fim: Rfc3339DateTimeSchema,
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
    webhooks: z.array(AccountDetailWebhookResponseSchema),
  })
  .loose();
export type AccountListWebhookResponse = z.infer<typeof AccountListWebhookResponseSchema>;

export const AccountDeleteWebhookResponseSchema = z.void();
export type AccountDeleteWebhookResponse = z.infer<typeof AccountDeleteWebhookResponseSchema>;

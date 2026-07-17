import * as z from "zod";

const DateSchema = z.iso.date();
const MoneySchema = z.string().regex(/^\d{1,16}\.\d{2}$/).min(4).max(19);
const CpfSchema = z.string().regex(/^\d{11}$/);
const CnpjSchema = z.string().regex(/^[0-9A-Z]{12}[0-9]{2}$/);
const ParticipantIdSchema = z.string().min(32).max(36);
const UrnSchema = z.string().max(256);
const EndToEndIdSchema = z.string().min(25).max(32);

const PaymentIdentifierParamsSchema = z.object({ identificadorPagamento: z.string() }).strict();

const OpenFinanceWebhookSecuritySchema = z.union([
  z.object({ type: z.literal('mtls'), hash: z.never().optional() }).strict(),
  z.object({ type: z.literal('hmac'), hash: z.string() }).strict(),
]);

export const OpenFinanceConfigBodySchema = z
  .object({
    redirectURL: z.url(),
    webhookURL: z.url(),
    webhookSecurity: OpenFinanceWebhookSecuritySchema.optional(),
    processPayment: z.enum(['async', 'sync']).optional(),
    generateTxIdForInic: z.boolean().optional(),
  })
  .strict();
export type OpenFinanceConfigBody = z.infer<typeof OpenFinanceConfigBodySchema>;

export const OfListParticipantsParamsSchema = z
  .object({
    nome: z.string().optional(),
    organizacao: z.string().optional(),
    modalidade: z.enum(['pagamentos', 'biometria', 'automatico']).optional(),
    tipoPessoa: z.enum(['PF', 'PJ']).optional(),
  })
  .strict();
export type OfListParticipantsParams = z.infer<typeof OfListParticipantsParamsSchema>;

export const OpenFinancePagadorSchema = z
  .object({
    idParticipante: ParticipantIdSchema,
    cpf: CpfSchema,
    cnpj: CnpjSchema.optional(),
  })
  .strict();
export type OpenFinancePagador = z.infer<typeof OpenFinancePagadorSchema>;

export const OpenFinanceContaBancoSchema = z
  .object({
    nome: z.string().min(5),
    documento: z.string().regex(/^([0-9]{11}|[0-9A-Z]{12}[0-9]{2})$/),
    codigoBanco: z.string().regex(/^([0-9]{3}|[0-9A-Z]{8})$/),
    agencia: z.string().regex(/^\d{4}$/),
    conta: z.string().regex(/^\d{3,20}$/),
    tipoConta: z.enum(['CACC', 'SVGS', 'TRAN']),
  })
  .strict();
export type OpenFinanceContaBanco = z.infer<typeof OpenFinanceContaBancoSchema>;

export const OpenFinanceFavorecidoSchema = z.union([
  z.object({ contaBanco: OpenFinanceContaBancoSchema, chave: z.never().optional() }).strict(),
  z.object({ chave: z.string(), contaBanco: z.never().optional() }).strict(),
]);
export type OpenFinanceFavorecido = z.infer<typeof OpenFinanceFavorecidoSchema>;

const OpenFinancePaymentBaseShape = {
  valor: MoneySchema,
  codigoCidadeIBGE: z.string().regex(/^\d{7}$/).optional(),
  infoPagador: z.string().optional(),
  idProprio: z.string().max(255).optional(),
  qrCode: z.string().max(512).optional(),
  identificadorTransacao: z.string().max(25).optional(),
};

export const OpenFinancePagamentoSchema = z.object(OpenFinancePaymentBaseShape).strict();
export type OpenFinancePagamento = z.infer<typeof OpenFinancePagamentoSchema>;

export const OfStartPixPaymentBodySchema = z
  .object({
    pagador: OpenFinancePagadorSchema,
    favorecido: OpenFinanceFavorecidoSchema,
    pagamento: OpenFinancePagamentoSchema,
  })
  .strict();
export type OfStartPixPaymentBody = z.infer<typeof OfStartPixPaymentBodySchema>;

const ImmediateListCommonShape = {
  quantidade: z.number().int().min(1).max(100).optional(),
  pagina: z.number().int().positive().optional(),
  status: z.enum(['pendente', 'rejeitado', 'aceito', 'expirado']).optional(),
};

export const OfListPixPaymentParamsSchema = z.union([
  z
    .object({
      identificador: z.string(),
      inicio: DateSchema.optional(),
      fim: DateSchema.optional(),
      ...ImmediateListCommonShape,
    })
    .strict(),
  z
    .object({
      inicio: DateSchema,
      fim: DateSchema,
      identificador: z.string().optional(),
      ...ImmediateListCommonShape,
    })
    .strict(),
]);
export type OfListPixPaymentParams = z.infer<typeof OfListPixPaymentParamsSchema>;

export const OpenFinanceDevolutionItemSchema = z
  .object({
    endToEndId: z.string(),
    valor: MoneySchema,
  })
  .strict();
export type OpenFinanceDevolutionItem = z.infer<typeof OpenFinanceDevolutionItemSchema>;

export const OfDevolutionPixParamsSchema = PaymentIdentifierParamsSchema;
export type OfDevolutionPixParams = z.infer<typeof OfDevolutionPixParamsSchema>;
export const OfDevolutionPixBodySchema = z.array(OpenFinanceDevolutionItemSchema).min(1);
export type OfDevolutionPixBody = z.infer<typeof OfDevolutionPixBodySchema>;

export const OpenFinanceSchedulePaymentSchema = z
  .object({
    ...OpenFinancePaymentBaseShape,
    dataAgendamento: DateSchema,
  })
  .strict();

export const OfStartSchedulePixPaymentBodySchema = z
  .object({
    pagador: OpenFinancePagadorSchema,
    favorecido: OpenFinanceFavorecidoSchema,
    pagamento: OpenFinanceSchedulePaymentSchema,
  })
  .strict();
export type OfStartSchedulePixPaymentBody = z.infer<typeof OfStartSchedulePixPaymentBodySchema>;

const ScheduleListCommonShape = {
  quantidade: z.string().regex(/^\d+$/).optional(),
  pagina: z.string().regex(/^\d+$/).optional(),
  status: z.enum(['pendente', 'agendado', 'rejeitado', 'aceito', 'expirado', 'cancelado']).optional(),
};

export const OfListSchedulePixPaymentParamsSchema = z.union([
  z
    .object({
      identificador: z.string(),
      inicio: DateSchema.optional(),
      fim: DateSchema.optional(),
      ...ScheduleListCommonShape,
    })
    .strict(),
  z
    .object({
      inicio: DateSchema,
      fim: DateSchema,
      identificador: z.string().optional(),
      ...ScheduleListCommonShape,
    })
    .strict(),
]);
export type OfListSchedulePixPaymentParams = z.infer<typeof OfListSchedulePixPaymentParamsSchema>;

export const OfCancelSchedulePixParamsSchema = PaymentIdentifierParamsSchema;
export type OfCancelSchedulePixParams = z.infer<typeof OfCancelSchedulePixParamsSchema>;
export const OfDevolutionSchedulePixParamsSchema = PaymentIdentifierParamsSchema;
export type OfDevolutionSchedulePixParams = z.infer<typeof OfDevolutionSchedulePixParamsSchema>;
export const OfDevolutionSchedulePixBodySchema = OfDevolutionPixBodySchema;
export type OfDevolutionSchedulePixBody = z.infer<typeof OfDevolutionSchedulePixBodySchema>;

const RecurrenceCommonShape = {
  dataInicio: DateSchema,
  quantidade: z.number().int().min(2).max(60),
};

export const OpenFinanceRecurrenceSchema = z.union([
  z
    .object({
      tipo: z.literal('diaria'),
      ...RecurrenceCommonShape,
      diaDaSemana: z.never().optional(),
      diaDoMes: z.never().optional(),
      datas: z.never().optional(),
      descricao: z.never().optional(),
    })
    .strict(),
  z
    .object({
      tipo: z.literal('semanal'),
      ...RecurrenceCommonShape,
      diaDaSemana: z.enum([
        'DOMINGO',
        'SEGUNDA_FEIRA',
        'TERCA_FEIRA',
        'QUARTA_FEIRA',
        'QUINTA_FEIRA',
        'SEXTA_FEIRA',
        'SABADO',
      ]),
      diaDoMes: z.never().optional(),
      datas: z.never().optional(),
      descricao: z.never().optional(),
    })
    .strict(),
  z
    .object({
      tipo: z.literal('mensal'),
      ...RecurrenceCommonShape,
      diaDoMes: z.number().int().min(1).max(31),
      diaDaSemana: z.never().optional(),
      datas: z.never().optional(),
      descricao: z.never().optional(),
    })
    .strict(),
  z
    .object({
      tipo: z.literal('personalizada'),
      datas: z.array(DateSchema).min(2).max(60),
      descricao: z.string().optional(),
      dataInicio: z.never().optional(),
      quantidade: z.never().optional(),
      diaDaSemana: z.never().optional(),
      diaDoMes: z.never().optional(),
    })
    .strict(),
]);
export type OpenFinanceRecurrence = z.infer<typeof OpenFinanceRecurrenceSchema>;

export const OpenFinanceRecurrencyPaymentSchema = z
  .object({
    ...OpenFinancePaymentBaseShape,
    recorrencia: OpenFinanceRecurrenceSchema,
  })
  .strict();

export const OfStartRecurrencyPixPaymentBodySchema = z
  .object({
    pagador: OpenFinancePagadorSchema,
    favorecido: OpenFinanceFavorecidoSchema,
    pagamento: OpenFinanceRecurrencyPaymentSchema,
  })
  .strict();
export type OfStartRecurrencyPixPaymentBody = z.infer<typeof OfStartRecurrencyPixPaymentBodySchema>;

const RecurrencyListCommonShape = {
  quantidade: z.string().regex(/^\d+$/).optional(),
  pagina: z.string().regex(/^\d+$/).optional(),
  status: z.enum(['ativa', 'concluida', 'pendente', 'expirada', 'cancelada']).optional(),
};

export const OfListRecurrencyPixPaymentParamsSchema = z.union([
  z
    .object({
      identificador: z.string(),
      inicio: DateSchema.optional(),
      fim: DateSchema.optional(),
      ...RecurrencyListCommonShape,
    })
    .strict(),
  z
    .object({
      inicio: DateSchema,
      fim: DateSchema,
      identificador: z.string().optional(),
      ...RecurrencyListCommonShape,
    })
    .strict(),
]);
export type OfListRecurrencyPixPaymentParams = z.infer<typeof OfListRecurrencyPixPaymentParamsSchema>;

export const OfCancelRecurrencyPixParamsSchema = PaymentIdentifierParamsSchema;
export type OfCancelRecurrencyPixParams = z.infer<typeof OfCancelRecurrencyPixParamsSchema>;
export const OfDevolutionRecurrencyPixParamsSchema = PaymentIdentifierParamsSchema;
export type OfDevolutionRecurrencyPixParams = z.infer<typeof OfDevolutionRecurrencyPixParamsSchema>;
export const OfDevolutionRecurrencyPixBodySchema = OfDevolutionPixBodySchema;
export type OfDevolutionRecurrencyPixBody = z.infer<typeof OfDevolutionRecurrencyPixBodySchema>;
export const OfReplaceRecurrencyPixParcelParamsSchema = z
  .object({ identificadorPagamento: z.string(), endToEndId: z.string() })
  .strict();
export type OfReplaceRecurrencyPixParcelParams = z.infer<typeof OfReplaceRecurrencyPixParcelParamsSchema>;
export const OfReplaceRecurrencyPixParcelBodySchema = z.object({ valor: MoneySchema.optional() }).strict();
export type OfReplaceRecurrencyPixParcelBody = z.infer<typeof OfReplaceRecurrencyPixParcelBodySchema>;

export const OfCreateBiometricEnrollmentBodySchema = z
  .object({ pagador: OpenFinancePagadorSchema })
  .strict();
export type OfCreateBiometricEnrollmentBody = z.infer<typeof OfCreateBiometricEnrollmentBodySchema>;
export const OfListBiometricEnrollmentParamsSchema = z
  .object({
    cpf: CpfSchema,
    cnpj: CnpjSchema.optional(),
  })
  .strict();
export type OfListBiometricEnrollmentParams = z.infer<typeof OfListBiometricEnrollmentParamsSchema>;
export const OfCreateBiometricPixPaymentBodySchema = z
  .object({
    identificadorVinculo: UrnSchema,
    favorecido: OpenFinanceFavorecidoSchema,
    pagamento: OpenFinancePagamentoSchema,
  })
  .strict();
export type OfCreateBiometricPixPaymentBody = z.infer<typeof OfCreateBiometricPixPaymentBodySchema>;
export const OfListBiometricPixPaymentParamsSchema = z
  .object({
    inicio: DateSchema,
    fim: DateSchema,
    status: z.enum(['pendente', 'rejeitado', 'aceito', 'expirado', 'cancelado']).optional(),
    identificador: z.string().optional(),
  })
  .strict();
export type OfListBiometricPixPaymentParams = z.infer<typeof OfListBiometricPixPaymentParamsSchema>;
export const OfRevokeBiometricEnrollmentBodySchema = z
  .object({
    identificadorVinculo: UrnSchema,
    motivo: z.string(),
  })
  .strict();
export type OfRevokeBiometricEnrollmentBody = z.infer<typeof OfRevokeBiometricEnrollmentBodySchema>;

const OpenFinanceAutomaticPagadorSchema = z
  .object({
    cpf: CpfSchema,
    cnpj: CnpjSchema.optional(),
    nome: z.string().max(120).optional(),
    idParticipante: ParticipantIdSchema,
  })
  .strict();

const OpenFinanceAutomaticConfigurationBaseShape = {
  intervalo: z.enum(['SEMANAL', 'MENSAL', 'ANUAL', 'SEMESTRAL', 'TRIMESTRAL']),
  dataInicio: DateSchema,
  permiteRetentativa: z.boolean().optional(),
  primeiroPagamento: z
    .object({
      data: DateSchema,
      valor: MoneySchema,
      infoPagador: z.string().optional(),
    })
    .strict()
    .optional(),
};

const OpenFinanceAutomaticConfigurationSchema = z.union([
  z
    .object({
      ...OpenFinanceAutomaticConfigurationBaseShape,
      valorFixo: MoneySchema,
      valorMinimo: z.never().optional(),
      valorMaximo: z.never().optional(),
    })
    .strict(),
  z
    .object({
      ...OpenFinanceAutomaticConfigurationBaseShape,
      valorFixo: z.never().optional(),
      valorMinimo: MoneySchema.optional(),
      valorMaximo: MoneySchema,
    })
    .strict(),
]);

export const OfCreateAutomaticEnrollmentBodySchema = z
  .object({
    pagador: OpenFinanceAutomaticPagadorSchema,
    favorecido: z.object({ contaBanco: OpenFinanceContaBancoSchema }).strict(),
    assinatura: z
      .object({
        expiracao: DateSchema,
        descricao: z.string().optional(),
        idProprio: z.string().max(255).optional(),
        configuracao: z
          .object({
            automatico: OpenFinanceAutomaticConfigurationSchema,
          })
          .strict(),
      })
      .strict(),
  })
  .strict();
export type OfCreateAutomaticEnrollmentBody = z.infer<typeof OfCreateAutomaticEnrollmentBodySchema>;

export const OfListAutomaticEnrollmentParamsSchema = z.union([
  z.object({ identificadorAdesao: UrnSchema }).strict(),
  z.object({ idProprio: z.string() }).strict(),
  z
    .object({
      inicio: DateSchema,
      fim: DateSchema,
      status: z.enum(['autorizado', 'pendente', 'revogado', 'finalizado', 'rejeitado']),
      documento: z.string().optional(),
    })
    .strict(),
  z
    .object({
      inicio: DateSchema,
      fim: DateSchema,
      documento: z.string(),
      status: z.enum(['autorizado', 'pendente', 'revogado', 'finalizado', 'rejeitado']).optional(),
    })
    .strict(),
]);
export type OfListAutomaticEnrollmentParams = z.infer<typeof OfListAutomaticEnrollmentParamsSchema>;

export const OfUpdateAutomaticEnrollmentBodySchema = z
  .object({
    identificador: UrnSchema,
    nomeFavorecido: z.string().optional(),
    status: z.literal('revogado').optional(),
    dataExpiracao: DateSchema.optional(),
    valorMaximo: MoneySchema.optional(),
  })
  .strict();
export type OfUpdateAutomaticEnrollmentBody = z.infer<typeof OfUpdateAutomaticEnrollmentBodySchema>;

export const OfCreateAutomaticPixPaymentBodySchema = z
  .object({
    identificadorAdesao: UrnSchema,
    pagamento: z
      .object({
        valor: MoneySchema,
        data: DateSchema,
        codigoCidadeIBGE: z.string().regex(/^\d{7}$/).optional(),
        infoPagador: z.string().optional(),
      })
      .strict(),
  })
  .strict();
export type OfCreateAutomaticPixPaymentBody = z.infer<typeof OfCreateAutomaticPixPaymentBodySchema>;
export const OfListAutomaticPixPaymentParamsSchema = z
  .object({
    identificadorAdesao: UrnSchema,
    endToEndId: EndToEndIdSchema.optional(),
  })
  .strict();
export type OfListAutomaticPixPaymentParams = z.infer<typeof OfListAutomaticPixPaymentParamsSchema>;
export const OfCancelAutomaticPixPaymentBodySchema = z
  .object({
    identificadorAdesao: UrnSchema,
    endToEndId: EndToEndIdSchema,
  })
  .strict();
export type OfCancelAutomaticPixPaymentBody = z.infer<typeof OfCancelAutomaticPixPaymentBodySchema>;

const OpenFinanceWebhookSecurityResponseSchema = z.union([
  z.object({ type: z.literal('mtls'), hash: z.never().optional() }).loose(),
  z.object({ type: z.literal('hmac'), hash: z.string() }).loose(),
]);

export const OpenFinanceConfigResponseSchema = z
  .object({
    redirectURL: z.string(),
    webhookURL: z.string(),
    webhookSecurity: OpenFinanceWebhookSecurityResponseSchema,
    processPayment: z.enum(['async', 'sync']),
    generateTxIdForInic: z.boolean(),
  })
  .loose();
export type OpenFinanceConfigResponse = z.infer<typeof OpenFinanceConfigResponseSchema>;

const OpenFinanceOrganizationResponseSchema = z
  .object({
    nome: z.string(),
    cnpj: z.string(),
    status: z.enum(['Ativo', 'Inativo']),
  })
  .loose();

const OpenFinanceParticipantResponseSchema = z
  .object({
    identificador: z.string(),
    nome: z.string(),
    descricao: z.string(),
    portal: z.string(),
    logo: z.string(),
    organizacoes: z.array(OpenFinanceOrganizationResponseSchema),
  })
  .loose();

export const OfListParticipantsResponseSchema = z
  .object({ participantes: z.array(OpenFinanceParticipantResponseSchema) })
  .loose();
export type OfListParticipantsResponse = z.infer<typeof OfListParticipantsResponseSchema>;

export const OpenFinanceStartPaymentResponseSchema = z
  .object({
    identificadorPagamento: z.string(),
    redirectURI: z.string(),
  })
  .loose();
export type OpenFinanceStartPaymentResponse = z.infer<typeof OpenFinanceStartPaymentResponseSchema>;

const OpenFinanceRefundResponseSchema = z
  .object({
    identificadorPagamento: z.string(),
    endToEndId: z.string(),
    valor: z.string(),
    dataCriacao: z.string(),
    status: z.enum(['pendente', 'aceito', 'rejeitado']),
  })
  .loose();

export const OfDevolutionPixResponseSchema = OpenFinanceRefundResponseSchema;
export type OfDevolutionPixResponse = z.infer<typeof OfDevolutionPixResponseSchema>;
export const OfDevolutionSchedulePixResponseSchema = OpenFinanceRefundResponseSchema;
export type OfDevolutionSchedulePixResponse = z.infer<typeof OfDevolutionSchedulePixResponseSchema>;
export const OfDevolutionRecurrencyPixResponseSchema = OpenFinanceRefundResponseSchema;
export type OfDevolutionRecurrencyPixResponse = z.infer<typeof OfDevolutionRecurrencyPixResponseSchema>;

const OpenFinanceDevolutionResponseSchema = z
  .object({
    identificadorDevolucao: z.string(),
    valor: z.string(),
    status: z.enum(['pendente', 'rejeitado', 'aceito']),
    dataCriacao: z.string(),
  })
  .loose();

const OpenFinanceImmediateListItemBaseShape = {
  identificadorPagamento: z.string(),
  dataCriacao: z.string(),
  idProprio: z.string().optional(),
  devolucoes: z.array(OpenFinanceDevolutionResponseSchema).optional(),
};

const OpenFinanceImmediateListItemSchema = z.discriminatedUnion('status', [
  z
    .object({
      ...OpenFinanceImmediateListItemBaseShape,
      status: z.literal('aceito'),
      endToEndId: z.string(),
      valor: z.string(),
    })
    .loose(),
  z
    .object({
      ...OpenFinanceImmediateListItemBaseShape,
      status: z.enum(['pendente', 'rejeitado', 'expirado']),
      endToEndId: z.string().optional(),
      valor: z.string().optional(),
    })
    .loose(),
]);

const OpenFinanceScheduleListItemBaseShape = {
  ...OpenFinanceImmediateListItemBaseShape,
  dataOperacao: z.string(),
};

const OpenFinanceScheduleListItemSchema = z.discriminatedUnion('status', [
  z
    .object({
      ...OpenFinanceScheduleListItemBaseShape,
      status: z.literal('aceito'),
      endToEndId: z.string(),
      valor: z.string(),
    })
    .loose(),
  z
    .object({
      ...OpenFinanceScheduleListItemBaseShape,
      status: z.enum(['pendente', 'agendado', 'rejeitado', 'expirado', 'cancelado']),
      endToEndId: z.string().optional(),
      valor: z.string().optional(),
    })
    .loose(),
]);

const OpenFinanceRecurrencyListItemSchema = z
  .object({
    identificadorPagamento: z.string(),
    valor: z.string(),
    status: z.enum(['ativa', 'concluida', 'pendente', 'expirada', 'cancelada']),
    dataCriacao: z.string(),
    idProprio: z.string().optional(),
    recorrencias: z.array(
      z
        .object({
          endToEndId: z.string(),
          dataOperacao: z.string(),
          status: z.enum(['pendente', 'agendado', 'rejeitado', 'cancelado', 'enviado']),
          devolucoes: z.array(OpenFinanceDevolutionResponseSchema).optional(),
        })
        .loose(),
    ),
  })
  .loose();

function paginatedResponse<T extends z.ZodType>(item: T) {
  return z
    .object({
      pagamentos: z.array(item),
      total: z.number(),
      porPagina: z.number(),
      ultimo: z.string().nullable(),
      proximo: z.string().nullable(),
      anterior: z.string().nullable(),
      atual: z.string(),
    })
    .loose();
}

export const OfListPixPaymentResponseSchema = paginatedResponse(OpenFinanceImmediateListItemSchema);
export type OfListPixPaymentResponse = z.infer<typeof OfListPixPaymentResponseSchema>;
export const OfListSchedulePixPaymentResponseSchema = paginatedResponse(OpenFinanceScheduleListItemSchema);
export type OfListSchedulePixPaymentResponse = z.infer<typeof OfListSchedulePixPaymentResponseSchema>;
export const OfListRecurrencyPixPaymentResponseSchema = paginatedResponse(OpenFinanceRecurrencyListItemSchema);
export type OfListRecurrencyPixPaymentResponse = z.infer<typeof OfListRecurrencyPixPaymentResponseSchema>;

export const OpenFinanceCancelPaymentResponseSchema = z
  .object({
    identificadorPagamento: z.string(),
    status: z.string(),
    dataCancelamento: z.string(),
  })
  .loose();
export type OpenFinanceCancelPaymentResponse = z.infer<typeof OpenFinanceCancelPaymentResponseSchema>;

export const OfCreateBiometricEnrollmentResponseSchema = z
  .object({ identificadorVinculo: z.string(), redirectURI: z.string() })
  .loose();
export type OfCreateBiometricEnrollmentResponse = z.infer<typeof OfCreateBiometricEnrollmentResponseSchema>;

const OpenFinanceBiometricEnrollmentResponseSchema = z
  .object({
    identificador: z.string(),
    dataAutorizacao: z.string(),
    dataExpiracao: z.string(),
    limiteDiario: z.string(),
    limiteTransacao: z.string(),
    conta: z
      .object({
        numero: z.string(),
        agencia: z.string(),
        ispb: z.string(),
        tipo: z.string(),
      })
      .loose(),
    participante: z
      .object({
        identificador: z.string(),
        nome: z.string(),
        descricao: z.string(),
        logo: z.string(),
      })
      .loose(),
  })
  .loose();

export const OfListBiometricEnrollmentResponseSchema = z
  .object({ vinculos: z.array(OpenFinanceBiometricEnrollmentResponseSchema) })
  .loose();
export type OfListBiometricEnrollmentResponse = z.infer<typeof OfListBiometricEnrollmentResponseSchema>;

const OpenFinanceBiometricPaymentResponseSchema = z.discriminatedUnion('status', [
  z
    .object({
      ...OpenFinanceImmediateListItemBaseShape,
      status: z.literal('aceito'),
      endToEndId: z.string(),
      valor: z.string(),
    })
    .loose(),
  z
    .object({
      ...OpenFinanceImmediateListItemBaseShape,
      status: z.enum(['pendente', 'rejeitado', 'expirado', 'cancelado']),
      endToEndId: z.string().optional(),
      valor: z.string().optional(),
    })
    .loose(),
]);

export const OfListBiometricPixPaymentResponseSchema = z
  .object({ vinculos: z.array(OpenFinanceBiometricPaymentResponseSchema) })
  .loose();
export type OfListBiometricPixPaymentResponse = z.infer<typeof OfListBiometricPixPaymentResponseSchema>;

export const OfRevokeBiometricEnrollmentResponseSchema = z
  .object({
    identificadorVinculo: z.string(),
    status: z.literal('revogado'),
    motivo: z.string(),
    data: z.string(),
  })
  .loose();
export type OfRevokeBiometricEnrollmentResponse = z.infer<typeof OfRevokeBiometricEnrollmentResponseSchema>;

export const OfCreateAutomaticEnrollmentResponseSchema = z
  .object({ identificadorAdesao: z.string(), redirectURI: z.string() })
  .loose();
export type OfCreateAutomaticEnrollmentResponse = z.infer<typeof OfCreateAutomaticEnrollmentResponseSchema>;

const OpenFinanceAutomaticAccountResponseSchema = z
  .object({
    nome: z.string(),
    documento: z.string(),
    codigoBanco: z.string(),
    agencia: z.string(),
    conta: z.string(),
    tipoConta: z.enum(['CACC', 'SVGS', 'TRAN']),
  })
  .loose();

const OpenFinanceAutomaticFirstPaymentResponseSchema = z
  .object({
    data: z.string(),
    valor: z.string(),
    infoPagador: z.string().optional(),
  })
  .loose();

const OpenFinanceAutomaticConfigurationResponseBaseShape = {
  intervalo: z.enum(['SEMANAL', 'MENSAL', 'ANUAL', 'SEMESTRAL', 'TRIMESTRAL']),
  dataInicio: z.string(),
  permiteRetentativa: z.boolean().optional(),
  primeiroPagamento: OpenFinanceAutomaticFirstPaymentResponseSchema.optional(),
};

const OpenFinanceAutomaticConfigurationResponseSchema = z.union([
  z
    .object({
      ...OpenFinanceAutomaticConfigurationResponseBaseShape,
      valorFixo: z.string(),
      valorMinimo: z.never().optional(),
      valorMaximo: z.never().optional(),
    })
    .loose(),
  z
    .object({
      ...OpenFinanceAutomaticConfigurationResponseBaseShape,
      valorFixo: z.never().optional(),
      valorMinimo: z.string(),
      valorMaximo: z.string(),
    })
    .loose(),
]);

const OpenFinanceAutomaticBeneficiaryResponseSchema = z
  .object({
    contaBanco: OpenFinanceAutomaticAccountResponseSchema,
  })
  .loose();

const OpenFinanceAutomaticSubscriptionResponseSchema = z
  .object({
    expiracao: z.string(),
    descricao: z.string().optional(),
    idProprio: z.string().optional(),
    configuracao: z
      .object({
        automatico: OpenFinanceAutomaticConfigurationResponseSchema,
      })
      .loose(),
  })
  .loose();

const OpenFinanceAutomaticEnrollmentResponseSchema = z
  .object({
    identificadorAdesao: z.string(),
    status: z.enum(['autorizado', 'pendente', 'revogado', 'finalizado', 'rejeitado']),
    dataCriacao: z.string(),
    favorecido: OpenFinanceAutomaticBeneficiaryResponseSchema,
    assinatura: OpenFinanceAutomaticSubscriptionResponseSchema,
  })
  .loose();

export const OfListAutomaticEnrollmentResponseSchema = z
  .object({
    adesoes: z.array(OpenFinanceAutomaticEnrollmentResponseSchema),
    total: z.number(),
    porPagina: z.number(),
    ultimo: z.string().nullable(),
    proximo: z.string().nullable(),
    anterior: z.string().nullable(),
    atual: z.string(),
  })
  .loose();
export type OfListAutomaticEnrollmentResponse = z.infer<typeof OfListAutomaticEnrollmentResponseSchema>;

export const OfUpdateAutomaticEnrollmentResponseSchema = z
  .object({
    identificadorAdesao: z.string(),
    status: z.enum(['revogado', 'autorizado', 'pendente', 'finalizado', 'rejeitado']),
    motivo: z.string().optional(),
    favorecido: OpenFinanceAutomaticBeneficiaryResponseSchema,
    assinatura: OpenFinanceAutomaticSubscriptionResponseSchema,
  })
  .loose();
export type OfUpdateAutomaticEnrollmentResponse = z.infer<typeof OfUpdateAutomaticEnrollmentResponseSchema>;

export const OfCreateAutomaticPixPaymentResponseSchema = z
  .object({
    identificadorAdesao: z.string(),
    endToEndId: z.string(),
    status: z.enum(['pendente', 'rejeitado', 'aceito', 'expirado', 'cancelado']),
    data: z.string(),
  })
  .loose();
export type OfCreateAutomaticPixPaymentResponse = z.infer<typeof OfCreateAutomaticPixPaymentResponseSchema>;

export const OfListAutomaticPixPaymentResponseSchema = z
  .object({
    identificadorAdesao: z.string(),
    idProprio: z.string().optional(),
    status: z.enum(['autorizado', 'pendente', 'rejeitado', 'revogado', 'finalizado']),
    descricao: z.string().optional(),
    pagamentos: z.array(
      z
        .object({
          endToEndId: z.string(),
          valor: z.string(),
          status: z.enum(['pendente', 'rejeitado', 'aceito', 'expirado', 'cancelado']),
          dataCriacao: z.string(),
          infoPagador: z.string().optional(),
          devolucoes: z.array(OpenFinanceDevolutionResponseSchema).optional(),
        })
        .loose(),
    ),
  })
  .loose();
export type OfListAutomaticPixPaymentResponse = z.infer<typeof OfListAutomaticPixPaymentResponseSchema>;

export const OfCancelAutomaticPixPaymentResponseSchema = z
  .object({
    identificadorAdesao: z.string(),
    idProprio: z.string().optional(),
    endToEndId: z.string(),
    valor: z.string(),
    status: z.literal('cancelado'),
    motivo: z.string(),
    dataCriacao: z.string(),
  })
  .loose();
export type OfCancelAutomaticPixPaymentResponse = z.infer<typeof OfCancelAutomaticPixPaymentResponseSchema>;

export type OpenFinancePaymentBody =
  | OfStartPixPaymentBody
  | OfDevolutionPixBody
  | OfStartSchedulePixPaymentBody
  | OfDevolutionSchedulePixBody
  | OfStartRecurrencyPixPaymentBody
  | OfDevolutionRecurrencyPixBody
  | OfReplaceRecurrencyPixParcelBody
  | OfCreateBiometricEnrollmentBody
  | OfCreateBiometricPixPaymentBody
  | OfRevokeBiometricEnrollmentBody
  | OfCreateAutomaticEnrollmentBody
  | OfUpdateAutomaticEnrollmentBody
  | OfCreateAutomaticPixPaymentBody
  | OfCancelAutomaticPixPaymentBody;

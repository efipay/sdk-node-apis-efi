import * as z from "zod";

const ChargeCodeResponseSchema = z.object({ code: z.number() }).loose();

function chargeDataResponse<T extends z.ZodType>(data: T) {
  return z.object({ code: z.number(), data }).loose();
}

export const ChargeTransactionStatusSchema = z.enum([
  'new',
  'waiting',
  'identified',
  'approved',
  'paid',
  'unpaid',
  'refunded',
  'contested',
  'canceled',
  'settled',
  'expired',
]);
export type ChargeTransactionStatus = z.infer<typeof ChargeTransactionStatusSchema>;

export const ChargeLinkStatusSchema = z.enum(['new', 'link', 'expired']);
export type ChargeLinkStatus = z.infer<typeof ChargeLinkStatusSchema>;

export const ChargeSubscriptionStatusSchema = z.enum(['new', 'active', 'new_charge', 'canceled', 'expired']);
export type ChargeSubscriptionStatus = z.infer<typeof ChargeSubscriptionStatusSchema>;

export const ChargeCarnetStatusSchema = z.enum(['up_to_date', 'unpaid', 'finished']);
export type ChargeCarnetStatus = z.infer<typeof ChargeCarnetStatusSchema>;

export const ChargeResponsePixSchema = z
  .object({
    qrcode: z.string(),
    qrcode_image: z.string(),
  })
  .loose();
export type ChargeResponsePix = z.infer<typeof ChargeResponsePixSchema>;

export const ChargeResponseAddressSchema = z
  .object({
    street: z.string(),
    number: z.union([z.string(), z.number()]),
    complement: z.string().nullable(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  })
  .loose();
export type ChargeResponseAddress = z.infer<typeof ChargeResponseAddressSchema>;

export const ChargeResponseConfigurationsSchema = z
  .object({
    days_to_write_off: z.number().int().nullable().optional(),
    interest_type: z.enum(['monthly', 'daily']).nullable().optional(),
    interest: z.number().nullable().optional(),
    fine: z.number().nullable().optional(),
  })
  .loose();
export type ChargeResponseConfigurations = z.infer<typeof ChargeResponseConfigurationsSchema>;

const ChargeBilletResponseConfigurationsSchema = z
  .object({
    days_to_write_off: z.number().int(),
    interest_type: z.enum(['monthly', 'daily']).nullable().optional(),
    interest: z.number().nullable().optional(),
    fine: z.number().nullable().optional(),
  })
  .loose();

const ChargeListCarnetConfigurationsSchema = z
  .object({
    days_to_write_off: z.number().int(),
    interest_type: z.enum(['monthly', 'daily']).nullable().optional(),
    interest: z.number(),
    fine: z.number(),
  })
  .loose();

const ChargeResponsePdfSchema = z.object({ charge: z.string() }).loose();
const ChargeResponseHistorySchema = z.object({ message: z.string(), created_at: z.string() }).loose();
const ChargeResponseRepasseSchema = z
  .object({
    payee_code: z.string(),
    percentage: z.number().optional(),
    fixed: z.number().optional(),
  })
  .loose();

const ChargeResponseItemSchema = z
  .object({
    name: z.string(),
    value: z.number(),
    amount: z.number(),
    marketplace: z
      .object({
        mode: z.union([z.string(), z.number()]).optional(),
        repasses: z.array(ChargeResponseRepasseSchema),
      })
      .loose()
      .optional(),
  })
  .loose();

const ChargeResponseShippingSchema = z
  .object({
    name: z.string(),
    value: z.number(),
    payee_code: z.string(),
  })
  .loose();

const ChargeCustomerContactShape = {
    birth: z.string().optional(),
    email: z.string().optional(),
    phone_number: z.string().nullable().optional(),
    address: ChargeResponseAddressSchema.optional(),
};

const ChargeDetailCustomerSchema = z.union([
  z
    .object({
      ...ChargeCustomerContactShape,
      name: z.string(),
      cpf: z.string(),
      cnpj: z.never().optional(),
      corporate_name: z.never().optional(),
    })
    .loose(),
  z
    .object({
      ...ChargeCustomerContactShape,
      name: z.string().nullable().optional(),
      cpf: z.string().nullable().optional(),
      cnpj: z.string(),
      corporate_name: z.string(),
    })
    .loose(),
]);

const ChargeListCustomerSchema = z.union([
  z
    .object({
      phone_number: z.string().nullable(),
      cpf: z.string(),
      name: z.string(),
      cnpj: z.never().optional(),
      corporate_name: z.never().optional(),
    })
    .loose(),
  z
    .object({
      phone_number: z.string().nullable(),
      cnpj: z.string(),
      corporate_name: z.string(),
      cpf: z.never().optional(),
      name: z.never().optional(),
    })
    .loose(),
]);

const ChargeBilletResponseSchema = z
  .object({
    barcode: z.string(),
    pix: ChargeResponsePixSchema.optional(),
    link: z.string(),
    billet_link: z.string().optional(),
    pdf: ChargeResponsePdfSchema,
    expire_at: z.string(),
    configurations: ChargeBilletResponseConfigurationsSchema.optional(),
  })
  .loose();

const ChargeCreditCardResponseSchema = z
  .object({
    mask: z.string(),
    installments: z.number().int(),
    installment_value: z.number(),
    interest: z.number().optional(),
    address: ChargeResponseAddressSchema,
  })
  .loose();

const ChargeCarnetPaymentResponseSchema = z
  .object({
    parcel: z.number().int(),
    barcode: z.string(),
    pix: ChargeResponsePixSchema.optional(),
    url: z.string().optional(),
    link: z.string().optional(),
    parcel_link: z.string().optional(),
    pdf: ChargeResponsePdfSchema,
    expire_at: z.string(),
    configurations: ChargeResponseConfigurationsSchema.optional(),
  })
  .loose();

const ChargeListCarnetPaymentResponseSchema = ChargeCarnetPaymentResponseSchema.extend({
  link: z.string(),
  configurations: ChargeListCarnetConfigurationsSchema,
}).loose();

const ChargeDetailPaymentSchema = z.discriminatedUnion('method', [
  z
    .object({
      method: z.literal('banking_billet'),
      created_at: z.string(),
      message: z.string().nullable(),
      banking_billet: ChargeBilletResponseSchema,
    })
    .loose(),
  z
    .object({
      method: z.literal('credit_card'),
      created_at: z.string(),
      message: z.string().nullable(),
      credit_card: ChargeCreditCardResponseSchema,
    })
    .loose(),
  z
    .object({
      method: z.literal('carnet'),
      created_at: z.string(),
      message: z.string().nullable(),
      carnet: ChargeCarnetPaymentResponseSchema,
    })
    .loose(),
]);

const ChargeListPaymentCommonSchema = {
  paid_at: z.string().nullable(),
  received_by_bank_at: z.string().optional(),
  paid_value: z.number().optional(),
  pix: ChargeResponsePixSchema.optional(),
};

const ChargeListPaymentSchema = z.discriminatedUnion('payment_method', [
  z
    .object({
      ...ChargeListPaymentCommonSchema,
      payment_method: z.literal('banking_billet'),
      banking_billet: ChargeBilletResponseSchema,
    })
    .loose(),
  z
    .object({
      ...ChargeListPaymentCommonSchema,
      payment_method: z.literal('credit_card'),
      credit_card: ChargeCreditCardResponseSchema,
    })
    .loose(),
  z
    .object({
      ...ChargeListPaymentCommonSchema,
      payment_method: z.literal('carnet'),
      carnet: ChargeListCarnetPaymentResponseSchema,
    })
    .loose(),
]);

const ChargeDetailLinkSchema = z
  .object({
    billet_discount: z.number().nullable(),
    card_discount: z.number().nullable(),
    conditional_discount_value: z.number().nullable(),
    conditional_discount_type: z.enum(['percentage', 'currency']).nullable(),
    conditional_discount_date: z.string().nullable(),
    message: z.string().nullable(),
    expire_at: z.string(),
    request_delivery_address: z.boolean(),
    payment_method: z.enum(['banking_billet', 'credit_card', 'all']),
    payment_url: z.string(),
  })
  .loose();

const ChargeListEntrySchema = z
  .object({
    id: z.number().int(),
    total: z.number(),
    status: z.union([ChargeTransactionStatusSchema, ChargeLinkStatusSchema]),
    custom_id: z.string().nullable(),
    created_at: z.string(),
    customer: ChargeListCustomerSchema,
    payment: ChargeListPaymentSchema.optional(),
    link: ChargeDetailLinkSchema.optional(),
  })
  .loose();

const ChargeRefusalSchema = z.object({ reason: z.string(), retry: z.boolean() }).loose();
const ChargePaymentMethodSchema = z.enum(['banking_billet', 'credit_card']);

const CreateOneStepChargeBaseSchema = z
  .object({
    charge_id: z.number().int(),
    total: z.number(),
    status: ChargeTransactionStatusSchema,
    link: z.string().optional(),
    billet_link: z.string().optional(),
    pdf: ChargeResponsePdfSchema.optional(),
    expire_at: z.string().optional(),
    refusal: ChargeRefusalSchema.optional(),
  })
  .loose();

const CreateOneStepChargeDataSchema = z.union([
  CreateOneStepChargeBaseSchema.extend({
    payment: z.literal('banking_billet'),
    barcode: z.string(),
    pix: ChargeResponsePixSchema.optional(),
    refusal: z.never().optional(),
  }).loose(),
  CreateOneStepChargeBaseSchema.extend({
    payment: z.literal('credit_card'),
    status: z.literal('unpaid'),
    installments: z.number().int(),
    installment_value: z.number(),
    refusal: ChargeRefusalSchema,
  }).loose(),
  CreateOneStepChargeBaseSchema.extend({
    payment: z.literal('credit_card'),
    status: ChargeTransactionStatusSchema.exclude(['unpaid']),
    installments: z.number().int(),
    installment_value: z.number(),
    refusal: z.never().optional(),
  }).loose(),
]);

export const CreateOneStepChargeResponseSchema = chargeDataResponse(CreateOneStepChargeDataSchema);
export type CreateOneStepChargeResponse = z.infer<typeof CreateOneStepChargeResponseSchema>;

export const CreateChargeResponseSchema = chargeDataResponse(
  z
    .object({
      charge_id: z.number().int(),
      total: z.number(),
      status: ChargeTransactionStatusSchema,
      custom_id: z.string().nullable(),
      created_at: z.string(),
    })
    .loose(),
);
export type CreateChargeResponse = z.infer<typeof CreateChargeResponseSchema>;

const DefinePayMethodBaseSchema = z
  .object({
    charge_id: z.number().int(),
    total: z.number(),
    status: ChargeTransactionStatusSchema,
    reason: z.string().nullable().optional(),
  })
  .loose();

export const DefinePayMethodResponseSchema = chargeDataResponse(
  z.discriminatedUnion('payment', [
    DefinePayMethodBaseSchema.extend({
      payment: z.literal('banking_billet'),
      barcode: z.string(),
      pix: ChargeResponsePixSchema.optional(),
      link: z.string().optional(),
      billet_link: z.string().optional(),
      pdf: ChargeResponsePdfSchema.optional(),
      expire_at: z.string().optional(),
      configurations: ChargeBilletResponseConfigurationsSchema.optional(),
    }).loose(),
    DefinePayMethodBaseSchema.extend({
      payment: z.literal('credit_card'),
      installments: z.number().int(),
      installment_value: z.number(),
    }).loose(),
  ]),
);
export type DefinePayMethodResponse = z.infer<typeof DefinePayMethodResponseSchema>;

export const DetailChargeResponseSchema = chargeDataResponse(
  z
    .object({
      charge_id: z.number().int(),
      total: z.number(),
      status: z.union([ChargeTransactionStatusSchema, ChargeLinkStatusSchema]),
      reason: z.string().optional(),
      custom_id: z.string().nullable(),
      created_at: z.string(),
      notification_url: z.string().nullable(),
      items: z.array(ChargeResponseItemSchema),
      shippings: z.array(ChargeResponseShippingSchema).optional(),
      history: z.array(ChargeResponseHistorySchema),
      customer: ChargeDetailCustomerSchema.optional(),
      payment: ChargeDetailPaymentSchema.optional(),
      link: ChargeDetailLinkSchema.optional(),
    })
    .loose(),
);
export type DetailChargeResponse = z.infer<typeof DetailChargeResponseSchema>;

export const ListChargesResponseSchema = z
  .object({
    code: z.number(),
    data: z.array(ChargeListEntrySchema),
    params: z
      .object({
        begin_date: z.string(),
        end_date: z.string(),
        pagination: z
          .object({
            limit: z.number().int(),
            offset: z.number().int(),
            page: z.number().int(),
          })
          .loose(),
      })
      .loose(),
  })
  .loose();
export type ListChargesResponse = z.infer<typeof ListChargesResponseSchema>;

export const UpdateChargeMetadataResponseSchema = ChargeCodeResponseSchema;
export type UpdateChargeMetadataResponse = z.infer<typeof UpdateChargeMetadataResponseSchema>;
export const UpdateBilletResponseSchema = ChargeCodeResponseSchema;
export type UpdateBilletResponse = z.infer<typeof UpdateBilletResponseSchema>;
export const CancelChargeResponseSchema = ChargeCodeResponseSchema;
export type CancelChargeResponse = z.infer<typeof CancelChargeResponseSchema>;
export const SendBilletEmailResponseSchema = ChargeCodeResponseSchema;
export type SendBilletEmailResponse = z.infer<typeof SendBilletEmailResponseSchema>;
export const CreateChargeHistoryResponseSchema = ChargeCodeResponseSchema;
export type CreateChargeHistoryResponse = z.infer<typeof CreateChargeHistoryResponseSchema>;
export const DefineBalanceSheetBilletResponseSchema = ChargeCodeResponseSchema;
export type DefineBalanceSheetBilletResponse = z.infer<typeof DefineBalanceSheetBilletResponseSchema>;
export const SettleChargeResponseSchema = ChargeCodeResponseSchema;
export type SettleChargeResponse = z.infer<typeof SettleChargeResponseSchema>;

export const CardPaymentRetryResponseSchema = chargeDataResponse(
  z
    .object({
      installments: z.number().int(),
      installment_value: z.number(),
      charge_id: z.number().int(),
      status: ChargeTransactionStatusSchema,
      total: z.number(),
      payment: z.literal('credit_card'),
    })
    .loose(),
);
export type CardPaymentRetryResponse = z.infer<typeof CardPaymentRetryResponseSchema>;

export const RefundCardResponseSchema = z.object({ code: z.number(), message: z.string() }).loose();
export type RefundCardResponse = z.infer<typeof RefundCardResponseSchema>;

export const GetInstallmentsResponseSchema = chargeDataResponse(
  z
    .object({
      rate: z.number(),
      name: z.string(),
      installments: z.array(
        z
          .object({
            installment: z.number().int(),
            has_interest: z.boolean(),
            value: z.number(),
            currency: z.string(),
            interest_percentage: z.number(),
          })
          .loose(),
      ),
    })
    .loose(),
);
export type GetInstallmentsResponse = z.infer<typeof GetInstallmentsResponseSchema>;

const CreateCarnetChargeSchema = z
  .object({
    charge_id: z.number().int(),
    parcel: z.string(),
    status: ChargeTransactionStatusSchema,
    value: z.number(),
    expire_at: z.string(),
    url: z.string(),
    parcel_link: z.string(),
    pdf: ChargeResponsePdfSchema,
    barcode: z.string(),
    pix: ChargeResponsePixSchema.optional(),
  })
  .loose();

export const CreateCarnetResponseSchema = chargeDataResponse(
  z
    .object({
      carnet_id: z.number().int(),
      status: ChargeCarnetStatusSchema,
      cover: z.string(),
      link: z.string(),
      carnet_link: z.string(),
      pdf: z.object({ carnet: z.string(), cover: z.string() }).loose(),
      charges: z.array(CreateCarnetChargeSchema),
    })
    .loose(),
);
export type CreateCarnetResponse = z.infer<typeof CreateCarnetResponseSchema>;

const DetailCarnetChargeSchema = z
  .object({
    charge_id: z.number().int(),
    status: ChargeTransactionStatusSchema,
    url: z.string(),
    pdf: ChargeResponsePdfSchema,
    barcode: z.string(),
    pix: ChargeResponsePixSchema.optional(),
    parcel: z.number().int(),
    expire_at: z.string(),
    configurations: ChargeResponseConfigurationsSchema.optional(),
  })
  .loose();

export const DetailCarnetResponseSchema = chargeDataResponse(
  z
    .object({
      carnet_id: z.number().int(),
      status: ChargeCarnetStatusSchema,
      repeats: z.number().int(),
      cover: z.string(),
      link: z.string(),
      pdf: z.object({ carnet: z.string(), cover: z.string() }).loose(),
      value: z.number(),
      custom_id: z.string().nullable(),
      notification_url: z.string().nullable(),
      split_items: z.boolean(),
      charges: z.array(DetailCarnetChargeSchema),
      created_at: z.string(),
      history: z.array(ChargeResponseHistorySchema),
    })
    .loose(),
);
export type DetailCarnetResponse = z.infer<typeof DetailCarnetResponseSchema>;

export const UpdateCarnetMetadataResponseSchema = ChargeCodeResponseSchema;
export type UpdateCarnetMetadataResponse = z.infer<typeof UpdateCarnetMetadataResponseSchema>;
export const UpdateCarnetParcelResponseSchema = ChargeCodeResponseSchema;
export type UpdateCarnetParcelResponse = z.infer<typeof UpdateCarnetParcelResponseSchema>;
export const UpdateCarnetParcelsResponseSchema = ChargeCodeResponseSchema;
export type UpdateCarnetParcelsResponse = z.infer<typeof UpdateCarnetParcelsResponseSchema>;
export const CancelCarnetResponseSchema = ChargeCodeResponseSchema;
export type CancelCarnetResponse = z.infer<typeof CancelCarnetResponseSchema>;
export const CancelCarnetParcelResponseSchema = ChargeCodeResponseSchema;
export type CancelCarnetParcelResponse = z.infer<typeof CancelCarnetParcelResponseSchema>;
export const SendCarnetEmailResponseSchema = ChargeCodeResponseSchema;
export type SendCarnetEmailResponse = z.infer<typeof SendCarnetEmailResponseSchema>;
export const SendCarnetParcelEmailResponseSchema = ChargeCodeResponseSchema;
export type SendCarnetParcelEmailResponse = z.infer<typeof SendCarnetParcelEmailResponseSchema>;
export const CreateCarnetHistoryResponseSchema = ChargeCodeResponseSchema;
export type CreateCarnetHistoryResponse = z.infer<typeof CreateCarnetHistoryResponseSchema>;
export const SettleCarnetResponseSchema = ChargeCodeResponseSchema;
export type SettleCarnetResponse = z.infer<typeof SettleCarnetResponseSchema>;
export const SettleCarnetParcelResponseSchema = ChargeCodeResponseSchema;
export type SettleCarnetParcelResponse = z.infer<typeof SettleCarnetParcelResponseSchema>;

const ChargePlanDataSchema = z
  .object({
    plan_id: z.number().int(),
    name: z.string(),
    interval: z.number().int(),
    repeats: z.number().int().nullable(),
    created_at: z.string(),
  })
  .loose();

export const CreatePlanResponseSchema = chargeDataResponse(ChargePlanDataSchema);
export type CreatePlanResponse = z.infer<typeof CreatePlanResponseSchema>;
export const ListPlansResponseSchema = chargeDataResponse(z.array(ChargePlanDataSchema));
export type ListPlansResponse = z.infer<typeof ListPlansResponseSchema>;
export const UpdatePlanResponseSchema = ChargeCodeResponseSchema;
export type UpdatePlanResponse = z.infer<typeof UpdatePlanResponseSchema>;
export const DeletePlanResponseSchema = ChargeCodeResponseSchema;
export type DeletePlanResponse = z.infer<typeof DeletePlanResponseSchema>;

const SubscriptionPlanSummarySchema = z
  .object({
    id: z.number().int(),
    interval: z.number().int(),
    repeats: z.number().int().nullable(),
  })
  .loose();
const SubscriptionChargeSummarySchema = z
  .object({
    id: z.number().int(),
    status: ChargeTransactionStatusSchema,
    parcel: z.number().int(),
    total: z.number(),
  })
  .loose();

const OneStepSubscriptionBaseSchema = z
  .object({
    subscription_id: z.number().int(),
    status: ChargeSubscriptionStatusSchema,
    plan: SubscriptionPlanSummarySchema,
    charge: SubscriptionChargeSummarySchema,
    first_execution: z.string(),
    total: z.number(),
  })
  .loose();

const OneStepSubscriptionDataSchema = z.discriminatedUnion('payment', [
  OneStepSubscriptionBaseSchema.extend({
    payment: z.literal('banking_billet'),
    barcode: z.string().optional(),
    link: z.string().optional(),
    billet_link: z.string().optional(),
    pdf: ChargeResponsePdfSchema.optional(),
    expire_at: z.string().optional(),
  }).loose(),
  OneStepSubscriptionBaseSchema.extend({
    payment: z.literal('credit_card'),
    barcode: z.never().optional(),
    link: z.never().optional(),
    billet_link: z.never().optional(),
    pdf: z.never().optional(),
    expire_at: z.never().optional(),
  }).loose(),
]);

export const CreateOneStepSubscriptionResponseSchema = chargeDataResponse(OneStepSubscriptionDataSchema);
export type CreateOneStepSubscriptionResponse = z.infer<typeof CreateOneStepSubscriptionResponseSchema>;

export const CreateSubscriptionResponseSchema = chargeDataResponse(
  z
    .object({
      subscription_id: z.number().int(),
      status: ChargeSubscriptionStatusSchema,
      custom_id: z.string().nullable(),
      charges: z.array(
        z
          .object({
            charge_id: z.number().int(),
            status: ChargeTransactionStatusSchema,
            total: z.number(),
            parcel: z.number().int(),
          })
          .loose(),
      ),
      created_at: z.string(),
    })
    .loose(),
);
export type CreateSubscriptionResponse = z.infer<typeof CreateSubscriptionResponseSchema>;

export const DefineSubscriptionPayMethodResponseSchema = chargeDataResponse(OneStepSubscriptionDataSchema);
export type DefineSubscriptionPayMethodResponse = z.infer<typeof DefineSubscriptionPayMethodResponseSchema>;

const SubscriptionPlanDetailSchema = z
  .object({
    plan_id: z.number().int(),
    name: z.string(),
    interval: z.number().int(),
    repeats: z.number().int().nullable(),
  })
  .loose();

export const DetailSubscriptionResponseSchema = chargeDataResponse(
  z
    .object({
      subscription_id: z.number().int(),
      value: z.number(),
      status: ChargeSubscriptionStatusSchema,
      custom_id: z.string().nullable(),
      notification_url: z.string().nullable(),
      payment_method: ChargePaymentMethodSchema.nullable(),
      next_execution: z.string().nullable(),
      next_expire_at: z.string().nullable(),
      plan: SubscriptionPlanDetailSchema,
      occurrences: z.number().int(),
      created_at: z.string(),
      history: z.array(
        z
          .object({
            charge_id: z.number().int(),
            status: ChargeTransactionStatusSchema,
            created_at: z.string(),
          })
          .loose(),
      ),
    })
    .loose(),
);
export type DetailSubscriptionResponse = z.infer<typeof DetailSubscriptionResponseSchema>;

export const CreateOneStepSubscriptionLinkResponseSchema = chargeDataResponse(
  z
    .object({
      subscription_id: z.number().int(),
      status: ChargeSubscriptionStatusSchema,
      custom_id: z.string().nullable(),
      charge: SubscriptionChargeSummarySchema,
      payment_url: z.string(),
      payment_method: z.enum(['banking_billet', 'credit_card', 'all']),
      conditional_discount_date: z.string().nullable(),
      request_delivery_address: z.boolean(),
      expire_at: z.string(),
      created_at: z.string(),
    })
    .loose(),
);
export type CreateOneStepSubscriptionLinkResponse = z.infer<typeof CreateOneStepSubscriptionLinkResponseSchema>;

export const UpdateSubscriptionMetadataResponseSchema = ChargeCodeResponseSchema;
export type UpdateSubscriptionMetadataResponse = z.infer<typeof UpdateSubscriptionMetadataResponseSchema>;

export const UpdateSubscriptionResponseSchema = chargeDataResponse(
  z
    .object({
      subscription_id: z.number().int(),
      status: ChargeSubscriptionStatusSchema,
      value: z.number(),
      custom_id: z.string().nullable(),
      notification_url: z.string().nullable(),
      payment_method: ChargePaymentMethodSchema,
      next_execution: z.string(),
      next_expire_at: z.string(),
      plan: SubscriptionPlanDetailSchema,
      customer: z.object({ email: z.string(), phone_number: z.string() }).loose(),
      occurrences: z.number().int(),
      created_at: z.string(),
    })
    .loose(),
);
export type UpdateSubscriptionResponse = z.infer<typeof UpdateSubscriptionResponseSchema>;

export const CancelSubscriptionResponseSchema = ChargeCodeResponseSchema;
export type CancelSubscriptionResponse = z.infer<typeof CancelSubscriptionResponseSchema>;
export const CreateSubscriptionHistoryResponseSchema = ChargeCodeResponseSchema;
export type CreateSubscriptionHistoryResponse = z.infer<typeof CreateSubscriptionHistoryResponseSchema>;
export const SendSubscriptionLinkEmailResponseSchema = ChargeCodeResponseSchema;
export type SendSubscriptionLinkEmailResponse = z.infer<typeof SendSubscriptionLinkEmailResponseSchema>;

const ChargeLinkDataSchema = z
  .object({
    charge_id: z.number().int(),
    status: ChargeLinkStatusSchema,
    total: z.number(),
    custom_id: z.string().nullable().optional(),
    payment_url: z.string(),
    payment_method: z.enum(['banking_billet', 'credit_card', 'all']),
    billet_discount: z.number().nullable().optional(),
    card_discount: z.number().nullable().optional(),
    conditional_discount_value: z.number().nullable().optional(),
    conditional_discount_type: z.enum(['percentage', 'currency']).nullable().optional(),
    conditional_discount_date: z.string().nullable(),
    request_delivery_address: z.boolean().optional(),
    message: z.string().nullable().optional(),
    expire_at: z.string().optional(),
    created_at: z.string(),
  })
  .loose();

export const CreateOneStepLinkResponseSchema = chargeDataResponse(
  ChargeLinkDataSchema.extend({
    custom_id: z.string().nullable(),
    request_delivery_address: z.boolean(),
    message: z.string().nullable(),
    expire_at: z.string(),
  }).loose(),
);
export type CreateOneStepLinkResponse = z.infer<typeof CreateOneStepLinkResponseSchema>;

export const DefineLinkPayMethodResponseSchema = chargeDataResponse(ChargeLinkDataSchema);
export type DefineLinkPayMethodResponse = z.infer<typeof DefineLinkPayMethodResponseSchema>;
export const UpdateChargeLinkResponseSchema = chargeDataResponse(ChargeLinkDataSchema);
export type UpdateChargeLinkResponse = z.infer<typeof UpdateChargeLinkResponseSchema>;
export const SendLinkEmailResponseSchema = ChargeCodeResponseSchema;
export type SendLinkEmailResponse = z.infer<typeof SendLinkEmailResponseSchema>;

export const GetNotificationResponseSchema = chargeDataResponse(
  z.array(
    z
      .object({
        created_at: z.string(),
        custom_id: z.string().nullable(),
        id: z.number().int(),
        identifiers: z.union([
          z
            .object({
              charge_id: z.number().int(),
              subscription_id: z.never().optional(),
              carnet_id: z.never().optional(),
            })
            .loose(),
          z
            .object({
              charge_id: z.never().optional(),
              subscription_id: z.number().int(),
              carnet_id: z.never().optional(),
            })
            .loose(),
          z
            .object({
              charge_id: z.never().optional(),
              subscription_id: z.never().optional(),
              carnet_id: z.number().int(),
            })
            .loose(),
        ]),
        status: z.object({ current: z.string(), previous: z.string().nullable() }).loose(),
        type: z.string(),
        value: z.number().optional(),
        received_by_bank_at: z.string().optional(),
      })
      .loose(),
  ),
);
export type GetNotificationResponse = z.infer<typeof GetNotificationResponseSchema>;

const CreateChargeCardResponseBaseShape = {
  charge_id: z.number().int(),
  installments: z.number().int(),
  installment_value: z.number(),
  total: z.number(),
};

const CreateChargeCardChallengeSchema = z
  .object({
    form_data: z
      .object({
        method: z.literal('POST'),
        action_url: z.string(),
        creq: z.string(),
        threeDSSessionData: z.string(),
      })
      .loose()
      .optional(),
    html_template: z.string().optional(),
  })
  .loose();

export const CreateChargeCardResponseSchema = z.discriminatedUnion('status', [
  z
    .object({
      ...CreateChargeCardResponseBaseShape,
      status: z.literal('approved'),
      refusal: z.never().optional(),
      tds_challenge: z.never().optional(),
    })
    .loose(),
  z
    .object({
      ...CreateChargeCardResponseBaseShape,
      status: z.literal('unpaid'),
      refusal: ChargeRefusalSchema,
      tds_challenge: z.never().optional(),
    })
    .loose(),
  z
    .object({
      ...CreateChargeCardResponseBaseShape,
      status: z.literal('waiting'),
      refusal: z.never().optional(),
      tds_challenge: CreateChargeCardChallengeSchema.optional(),
    })
    .loose(),
]);
export type CreateChargeCardResponse = z.infer<typeof CreateChargeCardResponseSchema>;

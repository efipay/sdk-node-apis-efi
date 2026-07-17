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

const NumberIdParamsSchema = z.object({ id: z.number().int() }).strict();
const ChargeEmailBodySchema = z.object({ email: z.string() }).strict();
const ChargeHistoryBodySchema = z.object({ description: z.string() }).strict();

export const ChargeItemSchema = z
  .object({
    name: z.string(),
    value: z.number().int(),
    amount: z.number().int(),
    marketplace: z
      .object({
        mode: z.union([z.literal(1), z.literal(2)]).optional(),
        payee_code: z.string().optional(),
        percentage: z.number().optional(),
        fixed: z.number().optional(),
        repasses: z
          .array(
            z
              .object({
                payee_code: z.string(),
                percentage: z.number().optional(),
                fixed: z.number().optional(),
              })
              .strict(),
          )
          .optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export type ChargeItem = z.infer<typeof ChargeItemSchema>;

export const ChargeShippingSchema = z
  .object({
    name: z.string(),
    value: z.number().int(),
    payee_code: z.string().optional(),
  })
  .strict();

export type ChargeShipping = z.infer<typeof ChargeShippingSchema>;

export const ChargeMetadataSchema = z
  .object({
    custom_id: z.string().optional(),
    notification_url: z.string().optional(),
  })
  .strict();

export type ChargeMetadata = z.infer<typeof ChargeMetadataSchema>;

export const ChargeAddressSchema = z
  .object({
    street: z.string(),
    number: z.union([z.string(), z.number()]),
    neighborhood: z.string(),
    zipcode: z.string(),
    city: z.string(),
    complement: z.string().nullable().optional(),
    state: UfSchema.or(z.string()),
  })
  .strict();

export type ChargeAddress = z.infer<typeof ChargeAddressSchema>;

export const ChargeCustomerSchema = z
  .object({
    name: z.string().optional(),
    cpf: z.string().optional(),
    email: z.string().optional(),
    phone_number: z.string().optional(),
    birth: z.string().optional(),
    address: ChargeAddressSchema.optional(),
    juridical_person: z
      .object({
        corporate_name: z.string(),
        cnpj: z.string(),
      })
      .strict()
      .optional(),
  })
  .strict();

export type ChargeCustomer = z.infer<typeof ChargeCustomerSchema>;

export const ChargeDiscountSchema = z
  .object({
    type: z.enum(['percentage', 'currency']),
    value: z.number().int(),
  })
  .strict();

export type ChargeDiscount = z.infer<typeof ChargeDiscountSchema>;

export const ChargeConditionalDiscountSchema = ChargeDiscountSchema.extend({
  until_date: z.string(),
});

export type ChargeConditionalDiscount = z.infer<typeof ChargeConditionalDiscountSchema>;

export const ChargeInterestSchema = z.union([
  z.number().int(),
  z
    .object({
      value: z.number().int(),
      type: z.enum(['monthly', 'daily']),
    })
    .strict(),
]);

export type ChargeInterest = z.infer<typeof ChargeInterestSchema>;

export const BankingBilletPaymentSchema = z
  .object({
    banking_billet: z
      .object({
        customer: ChargeCustomerSchema,
        expire_at: z.string(),
        discount: ChargeDiscountSchema.optional(),
        conditional_discount: ChargeConditionalDiscountSchema.optional(),
        configurations: z
          .object({
            days_to_write_off: z.number().int().optional(),
            fine: z.number().int().optional(),
            interest: ChargeInterestSchema.optional(),
          })
          .strict()
          .optional(),
        message: z.string().optional(),
      })
      .strict(),
  })
  .strict();

export type BankingBilletPayment = z.infer<typeof BankingBilletPaymentSchema>;

export const CreditCardPaymentSchema = z
  .object({
    credit_card: z
      .object({
        customer: ChargeCustomerSchema.extend({ email: z.string() }),
        installments: z.number().int().optional(),
        discount: ChargeDiscountSchema.optional(),
        billing_address: ChargeAddressSchema.optional(),
        payment_token: z.string(),
        message: z.string().optional(),
        trial_days: z.number().int().optional(),
      })
      .strict(),
  })
  .strict();

export type CreditCardPayment = z.infer<typeof CreditCardPaymentSchema>;

export const ChargePaymentSchema = z.union([
  BankingBilletPaymentSchema.extend({ credit_card: z.never().optional() }).strict(),
  CreditCardPaymentSchema.extend({ banking_billet: z.never().optional() }).strict(),
]);

export type ChargePayment = z.infer<typeof ChargePaymentSchema>;

export const CreateChargeBodySchema = z
  .object({
    items: z.array(ChargeItemSchema),
    shippings: z.array(ChargeShippingSchema).optional(),
    metadata: ChargeMetadataSchema.optional(),
  })
  .strict();

export type CreateChargeBody = z.infer<typeof CreateChargeBodySchema>;

export const CreateOneStepChargeBodySchema = CreateChargeBodySchema.extend({
  payment: ChargePaymentSchema,
}).strict();

export type CreateOneStepChargeBody = z.infer<typeof CreateOneStepChargeBodySchema>;

export const DefinePayMethodParamsSchema = NumberIdParamsSchema;
export type DefinePayMethodParams = z.infer<typeof DefinePayMethodParamsSchema>;

export const DefinePayMethodBodySchema = z.object({ payment: ChargePaymentSchema }).strict();
export type DefinePayMethodBody = z.infer<typeof DefinePayMethodBodySchema>;

export const DetailChargeParamsSchema = NumberIdParamsSchema;
export type DetailChargeParams = z.infer<typeof DetailChargeParamsSchema>;

export const ChargeListStatusSchema = z.enum([
  'new',
  'waiting',
  'link',
  'paid',
  'unpaid',
  'canceled',
  'identified',
  'settled',
  'expired',
]);

export const ListChargesParamsSchema = z
  .object({
    charge_type: z.enum(['billet', 'carnet', 'subscription', 'card']),
    begin_date: z.string(),
    end_date: z.string(),
    date_of: z.enum(['creation', 'payment', 'expired']).optional(),
    status: ChargeListStatusSchema.optional(),
    customer_document: z.string().optional(),
    custom_id: z.string().optional(),
    value: z.number().int().optional(),
    limit: z.number().int().optional(),
    page: z.number().int().optional(),
  })
  .strict();

export type ListChargesParams = z.infer<typeof ListChargesParamsSchema>;

export const UpdateChargeMetadataParamsSchema = NumberIdParamsSchema;
export type UpdateChargeMetadataParams = z.infer<typeof UpdateChargeMetadataParamsSchema>;

export const UpdateChargeMetadataBodySchema = ChargeMetadataSchema;
export type UpdateChargeMetadataBody = z.infer<typeof UpdateChargeMetadataBodySchema>;

export const UpdateBilletParamsSchema = NumberIdParamsSchema;
export type UpdateBilletParams = z.infer<typeof UpdateBilletParamsSchema>;

export const UpdateBilletBodySchema = z.object({ expire_at: z.string() }).strict();
export type UpdateBilletBody = z.infer<typeof UpdateBilletBodySchema>;

export const CancelChargeParamsSchema = NumberIdParamsSchema;
export type CancelChargeParams = z.infer<typeof CancelChargeParamsSchema>;

export const SendBilletEmailParamsSchema = NumberIdParamsSchema;
export type SendBilletEmailParams = z.infer<typeof SendBilletEmailParamsSchema>;
export const SendBilletEmailBodySchema = ChargeEmailBodySchema;
export type SendBilletEmailBody = z.infer<typeof SendBilletEmailBodySchema>;

export const CreateChargeHistoryParamsSchema = NumberIdParamsSchema;
export type CreateChargeHistoryParams = z.infer<typeof CreateChargeHistoryParamsSchema>;
export const CreateChargeHistoryBodySchema = ChargeHistoryBodySchema;
export type CreateChargeHistoryBody = z.infer<typeof CreateChargeHistoryBodySchema>;

export const DefineBalanceSheetBilletParamsSchema = NumberIdParamsSchema;
export type DefineBalanceSheetBilletParams = z.infer<typeof DefineBalanceSheetBilletParamsSchema>;
export const DefineBalanceSheetBilletBodySchema = z
  .object({
    title: z.string(),
    body: z.record(z.string(), z.unknown()),
  })
  .strict();
export type DefineBalanceSheetBilletBody = z.infer<typeof DefineBalanceSheetBilletBodySchema>;

export const SettleChargeParamsSchema = NumberIdParamsSchema;
export type SettleChargeParams = z.infer<typeof SettleChargeParamsSchema>;

export const CardPaymentRetryParamsSchema = NumberIdParamsSchema;
export type CardPaymentRetryParams = z.infer<typeof CardPaymentRetryParamsSchema>;
export const CardPaymentRetryBodySchema = DefinePayMethodBodySchema;
export type CardPaymentRetryBody = z.infer<typeof CardPaymentRetryBodySchema>;

export const RefundCardParamsSchema = NumberIdParamsSchema;
export type RefundCardParams = z.infer<typeof RefundCardParamsSchema>;
export const RefundCardBodySchema = z.object({ amount: z.number().int().optional() }).strict();
export type RefundCardBody = z.infer<typeof RefundCardBodySchema>;

export const GetInstallmentsParamsSchema = z
  .object({
    total: z.number().int(),
    brand: z.enum(['visa', 'mastercard', 'amex', 'elo']).or(z.string()),
  })
  .strict();
export type GetInstallmentsParams = z.infer<typeof GetInstallmentsParamsSchema>;

export const CreateCarnetBodySchema = z
  .object({
    items: z.array(ChargeItemSchema),
    customer: ChargeCustomerSchema,
    expire_at: z.string(),
    repeats: z.number().int(),
    split_items: z.boolean().optional(),
    configurations: z
      .object({
        fine: z.number().int().optional(),
        interest: ChargeInterestSchema.optional(),
      })
      .strict()
      .optional(),
    discount: ChargeDiscountSchema.optional(),
    conditional_discount: ChargeConditionalDiscountSchema.optional(),
    message: z.string().optional(),
    metadata: ChargeMetadataSchema.optional(),
  })
  .strict();
export type CreateCarnetBody = z.infer<typeof CreateCarnetBodySchema>;

export const DetailCarnetParamsSchema = NumberIdParamsSchema;
export type DetailCarnetParams = z.infer<typeof DetailCarnetParamsSchema>;

export const UpdateCarnetMetadataParamsSchema = NumberIdParamsSchema;
export type UpdateCarnetMetadataParams = z.infer<typeof UpdateCarnetMetadataParamsSchema>;
export const UpdateCarnetMetadataBodySchema = ChargeMetadataSchema;
export type UpdateCarnetMetadataBody = z.infer<typeof UpdateCarnetMetadataBodySchema>;

export const UpdateCarnetParcelParamsSchema = z.object({ id: z.number().int(), parcel: z.number().int() }).strict();
export type UpdateCarnetParcelParams = z.infer<typeof UpdateCarnetParcelParamsSchema>;
export const UpdateCarnetParcelBodySchema = z.object({ expire_at: z.string() }).strict();
export type UpdateCarnetParcelBody = z.infer<typeof UpdateCarnetParcelBodySchema>;

export const UpdateCarnetParcelsParamsSchema = NumberIdParamsSchema;
export type UpdateCarnetParcelsParams = z.infer<typeof UpdateCarnetParcelsParamsSchema>;
export const UpdateCarnetParcelsBodySchema = z
  .object({
    parcels: z.array(
      z
        .object({
          parcel: z.number().int(),
          expire_at: z.string(),
        })
        .strict(),
    ),
  })
  .strict();
export type UpdateCarnetParcelsBody = z.infer<typeof UpdateCarnetParcelsBodySchema>;

export const CancelCarnetParamsSchema = NumberIdParamsSchema;
export type CancelCarnetParams = z.infer<typeof CancelCarnetParamsSchema>;
export const CancelCarnetParcelParamsSchema = UpdateCarnetParcelParamsSchema;
export type CancelCarnetParcelParams = z.infer<typeof CancelCarnetParcelParamsSchema>;

export const SendCarnetEmailParamsSchema = NumberIdParamsSchema;
export type SendCarnetEmailParams = z.infer<typeof SendCarnetEmailParamsSchema>;
export const SendCarnetEmailBodySchema = ChargeEmailBodySchema;
export type SendCarnetEmailBody = z.infer<typeof SendCarnetEmailBodySchema>;

export const SendCarnetParcelEmailParamsSchema = UpdateCarnetParcelParamsSchema;
export type SendCarnetParcelEmailParams = z.infer<typeof SendCarnetParcelEmailParamsSchema>;
export const SendCarnetParcelEmailBodySchema = ChargeEmailBodySchema;
export type SendCarnetParcelEmailBody = z.infer<typeof SendCarnetParcelEmailBodySchema>;

export const CreateCarnetHistoryParamsSchema = NumberIdParamsSchema;
export type CreateCarnetHistoryParams = z.infer<typeof CreateCarnetHistoryParamsSchema>;
export const CreateCarnetHistoryBodySchema = ChargeHistoryBodySchema;
export type CreateCarnetHistoryBody = z.infer<typeof CreateCarnetHistoryBodySchema>;

export const SettleCarnetParamsSchema = NumberIdParamsSchema;
export type SettleCarnetParams = z.infer<typeof SettleCarnetParamsSchema>;
export const SettleCarnetParcelParamsSchema = UpdateCarnetParcelParamsSchema;
export type SettleCarnetParcelParams = z.infer<typeof SettleCarnetParcelParamsSchema>;

export const CreatePlanBodySchema = z
  .object({
    name: z.string(),
    interval: z.number().int(),
    repeats: z.number().int().nullable().optional(),
  })
  .strict();
export type CreatePlanBody = z.infer<typeof CreatePlanBodySchema>;

export const ListPlansParamsSchema = z
  .object({
    name: z.string().optional(),
    limit: z.number().int().optional(),
    offset: z.number().int().optional(),
  })
  .strict();
export type ListPlansParams = z.infer<typeof ListPlansParamsSchema>;

export const UpdatePlanParamsSchema = NumberIdParamsSchema;
export type UpdatePlanParams = z.infer<typeof UpdatePlanParamsSchema>;
export const UpdatePlanBodySchema = z.object({ name: z.string() }).strict();
export type UpdatePlanBody = z.infer<typeof UpdatePlanBodySchema>;

export const DeletePlanParamsSchema = NumberIdParamsSchema;
export type DeletePlanParams = z.infer<typeof DeletePlanParamsSchema>;

export const CreateSubscriptionParamsSchema = NumberIdParamsSchema;
export type CreateSubscriptionParams = z.infer<typeof CreateSubscriptionParamsSchema>;
export const CreateSubscriptionBodySchema = CreateChargeBodySchema;
export type CreateSubscriptionBody = z.infer<typeof CreateSubscriptionBodySchema>;

export const CreateOneStepSubscriptionParamsSchema = NumberIdParamsSchema;
export type CreateOneStepSubscriptionParams = z.infer<typeof CreateOneStepSubscriptionParamsSchema>;
export const CreateOneStepSubscriptionBodySchema = CreateOneStepChargeBodySchema;
export type CreateOneStepSubscriptionBody = z.infer<typeof CreateOneStepSubscriptionBodySchema>;

export const DefineSubscriptionPayMethodParamsSchema = NumberIdParamsSchema;
export type DefineSubscriptionPayMethodParams = z.infer<typeof DefineSubscriptionPayMethodParamsSchema>;
export const DefineSubscriptionPayMethodBodySchema = DefinePayMethodBodySchema;
export type DefineSubscriptionPayMethodBody = z.infer<typeof DefineSubscriptionPayMethodBodySchema>;

export const DetailSubscriptionParamsSchema = NumberIdParamsSchema;
export type DetailSubscriptionParams = z.infer<typeof DetailSubscriptionParamsSchema>;

export const CreateOneStepSubscriptionLinkParamsSchema = NumberIdParamsSchema;
export type CreateOneStepSubscriptionLinkParams = z.infer<typeof CreateOneStepSubscriptionLinkParamsSchema>;

export const UpdateSubscriptionMetadataParamsSchema = NumberIdParamsSchema;
export type UpdateSubscriptionMetadataParams = z.infer<typeof UpdateSubscriptionMetadataParamsSchema>;
export const UpdateSubscriptionMetadataBodySchema = ChargeMetadataSchema;
export type UpdateSubscriptionMetadataBody = z.infer<typeof UpdateSubscriptionMetadataBodySchema>;

export const UpdateSubscriptionParamsSchema = NumberIdParamsSchema;
export type UpdateSubscriptionParams = z.infer<typeof UpdateSubscriptionParamsSchema>;
export const UpdateSubscriptionBodySchema = z
  .object({
    plan_id: z.number().int().optional(),
    customer: z
      .object({
        email: z.email().optional(),
        phone_number: z.string().optional(),
      })
      .strict()
      .optional(),
    items: z.array(ChargeItemSchema).optional(),
    shippings: z.array(ChargeShippingSchema).optional(),
    payment_token: z.string().regex(/^[a-fA-F0-9]{40}$/).optional(),
  })
  .strict();
export type UpdateSubscriptionBody = z.infer<typeof UpdateSubscriptionBodySchema>;

export const CancelSubscriptionParamsSchema = NumberIdParamsSchema;
export type CancelSubscriptionParams = z.infer<typeof CancelSubscriptionParamsSchema>;

export const CreateSubscriptionHistoryParamsSchema = NumberIdParamsSchema;
export type CreateSubscriptionHistoryParams = z.infer<typeof CreateSubscriptionHistoryParamsSchema>;
export const CreateSubscriptionHistoryBodySchema = ChargeHistoryBodySchema;
export type CreateSubscriptionHistoryBody = z.infer<typeof CreateSubscriptionHistoryBodySchema>;

export const SendSubscriptionLinkEmailParamsSchema = NumberIdParamsSchema;
export type SendSubscriptionLinkEmailParams = z.infer<typeof SendSubscriptionLinkEmailParamsSchema>;
export const SendSubscriptionLinkEmailBodySchema = ChargeEmailBodySchema;
export type SendSubscriptionLinkEmailBody = z.infer<typeof SendSubscriptionLinkEmailBodySchema>;

export const LinkSettingsSchema = z
  .object({
    billet_discount: z.number().int().optional(),
    conditional_discount: ChargeConditionalDiscountSchema.optional(),
    card_discount: z.number().int().optional(),
    message: z.string().optional(),
    expire_at: z.string().optional(),
    request_delivery_address: z.boolean().optional(),
    payment_method: z.enum(['banking_billet', 'credit_card', 'all']).optional(),
  })
  .strict();

export const CreateOneStepLinkBodySchema = CreateChargeBodySchema.extend({
  settings: LinkSettingsSchema.optional(),
}).strict();
export type CreateOneStepLinkBody = z.infer<typeof CreateOneStepLinkBodySchema>;

export const CreateOneStepSubscriptionLinkBodySchema = CreateOneStepLinkBodySchema;
export type CreateOneStepSubscriptionLinkBody = z.infer<typeof CreateOneStepSubscriptionLinkBodySchema>;

export const DefineLinkPayMethodParamsSchema = NumberIdParamsSchema;
export type DefineLinkPayMethodParams = z.infer<typeof DefineLinkPayMethodParamsSchema>;
export const DefineLinkPayMethodBodySchema = LinkSettingsSchema;
export type DefineLinkPayMethodBody = z.infer<typeof DefineLinkPayMethodBodySchema>;

export const UpdateChargeLinkParamsSchema = NumberIdParamsSchema;
export type UpdateChargeLinkParams = z.infer<typeof UpdateChargeLinkParamsSchema>;
export const UpdateChargeLinkBodySchema = LinkSettingsSchema;
export type UpdateChargeLinkBody = z.infer<typeof UpdateChargeLinkBodySchema>;

export const SendLinkEmailParamsSchema = NumberIdParamsSchema;
export type SendLinkEmailParams = z.infer<typeof SendLinkEmailParamsSchema>;
export const SendLinkEmailBodySchema = ChargeEmailBodySchema;
export type SendLinkEmailBody = z.infer<typeof SendLinkEmailBodySchema>;

export const GetNotificationParamsSchema = z.object({ token: z.string() }).strict();
export type GetNotificationParams = z.infer<typeof GetNotificationParamsSchema>;

const ChargeCardAddressSchema = z
  .object({
    street: z.string(),
    number: z.string(),
    neighborhood: z.string(),
    zipcode: z.string().regex(/^\d{8}$/),
    city: z.string(),
    complement: z.string().nullable().optional(),
    state: UfSchema,
  })
  .strict();

const ChargeCardRepasseSchema = z.union([
  z
    .object({
      payee_code: z.string().regex(/^[a-fA-F0-9]{32}$/),
      percentage: z.number().int().min(0).max(10000),
      fixed: z.never().optional(),
    })
    .strict(),
  z
    .object({
      payee_code: z.string().regex(/^[a-fA-F0-9]{32}$/),
      fixed: z.number().int().nonnegative(),
      percentage: z.never().optional(),
    })
    .strict(),
]);

const ChargeCardShippingSchema = z
  .object({
    name: z.string().max(255),
    value: z.number().int().nonnegative(),
    payee_code: z.string().regex(/^[a-fA-F0-9]{32}$/).optional(),
  })
  .strict();

export const ChargeCardItemSchema = z
  .object({
    name: z.string().min(1).max(255).regex(/^[^<>]+$/),
    value: z.number().int().nonnegative(),
    amount: z.number().int().positive().optional(),
    marketplace: z
      .object({
        mode: z.union([z.literal(1), z.literal(2)]).optional(),
        repasses: z.array(ChargeCardRepasseSchema).min(1),
      })
      .strict()
      .optional(),
  })
  .strict();
export type ChargeCardItem = z.infer<typeof ChargeCardItemSchema>;

const ChargeCardCustomerBaseSchema = z.object({
  email: z.email().max(255),
  phone_number: z.string().regex(/^[1-9]{2}9?[0-9]{8}$/),
  birth: z.iso.date().optional(),
  address: ChargeCardAddressSchema.optional(),
});

export const ChargeCardCustomerSchema = z.union([
  ChargeCardCustomerBaseSchema.extend({
    name: z
      .string()
      .min(1)
      .max(255)
      .regex(/^(?!.*[\u0600-\u06FF])[ ]*(.+[ ]+)+.+[ ]*$/),
    cpf: z.string().regex(/^\d{11}$/),
    juridical_person: z.never().optional(),
  }).strict(),
  ChargeCardCustomerBaseSchema.extend({
    name: z.never().optional(),
    cpf: z.never().optional(),
    juridical_person: z
      .object({
        corporate_name: z.string().min(1).max(255),
        cnpj: z.string().regex(/^\d{14}$/),
      })
      .strict(),
  }).strict(),
]);
export type ChargeCardCustomer = z.infer<typeof ChargeCardCustomerSchema>;

export const CreateChargeCardBodySchema = z
  .object({
    items: z.array(ChargeCardItemSchema).min(1),
    shippings: z.array(ChargeCardShippingSchema).min(1).optional(),
    customer: ChargeCardCustomerSchema,
    installments: z.number().int().min(1).max(12).optional(),
    billing_address: ChargeCardAddressSchema.optional(),
    payment_token: z.string().regex(/^[a-fA-F0-9]{40}$/),
    tds_info: z
      .object({
        tds_identifier: z.uuid(),
        challenge_callback_url: z.url().regex(/^https?:\/\//),
      })
      .strict(),
    discount: z
      .object({
        type: z.enum(['currency', 'percentage']),
        value: z.number().int().positive(),
      })
      .strict()
      .optional(),
    message: z
      .string()
      .regex(/^[^\n]{0,100}(\n[^\n]{0,100}){0,3}$/)
      .optional(),
  })
  .strict();
export type CreateChargeCardBody = z.infer<typeof CreateChargeCardBodySchema>;

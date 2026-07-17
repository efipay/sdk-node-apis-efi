import EfiPay, {
  DetailChargeParamsSchema,
  PayRequestBarCodeBodySchema,
  PixSplitUnlinkChargeParamsSchema,
  type CreateOneStepChargeBody,
  type SdkOptions,
} from 'sdk-node-apis-efi';

const options: SdkOptions = {
  sandbox: true,
  client_id: 'client_id',
  client_secret: 'client_secret',
};

const sdk = new EfiPay(options);

void DetailChargeParamsSchema;
void PayRequestBarCodeBodySchema;
void PixSplitUnlinkChargeParamsSchema;

sdk.detailCharge({ id: 1 });
// @ts-expect-error id is required.
sdk.detailCharge({});
// @ts-expect-error the route param is named id.
sdk.detailCharge({ charge_id: 1 });
// @ts-expect-error id is an integer.
sdk.detailCharge({ id: '1' });

sdk.pixSplitUnlinkCharge({ txid: 'txid-123' });
// @ts-expect-error unlink only receives txid, not splitConfigId.
sdk.pixSplitUnlinkCharge({ txid: 'txid-123', splitConfigId: 'split-123' });

sdk.pixSplitUnlinkDueCharge({ txid: 'txid-123' });
// @ts-expect-error unlink cobv only receives txid, not splitConfigId.
sdk.pixSplitUnlinkDueCharge({ txid: 'txid-123', splitConfigId: 'split-123' });

sdk.pixSplitLinkCharge({ txid: 'txid-123', splitConfigId: 'split-123' });
// @ts-expect-error link requires splitConfigId.
sdk.pixSplitLinkCharge({ txid: 'txid-123' });

sdk.payRequestBarCode({ codBarras: '00190500954014481606906809350314337370000000100' }, { valor: 1000, dataPagamento: '2026-01-01' });
// @ts-expect-error codBarras is a string.
sdk.payRequestBarCode({ codBarras: 123 }, { valor: 1000, dataPagamento: '2026-01-01' });
// @ts-expect-error valor is required.
sdk.payRequestBarCode({ codBarras: '00190500954014481606906809350314337370000000100' }, { dataPagamento: '2026-01-01' });
// @ts-expect-error valor is an integer amount in cents.
sdk.payRequestBarCode({ codBarras: '00190500954014481606906809350314337370000000100' }, { valor: '1000', dataPagamento: '2026-01-01' });

sdk.updateBillet({ id: 1 }, { expire_at: '2026-01-01' });
// @ts-expect-error expire_at is required.
sdk.updateBillet({ id: 1 }, {});
// @ts-expect-error updateBillet has a closed request body.
sdk.updateBillet({ id: 1 }, { expire_at: '2026-01-01', ignored: true });

const billetCharge: CreateOneStepChargeBody = {
  items: [{ name: 'Produto', value: 1000, amount: 1 }],
  payment: {
    banking_billet: {
      customer: { name: 'Cliente', cpf: '12345678909' },
      expire_at: '2026-01-01',
    },
  },
};

const cardCharge: CreateOneStepChargeBody = {
  items: [{ name: 'Produto', value: 1000, amount: 1 }],
  payment: {
    credit_card: {
      customer: { email: 'cliente@example.com' },
      payment_token: 'token',
    },
  },
};

const invalidCharge: CreateOneStepChargeBody = {
  items: [{ name: 'Produto', value: 1000, amount: 1 }],
  // @ts-expect-error banking_billet and credit_card are mutually exclusive.
  payment: {
    banking_billet: {
      customer: { name: 'Cliente', cpf: '12345678909' },
      expire_at: '2026-01-01',
    },
    credit_card: {
      customer: { email: 'cliente@example.com' },
      payment_token: 'token',
    },
  },
};

void billetCharge;
void cardCharge;
void invalidCharge;

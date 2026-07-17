import type { CreateOneStepChargeBody, SdkOptions } from 'sdk-node-apis-efi';

const options: SdkOptions = {
  sandbox: true,
  client_id: 'client_id',
  client_secret: 'client_secret',
};

const billetCharge: CreateOneStepChargeBody = {
  items: [{ name: 'Produto', value: 1000, amount: 1 }],
  payment: {
    banking_billet: {
      customer: { email: 'cliente@example.com' },
      expire_at: '2026-12-31',
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
      customer: { email: 'cliente@example.com' },
      expire_at: '2026-12-31',
    },
    credit_card: {
      customer: { email: 'cliente@example.com' },
      payment_token: 'token',
    },
  },
};

const deprecatedOptions: SdkOptions = {
  sandbox: true,
  client_id: 'client_id',
  client_secret: 'client_secret',
  // @ts-expect-error deprecated sdk-node-apis-efi aliases are not part of the new SDK.
  pix_cert: './cert.p12',
};

void options;
void billetCharge;
void cardCharge;
void invalidCharge;
void deprecatedOptions;

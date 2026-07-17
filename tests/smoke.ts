import EfiPay, {
  EfiPay as NamedEfiPay,
  type CreateOneStepChargeBody,
  type PixCreateImmediateChargeBody,
  type SdkOptions,
} from 'sdk-node-apis-efi';

const options: SdkOptions = {
  client_id: 'client_id',
  client_secret: 'client_secret',
  sandbox: true,
};

const sdk = new EfiPay(options);
const namedSdk = new NamedEfiPay(options);

const pixBody: PixCreateImmediateChargeBody = {
  calendario: { expiracao: 3600 },
  valor: { original: '10.00' },
  chave: 'chave-pix',
};

const chargeBody: CreateOneStepChargeBody = {
  items: [{ name: 'Produto', value: 1000, amount: 1 }],
  payment: {
    banking_billet: {
      customer: { name: 'Cliente', cpf: '12345678909', email: 'cliente@example.com' },
      expire_at: '2026-12-31',
    },
  },
};

if (EfiPay !== NamedEfiPay) {
  throw new Error('Default and named EfiPay exports should reference the same class.');
}

for (const method of ['pixCreateImmediateCharge', 'createOneStepCharge', 'ofConfigDetail', 'payDetailBarCode']) {
  if (typeof (sdk as any)[method] !== 'function') {
    throw new Error(`Missing method ${method}`);
  }
}

if (!(namedSdk instanceof EfiPay)) {
  throw new Error('Named EfiPay instance should be compatible with default EfiPay.');
}

void pixBody;
void chargeBody;

import EfiPay, { EfiPay as NamedEfiPay } from '../dist/esm/index.js';

const sdk = new EfiPay({
  client_id: 'client_id',
  client_secret: 'client_secret',
  sandbox: true,
});

if (EfiPay !== NamedEfiPay) {
  throw new Error('Default and named EfiPay exports should match.');
}

if (typeof sdk.pixCreateImmediateCharge !== 'function') {
  throw new Error('Missing pixCreateImmediateCharge.');
}


const EfiPay = require('../dist/cjs/index.cjs');
const { EfiPay: NamedEfiPay } = require('../dist/cjs/index.cjs');

const sdk = new EfiPay({
  client_id: 'client_id',
  client_secret: 'client_secret',
  sandbox: true,
});

if (EfiPay !== NamedEfiPay) {
  throw new Error('Default require and named EfiPay export should match.');
}

if (typeof sdk.pixCreateImmediateCharge !== 'function') {
  throw new Error('Missing pixCreateImmediateCharge.');
}

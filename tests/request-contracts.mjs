import assert from 'node:assert/strict';
import * as Types from '../dist/esm/index.js';

assert.deepEqual(Types.ListPlansParamsSchema.parse({ name: 'Plano', limit: 20, offset: 0 }), {
  name: 'Plano',
  limit: 20,
  offset: 0,
});
assert.equal(Types.ListPlansParamsSchema.safeParse({ page: 1 }).success, false);

const paymentToken = '0123456789abcdef0123456789abcdef01234567';
assert.equal(
  Types.UpdateSubscriptionBodySchema.safeParse({
    customer: { email: 'cliente@example.com', phone_number: '31999999999' },
    payment_token: paymentToken,
  }).success,
  true,
);
assert.equal(Types.UpdateSubscriptionBodySchema.safeParse({ metadata: { custom_id: 'pedido' } }).success, false);

assert.equal(
  Types.PixUpdateDueChargeBodySchema.safeParse({ valor: { original: '10.00' } }).success,
  true,
);
assert.equal(
  Types.PixUpdateDueChargeBatchBodySchema.safeParse({
    cobsv: [{ txid: 'charge-id', calendario: { dataDeVencimento: '2026-08-15' } }],
  }).success,
  true,
);

const automaticCharge = {
  idRec: 'RR000000000000000000000000001',
  calendario: { dataDeVencimento: '2026-08-15' },
  valor: { original: '10.00' },
  ajusteDiaUtil: true,
  devedor: { email: 'cliente@example.com', cidade: 'Belo Horizonte', uf: 'MG' },
  recebedor: { agencia: '0001', conta: '12345', tipoConta: 'CORRENTE' },
};
assert.equal(Types.PixCreateAutomaticChargeBodySchema.safeParse(automaticCharge).success, true);
assert.equal(Types.PixSendDetailParamsSchema.safeParse({ e2eId: 'E0000000000000000000000000000000' }).success, true);
assert.equal(Types.PixSendDetailParamsSchema.safeParse({ e2eid: 'E0000000000000000000000000000000' }).success, false);

const cardBody = {
  items: [{ name: 'Produto teste', value: 5000 }],
  shippings: [{ name: 'Frete', value: 1500 }],
  customer: {
    name: 'JOAO SILVA',
    cpf: '87299792001',
    email: 'joao@example.com',
    phone_number: '31987654321',
  },
  payment_token: paymentToken,
  tds_info: {
    tds_identifier: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
    challenge_callback_url: 'https://example.com/3ds',
  },
};
assert.equal(Types.CreateChargeCardBodySchema.safeParse(cardBody).success, true);
assert.equal(Types.CreateChargeCardBodySchema.safeParse({ ...cardBody, metadata: {} }).success, false);
assert.equal(
  Types.CreateChargeCardBodySchema.safeParse({
    ...cardBody,
    shippings: [{ name: 'x'.repeat(256), value: 1500 }],
  }).success,
  false,
);
assert.equal(
  Types.CreateChargeCardBodySchema.safeParse({
    ...cardBody,
    tds_info: { ...cardBody.tds_info, challenge_callback_url: 'ftp://example.com/3ds' },
  }).success,
  false,
);
assert.equal(
  Types.CreateChargeCardBodySchema.safeParse({
    ...cardBody,
    items: [
      {
        name: 'Produto split',
        value: 5000,
        marketplace: {
          repasses: [{ payee_code: 'a'.repeat(32), percentage: 5000, fixed: 100 }],
        },
      },
    ],
  }).success,
  false,
);
assert.equal(
  Types.CreateChargeCardBodySchema.safeParse({ ...cardBody, message: '1\n2\n3\n4\n5' }).success,
  false,
);
assert.equal(Types.RefundCardBodySchema.safeParse({}).success, true);

console.log('Contratos Zod de request validados para Cobrancas, Pix e assinaturas.');

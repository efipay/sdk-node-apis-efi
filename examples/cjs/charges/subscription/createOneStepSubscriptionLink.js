/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#associar-plano-ao-link-de-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const items = [
  {
    "name": "Product 1",
    "amount": 1,
    "value": 1000
  },
  {
    "name": "Product 2",
    "amount": 2,
    "value": 2000
  }
];

const settings = {
  "payment_method": "all",
  "expire_at": "2024-12-15",
  "request_delivery_address": false
};

const body = {
  "items": items,
  "settings": settings
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createOneStepSubscriptionLink(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#1-crie-inscrições-assinaturas-para-vincular-ao-plano
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

const shippings = [
  {
    "name": "Shipping to City",
    "value": 2000
  }
];

const metadata = {
  "custom_id": "Order_00001",
  "notification_url": "https://your-domain.com.br/notification/"
};

const body = {
  "items": items,
  "shippings": shippings,
  "metadata": metadata
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createSubscription(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

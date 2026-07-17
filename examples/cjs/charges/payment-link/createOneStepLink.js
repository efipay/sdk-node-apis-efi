/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/link-de-pagamento#criando-o-link-de-pagamento-em-one-step
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

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

const metadata = {
  "custom_id": "Order_00001",
  "notification_url": "https://your-domain.com.br/notification"
};

const settings = {
  "payment_method": "all",
  "expire_at": "2024-12-15",
  "request_delivery_address": false,
  "billet_discount": 500,
  "conditional_discount": {
    "type": "percentage",
    "value": 500,
    "until_date": "2024-12-10"
  },
  "card_discount": 500,
  "message": "This is a space\n of up to 80 characters\n to tell\n your client something"
};

const body = {
  "items": items,
  "metadata": metadata,
  "settings": settings
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createOneStepLink(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

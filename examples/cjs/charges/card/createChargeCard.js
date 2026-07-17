/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const paymentToken = "0000000000000000000000000000000000000000";

const tdsInfo = {
  "tds_identifier": "00000000-0000-0000-0000-000000000000",
  "challenge_callback_url": "https://your-domain.com.br/payment-processing/"
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
    "value": 1200
  }
];

const metadata = {
  "notification_url": "https://webhook.site/00000000-0000-0000-0000-00000000"
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656",
  "phone_number": "5144916523",
  "email": "oldbuck@server.com.br"
};

const billingAddress = {
  "street": "Av JK",
  "number": "909",
  "neighborhood": "Bauxita",
  "zipcode": "35400000",
  "city": "Ouro Preto",
  "state": "MG"
};

const discount = {
  "type": "currency",
  "value": 599
};

const body = {
  "items": items,
  "installments": 1,
  "shippings": shippings,
  "customer": customer,
  "discount": discount,
  "billing_address": billingAddress,
  "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
  "payment_token": paymentToken,
  "tds_info": tdsInfo
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createChargeCard(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#criação-de-cobrança-por-cartão-de-crédito-em-one-step-um-passo
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const paymentToken = "insert_here_the_payment_token_referring_to_card_data";

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
  "notification_url": "https://your-domain.com.br/notification/"
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656",
  "phone_number": "5144916523",
  "email": "oldbuck@server.com.br",
  "birth": "1990-01-15"
};

const billingAddress = {
  "street": "Av JK",
  "number": 909,
  "neighborhood": "Bauxita",
  "zipcode": "35400000",
  "city": "Ouro Preto",
  "state": "MG"
};

const discount = {
  "type": "currency",
  "value": 599
};

const credit_card = {
  "customer": customer,
  "installments": 1,
  "discount": discount,
  "billing_address": billingAddress,
  "payment_token": paymentToken,
  "message": "This is a space\n of up to 80 characters\n to tell\n your client something"
};

const payment = {
  "credit_card": credit_card
};

const body = {
  "items": items,
  "shippings": shippings,
  "metadata": metadata,
  "payment": payment
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createOneStepCharge(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

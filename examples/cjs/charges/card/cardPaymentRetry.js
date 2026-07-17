/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#retentativa-de-pagamento-via-cartão-de-crédito
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const paymentToken = "insert_here_the_payment_token_referring_to_card_data";

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656",
  "phone_number": "5144916523",
  "email": "oldbuck@server.com.br",
  "birth": "1990-01-15"
};

const billingAddress = {
  "street": "Av JK",
  "number": "909",
  "neighborhood": "Bauxita",
  "zipcode": "35400000",
  "city": "Ouro Preto",
  "state": "MG"
};

const credit_card = {
  "customer": customer,
  "installments": 1,
  "billing_address": billingAddress,
  "payment_token": paymentToken
};

const payment = {
  "credit_card": credit_card
};

const body = {
  "payment": payment
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.cardPaymentRetry(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

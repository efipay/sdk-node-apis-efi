/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#2-defina-a-forma-de-pagamento-da-assinatura-e-os-dados-do-cliente
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const paymentToken = "insert_here_the_payment_token_referring_to_card_data";

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "04267484171",
  "phone_number": "5144916523",
  "email": "oldbuck@server.com.br",
  "birth": "1977-01-15"
};

const billingAddress = {
  "street": "Av. JK",
  "number": 909,
  "neighborhood": "Bauxita",
  "zipcode": "35400000",
  "city": "Ouro Preto",
  "state": "MG"
};

const body = {
  "payment": {
    "credit_card": {
      "billing_address": billingAddress,
      "payment_token": paymentToken,
      "customer": customer
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.defineSubscriptionPayMethod(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

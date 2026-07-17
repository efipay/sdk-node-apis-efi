/**
 * Detailed endpoint documentation
 *https://dev.efipay.com.br/docs/api-cobrancas/split-de-pagamento#criação-de-transação-split-de-pagamento-em-one-step-um-passo
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const paymentToken = "insert_here_the_payment_token_referring_to_card_data";

const item_1 = {
  "name": "Product 1",
  "amount": 1,
  "value": 1500,
  "marketplace": {
    "repasses": [
      {
        "payee_code": "Enter_Destination_Account_Identifier_Here",
        "percentage": 2500
      },
      {
        "payee_code": "Enter_Destination_Account_Identifier_Here",
        "percentage": 1500
      }
    ]
  }
};

const items = [
  item_1
];

const shippings = [
  {
    "name": "Shipping to City",
    "value": 1200,
    "payee_code": "Enter_Destination_Account_Identifier_Here"
  }
];

const metadata = {
  "notification_url": "https://your-domain.com.br/notification"
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "04267484171",
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

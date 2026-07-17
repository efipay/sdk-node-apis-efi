/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/split-de-pagamento#criação-de-transação-split-de-pagamento-em-one-step-um-passo
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const item_1 = {
  "name": "Product 1",
  "amount": 1,
  "value": 1500,
  "marketplace": {
    "mode": 2,
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
  "custom_id": "Order_0001",
  "notification_url": "https://your-domain.com.br/notification/"
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656",
  "phone_number": "5144916523"
};

const discount = {
  "type": "currency",
  "value": 599
};

const conditional_discount = {
  "type": "percentage",
  "value": 500,
  "until_date": "2024-12-10"
};

const configurations = {
  "fine": 200,
  "interest": 33
};

const bankingBillet = {
  "expire_at": "2024-12-10",
  "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
  "customer": customer,
  "discount": discount,
  "conditional_discount": conditional_discount
};

const payment = {
  "banking_billet": bankingBillet
};

const body = {
  "items": items,
  "metadata": metadata,
  "shippings": shippings,
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

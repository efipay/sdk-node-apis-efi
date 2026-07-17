/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#criação-de-boleto-bolix-em-one-step-um-passo
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const items = [
  {
    "name": "Product 1",
    "amount": 1,
    "value": 9990
  },
  {
    "name": "Product 2",
    "amount": 1,
    "value": 1500
  }
];

const shippings = [
  {
    "name": "Shipping to City",
    "value": 1200
  }
];

const metadata = {
  "custom_id": "Order_00001",
  "notification_url": "https://your-domain.com.br/notification/"
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656"
};

const discount = {
  "type": "currency",
  "value": 599
};

const conditional_discount = {
  "type": "percentage",
  "value": 500,
  "until_date": "2024-12-20"
};

const configurations = {
  "fine": 200,
  "interest": 33
};

const bankingBillet = {
  "expire_at": "2024-12-20",
  "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
  "customer": customer,
  "discount": discount,
  "conditional_discount": conditional_discount,
  "configurations": configurations
};

const payment = {
  "banking_billet": bankingBillet
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

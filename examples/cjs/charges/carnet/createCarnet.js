/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#criando-carnês
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

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656"
};

const configurations = {
  "fine": 200,
  "interest": 33
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

const message = "This is a space\n of up to 80 characters\n to tell\n your client something";

const metadata = {
  "custom_id": "Carnet 0001",
  "notification_url": "https://your-domain.com.br/notification/"
};

const body = {
  "items": items,
  "customer": customer,
  "expire_at": "2024-12-10",
  "repeats": 5,
  "split_items": false,
  "configurations": configurations,
  "discount": discount,
  "conditional_discount": conditional_discount,
  "message": message,
  "metadata": metadata
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createCarnet(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

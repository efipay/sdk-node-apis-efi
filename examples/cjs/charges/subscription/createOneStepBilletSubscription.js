/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#crie-inscrições-assinaturas-para-vincular-ao-plano-em-one-step
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

const metadata = {
  "notification_url": "https://your-domain.com.br/notification/"
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656"
};

const body = {
  "items": items,
  "metadata": metadata,
  "payment": {
    "banking_billet": {
      "expire_at": "2024-12-10",
      "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
      "customer": customer
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createOneStepSubscription(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

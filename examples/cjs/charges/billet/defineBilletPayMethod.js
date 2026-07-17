/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#2-associar-à-forma-de-pagamento-via-boleto
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const customer = {
  "name": "Gorbadoc Oldbuck",
  "cpf": "94271564656"
};

const body = {
  "payment": {
    "banking_billet": {
      "expire_at": "2024-12-10",
      "customer": customer
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.definePayMethod(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

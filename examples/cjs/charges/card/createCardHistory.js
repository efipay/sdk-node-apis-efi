/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#acrescentar-descrição-ao-histórico-de-uma-transação
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "description": "This billet is about a service"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createChargeHistory(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

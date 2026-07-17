/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#acrescentar-descrição-ao-histórico-de-uma-assinatura
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "description": "This subscription is about a service"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createSubscriptionHistory(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

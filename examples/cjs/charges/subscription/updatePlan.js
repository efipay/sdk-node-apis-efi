/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#permitir-a-edi%C3%A7%C3%A3o-do-nome-do-plano-de-assinatura
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "name": "My new plan"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.updatePlan(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

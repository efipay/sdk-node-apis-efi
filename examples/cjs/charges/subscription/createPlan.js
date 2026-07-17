/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#crie-o-plano-de-assinatura
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const body = {
  "name": "My plan",
  "interval": 1,
  "repeats": null
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.createPlan(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

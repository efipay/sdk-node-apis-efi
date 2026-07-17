/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#cancelar-o-webhook-de-cobrança-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");



const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixDeleteWebhookAutomaticCharge();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

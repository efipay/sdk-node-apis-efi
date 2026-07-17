/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#configurar-o-webhook-de-recorrência-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const headers = {
  "x-skip-mtls-checking": "false"
};

const body = {
  "webhookUrl": "https://seudominio.com.br/webhook/"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixConfigWebhookRecurrenceAutomatic(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

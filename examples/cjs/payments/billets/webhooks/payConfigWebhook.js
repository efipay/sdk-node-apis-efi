/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/webhooks#criar-webhook-de-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const headers = {
  "x-skip-mtls-checking": "false"
};

const body = {
  "url": "https://seudominio.com.br/webhook/"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.payConfigWebhook(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

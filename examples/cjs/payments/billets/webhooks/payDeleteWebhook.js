/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/webhooks#deletar-webhook-de-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const body = {
  "url": "https://seudominio.com.br/webhook/"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.payDeleteWebhook(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/configuracoes-de-aplicacao#configurar-urls-da-aplicação
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const body = {
  "redirectURL": "https://your-domain.com.br/redirect/",
  "webhookURL": "https://your-domain.com.br/webhook/",
  "webhookSecurity": {
    "type": "mtls"
  },
  "processPayment": "async"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofConfigUpdate(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#configurar-o-webhook-pix
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const body = {
  "tipo": "PIX_RECEBIDO",
  "e2eids": [
    "E0000000000000000000000000000000",
    "E0000000000000000000000000000001",
    "E0000000000000000000000000000002"
  ]
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixResendWebhook(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

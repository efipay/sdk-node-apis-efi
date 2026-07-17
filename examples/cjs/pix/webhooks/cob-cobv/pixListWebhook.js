/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#consultar-lista-de-webhooks
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "inicio": "2023-01-01T00:00:00Z",
  "fim": "2024-12-31T23:59:59Z"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixListWebhook(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

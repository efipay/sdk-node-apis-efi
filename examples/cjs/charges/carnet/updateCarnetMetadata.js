/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#incluir-notification_url-e-custom_id-de-carnê
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "custom_id": "Carnet_0001",
  "notification_url": "https://your-domain.com.br/notification/"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.updateCarnetMetadata(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

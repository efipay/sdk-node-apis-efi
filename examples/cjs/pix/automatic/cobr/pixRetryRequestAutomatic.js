/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#solicitar-retentativa-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "txid": "0000000000000000000000000001",
  "data": "2025-12-10"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixRetryRequestAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#listar-configurações-da-conta
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");



const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.listAccountConfig();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

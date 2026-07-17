/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#criar-location-do-payload
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const body = {
  "tipoCob": "cob"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixCreateLocation(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

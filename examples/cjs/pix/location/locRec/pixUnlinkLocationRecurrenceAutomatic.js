/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#desvincular-uma-recorrência-de-pix-automático-de-um-location
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "id": 1
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixUnlinkLocationRecurrenceAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

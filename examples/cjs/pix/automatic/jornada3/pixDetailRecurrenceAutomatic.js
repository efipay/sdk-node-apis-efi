/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#consultar-recorrência-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "idRec": "R000000000000000000000000001"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixDetailRecurrenceAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

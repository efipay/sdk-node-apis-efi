/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#revisar-solicitação-de-confirmação-de-recorrência-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "idSolicRec": "SC00000000000000000000001"
};

const body = {
  "status": "CANCELADA"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixUpdateRequestRecurrenceAutomatic(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

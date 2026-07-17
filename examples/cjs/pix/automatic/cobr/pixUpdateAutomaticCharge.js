/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#revisar-cobrança-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000001"
};

const body = {
  "status": "CANCELADA"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixUpdateAutomaticCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

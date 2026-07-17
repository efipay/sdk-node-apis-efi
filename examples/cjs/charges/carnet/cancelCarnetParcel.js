/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#cancelar-parcela-específica-de-carnê
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0,
  "parcel": 1
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.cancelCarnetParcel(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

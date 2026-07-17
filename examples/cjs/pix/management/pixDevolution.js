/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/gestao-de-pix#solicitar-devolução
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "e2eId": "E0000000000000000000000000000000",
  "id": "D0000000000000000000000000000000"
};

const body = {
  "valor": "0.01"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixDevolution(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

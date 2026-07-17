/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix/#solicitar-devolução-de-uma-cobrança-pix-com-split-de-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "e2eid": "E0000000000000000000000000000000",
  "id": "D0000000000000000000000000000000"
};

const body = {
  "valor": "0.01"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixSplitDevolution(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

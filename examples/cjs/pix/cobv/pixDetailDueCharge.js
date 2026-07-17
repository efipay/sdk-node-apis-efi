/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#consultar-cobrança-com-vencimento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000000000000000"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixDetailDueCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

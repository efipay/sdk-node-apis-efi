/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas#revisar-cobrança
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000000000000000"
};

const body = {
  "valor": {
    "original": "123.45"
  },
  "solicitacaoPagador": "Enter the order number or identifier."
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixUpdateCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

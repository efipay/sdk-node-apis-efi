/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#consultar-configuração-do-split-por-id
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "id": "splitConfigId0000000000000000000",
  "revisao": 0
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixSplitDetailConfig(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

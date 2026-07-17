/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#vincular-uma-cobrança-a-um-split-de-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000000000000000",
  "splitConfigId": "splitConfigId0000000000000000000"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixSplitLinkCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

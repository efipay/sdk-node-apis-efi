/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#alterar-data-de-vencimento-de-parcela-do-carnê
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0,
  "parcel": 1
};

const body = {
  "expire_at": "2024-12-10"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.updateCarnetParcel(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

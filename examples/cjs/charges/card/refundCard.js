/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#estorno-de-pagamento-via-cartão-de-crédito
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "amount": 1000
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.refundCard(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

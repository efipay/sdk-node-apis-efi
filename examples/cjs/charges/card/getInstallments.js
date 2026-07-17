/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#listar-parcelas-de-acordo-com-a-bandeira-do-cartão
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "total": 20000,
  "brand": "visa"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.getInstallments(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/pagamentos#detalhar-código-de-barras-para-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "codBarras": "36400000000000000000000000000000000000000000000"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.payDetailBarCode(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

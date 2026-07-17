/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/pagamentos#solicitar-pagamento-de-código-de-barras
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "codBarras": "36400000000000000000000000000000000000000000000"
};

const body = {
  "valor": 500,
  "dataPagamento": "2024-12-10",
  "descricao": "Payment of the test billet"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.payRequestBarCode(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

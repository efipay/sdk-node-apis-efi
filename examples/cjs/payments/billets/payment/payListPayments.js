/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/pagamentos#consultar-resumo-de-solicitações-de-pagamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "dataInicio": "2023-01-01",
  "dataFim": "2024-12-31"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.payListPayments(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

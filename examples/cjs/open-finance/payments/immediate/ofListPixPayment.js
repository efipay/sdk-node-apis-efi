/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-imediatos#listar-pagamentos-por-um-determinado-período
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "inicio": "2023-01-22",
  "fim": "2024-12-31"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofListPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

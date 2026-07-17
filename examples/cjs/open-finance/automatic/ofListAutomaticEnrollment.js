/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#consultar-os-parâmetros-de-uma-adesão
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "inicio": "2025-06-01",
  "fim": "2025-06-30",
  "status": "autorizado"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofListAutomaticEnrollment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

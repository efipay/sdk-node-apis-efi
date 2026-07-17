/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria/#consultar-pagamentos-feitos-via-jornada-sem-redirecionamento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "inicio": "2025-06-01",
  "fim": "2025-06-30"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofListBiometricPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

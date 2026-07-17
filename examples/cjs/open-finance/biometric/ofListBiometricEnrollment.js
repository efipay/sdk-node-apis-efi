/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria/#consultar-vínculos-de-um-usuário
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "cpf": "11789337682"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofListBiometricEnrollment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria#criar-vínculo
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const headers = {
  "x-idempotency-key": "00000000000000000000000000000000"
};

const body = {
  "pagador": {
    "idParticipante": "00000000-0000-0000-0000-000000000000",
    "cpf": "11122233344"
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofCreateBiometricEnrollment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

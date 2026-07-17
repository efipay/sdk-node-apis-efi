/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#editar-uma-adesão
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const headers = {
  "x-idempotency-key": "00000000000000000000000000000000"
};

const body = {
  "identificador": "urn:example:00000000-0000-0000-0000-000000000000",
  "status": "revogado"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofUpdateAutomaticEnrollment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

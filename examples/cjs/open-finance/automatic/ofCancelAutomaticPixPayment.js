/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#solicitar-o-cancelamento-de-um-pagamento-automatico
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const headers = {
  "x-idempotency-key": "00000000000000000000000000000000"
};

const params = {
  "identificadorAdesao": "urn:example:00000000-0000-0000-0000-000000000000",
  "endToEndId": "E0000000000000000000000000000000"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofCancelAutomaticPixPayment(params, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

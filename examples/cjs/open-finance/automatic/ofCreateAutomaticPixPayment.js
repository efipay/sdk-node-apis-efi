/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#solicitar-criação-de-um-pagamento-automatico
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const headers = {
  "x-idempotency-key": "00000000000000000000000000000000"
};

const body = {
  "identificadorAdesao": "urn:example:00000000-0000-0000-0000-000000000000",
  "pagamento": {
    "valor": "0.01",
    "data": "2026-06-08",
    "infoPagador": "Monthly fee - 2 x 20"
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofCreateAutomaticPixPayment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

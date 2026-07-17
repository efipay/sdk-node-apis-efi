/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-recorrentes#cancelar-um-pagamento-recorrente
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "identificadorPagamento": "urn:participant:00000000-0000-0000-0000-000000000000"
};

const body = {
  "endToEndId": [
    "E0000000000000000000000000000000",
    "E0000000000000000000000000000001",
    "E0000000000000000000000000000002"
  ]
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofCancelRecurrencyPix(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

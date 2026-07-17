/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-recorrentes#efetuar-uma-devolução-de-um-pagamento-recorrente
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "identificadorPagamento": "urn:participant:00000000-0000-0000-0000-000000000000",
  "endToEndId": "E0000000000000000000000000000000"
};

const body = {
  "valor": "9.99"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofReplaceRecurrencyPixParcel(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

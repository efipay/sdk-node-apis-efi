/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-agendados#cancelar-um-pagamento-agendado
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "identificadorPagamento": "urn:participant:00000000-0000-0000-0000-000000000000"
};

const body = [
  {
    "endToEndId": "E00000000000000000000000000000000",
    "valor": "0.01"
  }
];

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofDevolutionSchedulePix(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

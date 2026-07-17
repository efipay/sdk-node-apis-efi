/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-agendados#cancelar-um-pagamento-agendado
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "identificadorPagamento": "urn:efi:e102339e-9294-4176-bb6d-36378d2b731d"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofCancelSchedulePix(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

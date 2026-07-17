/**
 * Detailed endpoint documentation
 * Billets: https://dev.efipay.com.br/docs/api-cobrancas/boleto#retornar-lista-de-cobranças
 * Cards: https://dev.efipay.com.br/docs/api-cobrancas/cartao#retornar-lista-de-cobranças
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "charge_type": "card",
  "begin_date": "2024-01-01",
  "end_date": "2024-12-31",
  "status": "link"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.listCharges(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/configuracoes-de-aplicacao#retornar-as-configura%C3%A7%C3%B5es-da-aplicação
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");



const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofConfigDetail();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

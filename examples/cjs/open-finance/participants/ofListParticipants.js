/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/participantes#recuperar-as-instituições-participantes-do-open-finance
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "nome": "Efi"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofListParticipants();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

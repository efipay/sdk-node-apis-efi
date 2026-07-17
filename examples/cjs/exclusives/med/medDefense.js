/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#listar-infra%C3%A7%C3%B5es-med-da-conta
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "idInfracao": "00000000-0000-0000-0000-000000000000"
};

const body = {
  "analise": "rejeitado",
  "justificativa": "Justificativa"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.medDefense(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

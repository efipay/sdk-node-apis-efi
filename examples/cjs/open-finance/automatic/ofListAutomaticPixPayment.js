/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#consultar-pagamentos-automaticos
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "identificadorAdesao": "urn:participant:00000000-0000-0000-0000-000000000000"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofListAutomaticPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

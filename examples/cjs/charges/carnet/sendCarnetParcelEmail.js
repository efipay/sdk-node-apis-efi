/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#reenvio-de-uma-parcela-específica-de-carnê-por-e-mail
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0,
  "parcel": 1
};

const body = {
  "email": "client_email@server.com.br"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.sendCarnetParcelEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/link-de-pagamento#reenviar-link-de-pagamento-por-e-mail
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "email": "client_email@server.com.br"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.sendLinkEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

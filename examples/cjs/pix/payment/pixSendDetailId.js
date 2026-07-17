/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#consultar-pix-enviado-através-do-identificador-da-transação
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "idEnvio": "00000000000000000000000000000000"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixSendDetailId(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#requisitar-envio-de-pix
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "idEnvio": "00000000000000000000000000000000000"
};

const body = {
  "valor": "0.01",
  "pagador": {
    "chave": "00000000-0000-0000-0000-000000000000",
    "infoPagador": "Order payment"
  },
  "favorecido": {
    "cpf": "00000000000",
    "chave": "00000000-0000-0000-0000-000000000001"
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixSend(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

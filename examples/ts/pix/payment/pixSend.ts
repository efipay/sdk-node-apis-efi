/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#requisitar-envio-de-pix
 */

import EfiPay, { type PixSendBody, type PixSendParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "idEnvio": "00000000000000000000000000000000000"
} satisfies PixSendParams;

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
} satisfies PixSendBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSend(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

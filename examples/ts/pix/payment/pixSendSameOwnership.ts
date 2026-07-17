/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#requisitar-envio-de-pix-para-contas-de-mesma-titularidade
 */

import EfiPay, { type PixSendSameOwnershipBody, type PixSendSameOwnershipParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "idEnvio": "00000000000000000000000000000000000"
} satisfies PixSendSameOwnershipParams;

const body = {
    "valor": "0.01",
    "pagador": {
        "chave": "00000000-0000-0000-0000-000000000000",
        "infoPagador": "Order payment"
    },
    "favorecido": {
        "chave": "00000000-0000-0000-0000-000000000001"
    }
} satisfies PixSendSameOwnershipBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSendSameOwnership(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#consultar-pix-enviado-através-do-identificador-da-transação
 */

import EfiPay, { type PixSendDetailIdParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "idEnvio": "00000000000000000000000000000000"
} satisfies PixSendDetailIdParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSendDetailId(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#consultar-pix-enviado-através-do-endtoendid
 */

import EfiPay, { type PixSendDetailParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "e2eId": "E0000000000000000000000000000000"
} satisfies PixSendDetailParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSendDetail(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

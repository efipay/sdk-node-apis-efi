/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#gerar-qrcode-de-um-location
 */

import EfiPay, { type PixGenerateQRCodeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": 1
} satisfies PixGenerateQRCodeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixGenerateQRCode(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

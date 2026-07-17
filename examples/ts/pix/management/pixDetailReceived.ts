/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/gestao-de-pix#consultar-pix
 */

import EfiPay, { type PixDetailReceivedParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "e2eId": "E0000000000000000000000000000000"
} satisfies PixDetailReceivedParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailReceived(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

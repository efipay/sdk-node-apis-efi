/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#remover-chave-evp
 */

import EfiPay, { type PixDeleteEvpParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "chave": "00000000-0000-0000-0000-000000000000"
} satisfies PixDeleteEvpParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDeleteEvp(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

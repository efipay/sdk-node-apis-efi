/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#listar-chaves-evp
 */

import EfiPay, { type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";



const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixListEvp();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

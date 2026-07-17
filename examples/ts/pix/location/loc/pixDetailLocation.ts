/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#recuperar-location-do-payload
 */

import EfiPay, { type PixDetailLocationParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": 0
} satisfies PixDetailLocationParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailLocation(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

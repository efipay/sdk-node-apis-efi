/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#criar-location-do-payload
 */

import EfiPay, { type PixCreateLocationBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "tipoCob": "cob"
} satisfies PixCreateLocationBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateLocation(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

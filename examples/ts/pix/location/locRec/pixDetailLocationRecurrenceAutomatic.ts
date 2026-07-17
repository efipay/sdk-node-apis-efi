/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#recuperar-location-do-payload-de-recorrêancia-de-pix-automático
 */

import EfiPay, { type PixDetailLocationRecurrenceAutomaticParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": 0
} satisfies PixDetailLocationRecurrenceAutomaticParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailLocationRecurrenceAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#criar-location-do-payload-de-recorrência-de-pix-automático
 */

import EfiPay, { type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";



const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateLocationRecurrenceAutomatic();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

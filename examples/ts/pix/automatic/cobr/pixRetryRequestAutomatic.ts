/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#solicitar-retentativa-de-pix-automático
 */

import EfiPay, { type PixRetryRequestAutomaticParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "txid": "0000000000000000000000000001",
    "data": "2025-12-10"
} satisfies PixRetryRequestAutomaticParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixRetryRequestAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#consultar-locations-cadastradas
 */

import EfiPay, { type PixLocationListParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "inicio": "2025-01-22T00:00:00Z",
    "fim": "2025-12-31T23:59:59Z"
} satisfies PixLocationListParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixLocationList(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

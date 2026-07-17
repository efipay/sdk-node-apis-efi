/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/payload-locations#desvincular-um-txid-de-um-location
 */

import EfiPay, { type PixUnlinkTxidLocationParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": 0
} satisfies PixUnlinkTxidLocationParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixUnlinkTxidLocation(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

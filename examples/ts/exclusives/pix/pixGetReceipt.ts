/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#obter-comprovantes
 */

import EfiPay, { type PixGetReceiptParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "e2eid": "E0000000000000000000000000000"
} satisfies PixGetReceiptParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixGetReceipt(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

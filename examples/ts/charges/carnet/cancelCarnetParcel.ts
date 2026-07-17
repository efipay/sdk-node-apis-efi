/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#cancelar-parcela-específica-de-carnê
 */

import EfiPay, { type CancelCarnetParcelParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0,
    "parcel": 1
} satisfies CancelCarnetParcelParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.cancelCarnetParcel(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

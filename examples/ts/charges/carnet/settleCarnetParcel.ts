/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#marcar-como-pago-determinada-parcela-de-carnê
 */

import EfiPay, { type SdkOptions, type SettleCarnetParcelParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0,
    "parcel": 1
} satisfies SettleCarnetParcelParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.settleCarnetParcel(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

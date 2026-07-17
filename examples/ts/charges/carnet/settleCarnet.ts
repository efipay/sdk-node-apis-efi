/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#marcar-como-pago-baixa-manual-um-determinado-carnê
 */

import EfiPay, { type SdkOptions, type SettleCarnetParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies SettleCarnetParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.settleCarnet(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

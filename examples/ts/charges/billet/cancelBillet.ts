/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#cancelar-uma-transação-existente
 */

import EfiPay, { type CancelChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CancelChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.cancelCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

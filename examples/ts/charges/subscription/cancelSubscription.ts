/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#cancelar-uma-assinatura
 */

import EfiPay, { type CancelSubscriptionParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CancelSubscriptionParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.cancelSubscription(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

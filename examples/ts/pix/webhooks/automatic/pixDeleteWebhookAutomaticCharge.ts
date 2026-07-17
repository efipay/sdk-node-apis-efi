/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#cancelar-o-webhook-de-cobrança-de-pix-automático
 */

import EfiPay, { type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";



const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDeleteWebhookAutomaticCharge();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

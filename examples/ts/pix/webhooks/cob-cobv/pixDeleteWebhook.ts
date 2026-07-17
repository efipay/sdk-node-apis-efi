/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#cancelar-o-webhook-pix
 */

import EfiPay, { type PixDeleteWebhookParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "chave": "00000000-0000-0000-0000-000000000000"
} satisfies PixDeleteWebhookParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDeleteWebhook(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

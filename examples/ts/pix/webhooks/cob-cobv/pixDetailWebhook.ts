/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#exibir-informações-do-webhook-pix
 */

import EfiPay, { type PixDetailWebhookParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "chave": "00000000-0000-0000-0000-000000000000"
} satisfies PixDetailWebhookParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailWebhook(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

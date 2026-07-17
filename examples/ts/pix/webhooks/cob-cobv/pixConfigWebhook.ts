/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#configurar-o-webhook-pix
 */

import EfiPay, { type PixConfigWebhookBody, type PixConfigWebhookParams, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "chave": "00000000-0000-0000-0000-000000000000"
} satisfies PixConfigWebhookParams;

const body = {
    "webhookUrl": "https://seudominio.com.br/webhook/"
} satisfies PixConfigWebhookBody;

const headers = {
    "x-skip-mtls-checking": "false"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixConfigWebhook(params, body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#configurar-o-webhook-de-cobrança-de-pix-automático
 */

import EfiPay, { type PixConfigWebhookAutomaticChargeBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "webhookUrl": "https://seudominio.com.br/webhook/"
} satisfies PixConfigWebhookAutomaticChargeBody;

const headers = {
    "x-skip-mtls-checking": "false"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixConfigWebhookAutomaticCharge(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

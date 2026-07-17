/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/webhooks#configurar-o-webhook-pix
 */

import EfiPay, { type PixResendWebhookBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "tipo": "PIX_RECEBIDO",
    "e2eids": [
        "E0000000000000000000000000000000",
        "E0000000000000000000000000000001",
        "E0000000000000000000000000000002"
    ]
} satisfies PixResendWebhookBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixResendWebhook(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

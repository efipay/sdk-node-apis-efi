/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/webhooks#criar-webhook-de-pagamento
 */

import EfiPay, { type PayWebhookBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "url": "https://seudominio.com.br/webhook/"
} satisfies PayWebhookBody;

const headers = {
    "x-skip-mtls-checking": "false"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.payConfigWebhook(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

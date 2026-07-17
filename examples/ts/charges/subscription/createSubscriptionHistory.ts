/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#acrescentar-descrição-ao-histórico-de-uma-assinatura
 */

import EfiPay, { type CreateSubscriptionHistoryBody, type CreateSubscriptionHistoryParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CreateSubscriptionHistoryParams;

const body = {
    "description": "This subscription is about a service"
} satisfies CreateSubscriptionHistoryBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createSubscriptionHistory(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

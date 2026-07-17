/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#incluir-notification_url-e-custom_id-em-uma-assinatura-existente
 */

import EfiPay, { type SdkOptions, type UpdateSubscriptionMetadataBody, type UpdateSubscriptionMetadataParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies UpdateSubscriptionMetadataParams;

const body = {
    "custom_id": "Order_0001",
    "notification_url": "https://your-domain.com.br/notification/"
} satisfies UpdateSubscriptionMetadataBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateSubscriptionMetadata(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

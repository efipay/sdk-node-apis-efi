/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#incluir-notification_url-e-custom_id-em-uma-transação-existente
 */

import EfiPay, { type SdkOptions, type UpdateChargeMetadataBody, type UpdateChargeMetadataParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies UpdateChargeMetadataParams;

const body = {
    "custom_id": "Order_0001",
    "notification_url": "https://your-domain.com.br/notification"
} satisfies UpdateChargeMetadataBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateChargeMetadata(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

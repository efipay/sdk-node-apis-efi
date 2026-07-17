/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#associar-plano-ao-link-de-pagamento
 */

import EfiPay, { type CreateOneStepSubscriptionLinkBody, type CreateOneStepSubscriptionLinkParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CreateOneStepSubscriptionLinkParams;

const body = {
    "items": [
        {
            "name": "Product 1",
            "amount": 1,
            "value": 1000
        },
        {
            "name": "Product 2",
            "amount": 2,
            "value": 2000
        }
    ],
    "settings": {
        "payment_method": "all",
        "expire_at": "2024-12-15",
        "request_delivery_address": false
    }
} satisfies CreateOneStepSubscriptionLinkBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createOneStepSubscriptionLink(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#1-crie-inscrições-assinaturas-para-vincular-ao-plano
 */

import EfiPay, { type CreateSubscriptionBody, type CreateSubscriptionParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CreateSubscriptionParams;

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
    "shippings": [
        {
            "name": "Shipping to City",
            "value": 2000
        }
    ],
    "metadata": {
        "custom_id": "Order_00001",
        "notification_url": "https://your-domain.com.br/notification/"
    }
} satisfies CreateSubscriptionBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createSubscription(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

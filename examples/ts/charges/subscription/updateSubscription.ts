/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura/#alterar-dados-de-uma-assinatura
 */

import EfiPay, { type SdkOptions, type UpdateSubscriptionBody, type UpdateSubscriptionParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies UpdateSubscriptionParams;

const body = {
    "payment_token": "insert_here_the_payment_token_referring_to_card_data",
    "plan_id": 3,
    "customer": {
        "email": "gorbadoc.oldbuck@gmail.com",
        "phone_number": "31123456789"
    },
    "items": [
        {
            "name": "Product 1",
            "value": 1000,
            "amount": 1
        }
    ],
    "shippings": [
        {
            "name": "frete",
            "value": 1800
        }
    ]
} satisfies UpdateSubscriptionBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateSubscription(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

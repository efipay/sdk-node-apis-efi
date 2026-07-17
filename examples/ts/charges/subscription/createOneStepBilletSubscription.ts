/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#crie-inscrições-assinaturas-para-vincular-ao-plano-em-one-step
 */

import EfiPay, { type CreateOneStepSubscriptionBody, type CreateOneStepSubscriptionParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CreateOneStepSubscriptionParams;

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
    "metadata": {
        "notification_url": "https://your-domain.com.br/notification/"
    },
    "payment": {
        "banking_billet": {
            "expire_at": "2024-12-10",
            "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656"
            }
        }
    }
} satisfies CreateOneStepSubscriptionBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createOneStepSubscription(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

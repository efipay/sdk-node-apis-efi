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
    "payment": {
        "credit_card": {
            "billing_address": {
                "street": "Av. JK",
                "number": 909,
                "neighborhood": "Bauxita",
                "zipcode": "35400000",
                "city": "Ouro Preto",
                "state": "MG"
            },
            "payment_token": "insert_here_the_payment_token_referring_to_card_data",
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "04267484171",
                "phone_number": "5144916523",
                "email": "oldbuck@server.com.br",
                "birth": "1990-01-15"
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

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#retentativa-de-pagamento-via-cartão-de-crédito
 */

import EfiPay, { type CardPaymentRetryBody, type CardPaymentRetryParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CardPaymentRetryParams;

const body = {
    "payment": {
        "credit_card": {
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656",
                "phone_number": "5144916523",
                "email": "oldbuck@server.com.br",
                "birth": "1990-01-15"
            },
            "installments": 1,
            "billing_address": {
                "street": "Av JK",
                "number": "909",
                "neighborhood": "Bauxita",
                "zipcode": "35400000",
                "city": "Ouro Preto",
                "state": "MG"
            },
            "payment_token": "insert_here_the_payment_token_referring_to_card_data"
        }
    }
} satisfies CardPaymentRetryBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.cardPaymentRetry(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

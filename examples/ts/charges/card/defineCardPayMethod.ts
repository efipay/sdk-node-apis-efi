/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#2-associar-à-forma-de-pagamento-via-cartão
 */

import EfiPay, { type DefinePayMethodBody, type DefinePayMethodParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DefinePayMethodParams;

const body = {
    "payment": {
        "credit_card": {
            "installments": 1,
            "billing_address": {
                "street": "Av JK",
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
} satisfies DefinePayMethodBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.definePayMethod(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao
 */

import EfiPay, { type CreateChargeCardBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

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
    "installments": 1,
    "shippings": [
        {
            "name": "Shipping to City",
            "value": 1200
        }
    ],
    "customer": {
        "name": "Gorbadoc Oldbuck",
        "cpf": "94271564656",
        "phone_number": "5144916523",
        "email": "oldbuck@server.com.br"
    },
    "discount": {
        "type": "currency",
        "value": 599
    },
    "billing_address": {
        "street": "Av JK",
        "number": "909",
        "neighborhood": "Bauxita",
        "zipcode": "35400000",
        "city": "Ouro Preto",
        "state": "MG"
    },
    "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
    "payment_token": "0000000000000000000000000000000000000000",
    "tds_info": {
        "tds_identifier": "00000000-0000-0000-0000-000000000000",
        "challenge_callback_url": "https://your-domain.com.br/payment-processing/"
    }
} satisfies CreateChargeCardBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createChargeCard(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

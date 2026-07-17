/**
 * Detailed endpoint documentation
 *https://dev.efipay.com.br/docs/api-cobrancas/split-de-pagamento#criação-de-transação-split-de-pagamento-em-one-step-um-passo
 */

import EfiPay, { type CreateOneStepChargeBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "items": [
        {
            "name": "Product 1",
            "amount": 1,
            "value": 1500,
            "marketplace": {
                "repasses": [
                    {
                        "payee_code": "Enter_Destination_Account_Identifier_Here",
                        "percentage": 2500
                    },
                    {
                        "payee_code": "Enter_Destination_Account_Identifier_Here",
                        "percentage": 1500
                    }
                ]
            }
        }
    ],
    "shippings": [
        {
            "name": "Shipping to City",
            "value": 1200,
            "payee_code": "Enter_Destination_Account_Identifier_Here"
        }
    ],
    "metadata": {
        "notification_url": "https://your-domain.com.br/notification"
    },
    "payment": {
        "credit_card": {
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "04267484171",
                "phone_number": "5144916523",
                "email": "oldbuck@server.com.br",
                "birth": "1990-01-15"
            },
            "installments": 1,
            "discount": {
                "type": "currency",
                "value": 599
            },
            "billing_address": {
                "street": "Av JK",
                "number": 909,
                "neighborhood": "Bauxita",
                "zipcode": "35400000",
                "city": "Ouro Preto",
                "state": "MG"
            },
            "payment_token": "insert_here_the_payment_token_referring_to_card_data",
            "message": "This is a space\n of up to 80 characters\n to tell\n your client something"
        }
    }
} satisfies CreateOneStepChargeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createOneStepCharge(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

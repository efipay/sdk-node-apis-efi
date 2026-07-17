/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/split-de-pagamento#criação-de-transação-split-de-pagamento-em-one-step-um-passo
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
                "mode": 2,
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
    "metadata": {
        "custom_id": "Order_0001",
        "notification_url": "https://your-domain.com.br/notification/"
    },
    "shippings": [
        {
            "name": "Shipping to City",
            "value": 1200,
            "payee_code": "Enter_Destination_Account_Identifier_Here"
        }
    ],
    "payment": {
        "banking_billet": {
            "expire_at": "2024-12-10",
            "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656",
                "phone_number": "5144916523"
            },
            "discount": {
                "type": "currency",
                "value": 599
            },
            "conditional_discount": {
                "type": "percentage",
                "value": 500,
                "until_date": "2024-12-10"
            }
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

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#criação-de-boleto-bolix-em-one-step-um-passo
 */

import EfiPay, { type CreateOneStepChargeBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "items": [
        {
            "name": "Product 1",
            "amount": 1,
            "value": 9990
        },
        {
            "name": "Product 2",
            "amount": 1,
            "value": 1500
        }
    ],
    "shippings": [
        {
            "name": "Shipping to City",
            "value": 1200
        }
    ],
    "metadata": {
        "custom_id": "Order_00001",
        "notification_url": "https://your-domain.com.br/notification/"
    },
    "payment": {
        "banking_billet": {
            "expire_at": "2024-12-20",
            "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656"
            },
            "discount": {
                "type": "currency",
                "value": 599
            },
            "conditional_discount": {
                "type": "percentage",
                "value": 500,
                "until_date": "2024-12-20"
            },
            "configurations": {
                "fine": 200,
                "interest": 33
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

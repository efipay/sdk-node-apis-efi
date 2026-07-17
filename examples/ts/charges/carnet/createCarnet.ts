/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#criando-carnês
 */

import EfiPay, { type CreateCarnetBody, type SdkOptions } from "sdk-node-apis-efi";
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
    "customer": {
        "name": "Gorbadoc Oldbuck",
        "cpf": "94271564656"
    },
    "expire_at": "2024-12-10",
    "repeats": 5,
    "split_items": false,
    "configurations": {
        "fine": 200,
        "interest": 33
    },
    "discount": {
        "type": "currency",
        "value": 599
    },
    "conditional_discount": {
        "type": "percentage",
        "value": 500,
        "until_date": "2024-12-10"
    },
    "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
    "metadata": {
        "custom_id": "Carnet 0001",
        "notification_url": "https://your-domain.com.br/notification/"
    }
} satisfies CreateCarnetBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createCarnet(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

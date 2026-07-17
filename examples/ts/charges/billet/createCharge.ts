/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#1-criar-transação
 */

import EfiPay, { type CreateChargeBody, type SdkOptions } from "sdk-node-apis-efi";
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
    "shippings": [
        {
            "name": "Shipping to City",
            "value": 2000
        }
    ],
    "metadata": {
        "custom_id": "Order_00001",
        "notification_url": "https://your-domain.com.br/notification/"
    }
} satisfies CreateChargeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createCharge(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

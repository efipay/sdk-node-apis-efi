/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/link-de-pagamento#alterar-determinados-parâmetrosatributos-de-um-link-de-pagamento-existente
 */

import EfiPay, { type SdkOptions, type UpdateChargeLinkBody, type UpdateChargeLinkParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies UpdateChargeLinkParams;

const body = {
    "billet_discount": 500,
    "conditional_discount": {
        "type": "percentage",
        "value": 600,
        "until_date": "2024-12-10"
    },
    "card_discount": 200,
    "message": "This is a space\n of up to 80 characters\n to tell\n your client something",
    "expire_at": "2024-12-15",
    "request_delivery_address": false,
    "payment_method": "all"
} satisfies UpdateChargeLinkBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateChargeLink(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

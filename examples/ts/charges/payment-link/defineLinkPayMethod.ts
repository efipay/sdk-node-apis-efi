/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/link-de-pagamento#2-crie-um-link-de-pagamento
 */

import EfiPay, { type DefineLinkPayMethodBody, type DefineLinkPayMethodParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DefineLinkPayMethodParams;

const body = {
    "payment_method": "all",
    "expire_at": "2024-12-15",
    "request_delivery_address": false,
    "billet_discount": 500,
    "conditional_discount": {
        "type": "percentage",
        "value": 500,
        "until_date": "2024-12-10"
    },
    "card_discount": 500,
    "message": "This is a space\n of up to 80 characters\n to tell\n your client something"
} satisfies DefineLinkPayMethodBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.defineLinkPayMethod(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

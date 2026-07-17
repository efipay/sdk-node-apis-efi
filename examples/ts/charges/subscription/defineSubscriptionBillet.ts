/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#2-defina-a-forma-de-pagamento-da-assinatura-e-os-dados-do-cliente
 */

import EfiPay, { type DefineSubscriptionPayMethodBody, type DefineSubscriptionPayMethodParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DefineSubscriptionPayMethodParams;

const body = {
    "payment": {
        "banking_billet": {
            "expire_at": "2024-12-15",
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656"
            }
        }
    }
} satisfies DefineSubscriptionPayMethodBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.defineSubscriptionPayMethod(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

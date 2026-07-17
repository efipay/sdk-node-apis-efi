/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#solicitar-criação-de-um-pagamento-automatico
 */

import EfiPay, { type OfCreateAutomaticPixPaymentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "identificadorAdesao": "urn:example:00000000-0000-0000-0000-000000000000",
    "pagamento": {
        "valor": "0.01",
        "data": "2026-06-08",
        "infoPagador": "Monthly fee - 2 x 20"
    }
} satisfies OfCreateAutomaticPixPaymentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000000"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCreateAutomaticPixPayment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

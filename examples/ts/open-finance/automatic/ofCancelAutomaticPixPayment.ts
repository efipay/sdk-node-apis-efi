/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#solicitar-o-cancelamento-de-um-pagamento-automatico
 */

import EfiPay, { type OfCancelAutomaticPixPaymentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "identificadorAdesao": "urn:example:00000000-0000-0000-0000-000000000000",
    "endToEndId": "E0000000000000000000000000000000"
} satisfies OfCancelAutomaticPixPaymentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000000"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCancelAutomaticPixPayment(params, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#consultar-pagamentos-automaticos
 */

import EfiPay, { type OfListAutomaticPixPaymentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "identificadorAdesao": "urn:participant:00000000-0000-0000-0000-000000000000"
} satisfies OfListAutomaticPixPaymentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListAutomaticPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

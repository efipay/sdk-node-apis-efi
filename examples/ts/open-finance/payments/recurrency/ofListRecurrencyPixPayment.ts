/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-recorrentes#listar-pagamentos-recorrentes-por-um-determinado-período
 */

import EfiPay, { type OfListRecurrencyPixPaymentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "inicio": "2023-01-22",
    "fim": "2024-12-31"
} satisfies OfListRecurrencyPixPaymentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListRecurrencyPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

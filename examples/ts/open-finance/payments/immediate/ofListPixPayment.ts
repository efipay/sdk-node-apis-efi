/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-imediatos#listar-pagamentos-por-um-determinado-período
 */

import EfiPay, { type OfListPixPaymentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "inicio": "2023-01-22",
    "fim": "2024-12-31"
} satisfies OfListPixPaymentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

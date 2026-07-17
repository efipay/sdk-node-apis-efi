/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-agendados#listar-pagamentos-agendados-por-um-determinado-período
 */

import EfiPay, { type OfListSchedulePixPaymentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "inicio": "2023-01-22",
    "fim": "2024-12-31"
} satisfies OfListSchedulePixPaymentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListSchedulePixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-recorrentes#cancelar-um-pagamento-recorrente
 */

import EfiPay, { type OfCancelRecurrencyPixParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "identificadorPagamento": "urn:participant:00000000-0000-0000-0000-000000000000"
} satisfies OfCancelRecurrencyPixParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCancelRecurrencyPix(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-agendados#cancelar-um-pagamento-agendado
 */

import EfiPay, { type OfCancelSchedulePixParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "identificadorPagamento": "urn:efi:e102339e-9294-4176-bb6d-36378d2b731d"
} satisfies OfCancelSchedulePixParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCancelSchedulePix(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

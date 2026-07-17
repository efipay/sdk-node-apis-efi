/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#revisar-solicitação-de-confirmação-de-recorrência-de-pix-automático
 */

import EfiPay, { type PixUpdateRequestRecurrenceAutomaticBody, type PixUpdateRequestRecurrenceAutomaticParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "idSolicRec": "SC00000000000000000000001"
} satisfies PixUpdateRequestRecurrenceAutomaticParams;

const body = {
    "status": "CANCELADA"
} satisfies PixUpdateRequestRecurrenceAutomaticBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixUpdateRequestRecurrenceAutomatic(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

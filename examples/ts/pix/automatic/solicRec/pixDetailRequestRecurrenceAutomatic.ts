/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#consultar-solicitação-de-confirmação-de-recorrência-de-pix-automático
 */

import EfiPay, { type PixDetailRequestRecurrenceAutomaticParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "idSolicRec": "SC0000000000000000000001"
} satisfies PixDetailRequestRecurrenceAutomaticParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailRequestRecurrenceAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

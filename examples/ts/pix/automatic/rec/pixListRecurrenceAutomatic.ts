/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#consultar-lista-de-recorrências-de-pix-automático
 */

import EfiPay, { type PixListRecurrenceAutomaticParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "inicio": "2025-01-01T00:00:00Z",
    "fim": "2025-12-31T23:59:59Z"
} satisfies PixListRecurrenceAutomaticParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixListRecurrenceAutomatic(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

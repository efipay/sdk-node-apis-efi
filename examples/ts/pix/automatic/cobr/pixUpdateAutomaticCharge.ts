/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#revisar-cobrança-de-pix-automático
 */

import EfiPay, { type PixUpdateAutomaticChargeBody, type PixUpdateAutomaticChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000001"
} satisfies PixUpdateAutomaticChargeParams;

const body = {
    "status": "CANCELADA"
} satisfies PixUpdateAutomaticChargeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixUpdateAutomaticCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

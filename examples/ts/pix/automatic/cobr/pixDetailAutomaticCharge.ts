/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#consultar-cobrança-de-pix-automático
 */

import EfiPay, { type PixDetailAutomaticChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "txid": "0000000000000000000000000001"
} satisfies PixDetailAutomaticChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailAutomaticCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

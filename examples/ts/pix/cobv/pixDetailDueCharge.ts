/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#consultar-cobrança-com-vencimento
 */

import EfiPay, { type PixDetailDueChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000000000000000"
} satisfies PixDetailDueChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailDueCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

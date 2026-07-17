/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#vincular-uma-cobrança-a-um-split-de-pagamento
 */

import EfiPay, { type PixSplitLinkChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000000000000000",
    "splitConfigId": "splitConfigId0000000000000000000"
} satisfies PixSplitLinkChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSplitLinkCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

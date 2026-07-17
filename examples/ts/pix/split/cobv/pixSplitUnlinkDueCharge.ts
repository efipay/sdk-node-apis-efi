/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#deletar-o-v%C3%ADnculo-entre-um-split-de-pagamento-e-uma-cobrança-com-vencimento
 */

import EfiPay, { type PixSplitUnlinkDueChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000000000000000"
} satisfies PixSplitUnlinkDueChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSplitUnlinkDueCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

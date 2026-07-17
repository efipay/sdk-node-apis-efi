/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#consultar-configuração-do-split-por-id
 */

import EfiPay, { type PixSplitDetailConfigParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": "splitConfigId0000000000000000000",
    "revisao": 0
} satisfies PixSplitDetailConfigParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSplitDetailConfig(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

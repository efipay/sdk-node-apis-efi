/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix/#solicitar-devolução-de-uma-cobrança-pix-com-split-de-pagamento
 */

import EfiPay, { type PixSplitDevolutionBody, type PixSplitDevolutionParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "e2eid": "E0000000000000000000000000000000",
    "id": "D0000000000000000000000000000000"
} satisfies PixSplitDevolutionParams;

const body = {
    "valor": "0.01"
} satisfies PixSplitDevolutionBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSplitDevolution(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

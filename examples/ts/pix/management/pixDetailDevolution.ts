/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/gestao-de-pix#consultar-devolução
 */

import EfiPay, { type PixDetailDevolutionParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "e2eId": "E0000000000000000000000000000000",
    "id": "D0000000000000000000000000000000"
} satisfies PixDetailDevolutionParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDetailDevolution(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

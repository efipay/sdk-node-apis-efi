/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/gestao-de-pix#solicitar-devolução
 */

import EfiPay, { type PixDevolutionBody, type PixDevolutionParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "e2eId": "E0000000000000000000000000000000",
    "id": "D0000000000000000000000000000000"
} satisfies PixDevolutionParams;

const body = {
    "valor": "0.01"
} satisfies PixDevolutionBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixDevolution(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

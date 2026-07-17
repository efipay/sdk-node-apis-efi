/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#retornar-informações-de-carnê-existente
 */

import EfiPay, { type DetailCarnetParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DetailCarnetParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.detailCarnet(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

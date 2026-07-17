/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas#consultar-lista-de-cobranças
 */

import EfiPay, { type PixListChargesParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "inicio": "2023-01-22T00:00:00Z",
    "fim": "2024-12-31T23:59:59Z"
} satisfies PixListChargesParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixListCharges(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

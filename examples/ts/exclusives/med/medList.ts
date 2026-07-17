/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#listar-infra%C3%A7%C3%B5es-med-da-conta
 */

import EfiPay, { type MedListParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "inicio": "2024-06-01T00:00:00Z",
    "fim": "2024-12-31T23:59:59Z"
} satisfies MedListParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.medList(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

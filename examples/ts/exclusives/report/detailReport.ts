/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#solicitar-download-extrato-conciliação
 */

import EfiPay, { type DetailReportParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": "00000000-0000-0000-0000-000000000000"
} satisfies DetailReportParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.detailReport(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

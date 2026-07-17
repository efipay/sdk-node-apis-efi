/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#alterar-data-de-vencimento-de-parcela-do-carnê
 */

import EfiPay, { type SdkOptions, type UpdateCarnetParcelBody, type UpdateCarnetParcelParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0,
    "parcel": 1
} satisfies UpdateCarnetParcelParams;

const body = {
    "expire_at": "2024-12-10"
} satisfies UpdateCarnetParcelBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateCarnetParcel(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

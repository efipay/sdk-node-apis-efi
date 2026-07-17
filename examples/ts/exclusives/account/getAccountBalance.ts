/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#buscar-o-saldo-da-conta
 */

import EfiPay, { type GetAccountBalanceParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "bloqueios": true
} satisfies GetAccountBalanceParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.getAccountBalance(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

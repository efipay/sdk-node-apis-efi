/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#alterar-data-de-vencimento-de-uma-transação-existente
 */

import EfiPay, { type SdkOptions, type UpdateBilletBody, type UpdateBilletParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies UpdateBilletParams;

const body = {
    "expire_at": "2024-12-10"
} satisfies UpdateBilletBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateBillet(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

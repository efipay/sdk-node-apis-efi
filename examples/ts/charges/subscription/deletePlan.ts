/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#cancelar-um-plano-de-assinatura
 */

import EfiPay, { type DeletePlanParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DeletePlanParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.deletePlan(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#crie-o-plano-de-assinatura
 */

import EfiPay, { type CreatePlanBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "name": "My plan",
    "interval": 1,
    "repeats": null
} satisfies CreatePlanBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createPlan(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

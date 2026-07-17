/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#retornar-informações-de-transação-existente
 */

import EfiPay, { type DetailChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DetailChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.detailCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

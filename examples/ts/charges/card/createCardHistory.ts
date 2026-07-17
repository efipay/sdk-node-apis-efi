/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#acrescentar-descrição-ao-histórico-de-uma-transação
 */

import EfiPay, { type CreateChargeHistoryBody, type CreateChargeHistoryParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CreateChargeHistoryParams;

const body = {
    "description": "This billet is about a service"
} satisfies CreateChargeHistoryBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createChargeHistory(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#acrescentar-descrição-ao-hist%C3%B3rico-de-uma-transação
 */

import EfiPay, { type CreateCarnetHistoryBody, type CreateCarnetHistoryParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies CreateCarnetHistoryParams;

const body = {
    "description": "This carnet is about a service"
} satisfies CreateCarnetHistoryBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createCarnetHistory(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

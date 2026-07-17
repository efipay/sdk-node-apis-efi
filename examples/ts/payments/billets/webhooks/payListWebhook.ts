/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/webhooks#listar-webhooks-de-pagamento	
 */

import EfiPay, { type PayListWebhookParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "dataInicio": "2023-01-01T00:00:00Z",
    "dataFim": "2024-12-31T23:59:59Z"
} satisfies PayListWebhookParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.payListWebhook(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

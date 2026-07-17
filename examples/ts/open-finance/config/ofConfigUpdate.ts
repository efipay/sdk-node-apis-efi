/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/configuracoes-de-aplicacao#configurar-urls-da-aplicação
 */

import EfiPay, { type OpenFinanceConfigBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "redirectURL": "https://your-domain.com.br/redirect/",
    "webhookURL": "https://your-domain.com.br/webhook/",
    "webhookSecurity": {
        "type": "mtls"
    },
    "processPayment": "async"
} satisfies OpenFinanceConfigBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofConfigUpdate(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

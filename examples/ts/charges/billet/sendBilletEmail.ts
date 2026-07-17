/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#reenvio-do-boleto-bancário-para-o-email-desejado
 */

import EfiPay, { type SdkOptions, type SendBilletEmailBody, type SendBilletEmailParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies SendBilletEmailParams;

const body = {
    "email": "client_email@server.com.br"
} satisfies SendBilletEmailBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.sendBilletEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

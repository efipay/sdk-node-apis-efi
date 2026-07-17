/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#reenvio-do-carnê-para-o-email-desejado
 */

import EfiPay, { type SdkOptions, type SendCarnetEmailBody, type SendCarnetEmailParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies SendCarnetEmailParams;

const body = {
    "email": "client_email@server.com.br"
} satisfies SendCarnetEmailBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.sendCarnetEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

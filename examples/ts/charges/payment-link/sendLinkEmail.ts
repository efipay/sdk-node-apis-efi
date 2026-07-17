/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/link-de-pagamento#reenviar-link-de-pagamento-por-e-mail
 */

import EfiPay, { type SdkOptions, type SendLinkEmailBody, type SendLinkEmailParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies SendLinkEmailParams;

const body = {
    "email": "client_email@server.com.br"
} satisfies SendLinkEmailBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.sendLinkEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

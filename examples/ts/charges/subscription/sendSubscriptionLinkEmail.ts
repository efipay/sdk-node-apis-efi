/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/assinatura#reenvio-do-link-associado-ao-plano-para-o-email-desejado
 */

import EfiPay, { type SdkOptions, type SendSubscriptionLinkEmailBody, type SendSubscriptionLinkEmailParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies SendSubscriptionLinkEmailParams;

const body = {
    "email": "client_email@server.com.br"
} satisfies SendSubscriptionLinkEmailBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.sendSubscriptionLinkEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#reenvio-de-uma-parcela-específica-de-carnê-por-e-mail
 */

import EfiPay, { type SdkOptions, type SendCarnetParcelEmailBody, type SendCarnetParcelEmailParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0,
    "parcel": 1
} satisfies SendCarnetParcelEmailParams;

const body = {
    "email": "client_email@server.com.br"
} satisfies SendCarnetParcelEmailBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.sendCarnetParcelEmail(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

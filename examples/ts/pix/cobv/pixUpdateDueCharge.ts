/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#revisar-cobrança-com-vencimento
 */

import EfiPay, { type PixUpdateDueChargeBody, type PixUpdateDueChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000000000000000"
} satisfies PixUpdateDueChargeParams;

const body = {
    "valor": {
        "original": "126.45"
    },
    "solicitacaoPagador": "Enter the order number or identifier."
} satisfies PixUpdateDueChargeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixUpdateDueCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

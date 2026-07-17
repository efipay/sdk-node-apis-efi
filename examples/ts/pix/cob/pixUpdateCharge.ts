/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas#revisar-cobrança
 */

import EfiPay, { type PixUpdateChargeBody, type PixUpdateChargeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000000000000000"
} satisfies PixUpdateChargeParams;

const body = {
    "valor": {
        "original": "123.45"
    },
    "solicitacaoPagador": "Enter the order number or identifier."
} satisfies PixUpdateChargeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixUpdateCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

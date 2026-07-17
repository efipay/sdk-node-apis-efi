/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#estorno-de-pagamento-via-cartão-de-crédito
 */

import EfiPay, { type RefundCardBody, type RefundCardParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies RefundCardParams;

const body = {
    "amount": 1000
} satisfies RefundCardBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.refundCard(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

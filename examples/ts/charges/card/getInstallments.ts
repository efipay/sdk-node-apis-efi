/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/cartao#listar-parcelas-de-acordo-com-a-bandeira-do-cartão
 */

import EfiPay, { type GetInstallmentsParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "total": 20000,
    "brand": "visa"
} satisfies GetInstallmentsParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.getInstallments(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

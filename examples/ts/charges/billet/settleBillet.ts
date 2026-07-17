/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#marcar-como-pago-baixa-manual-uma-determinada-transação
 */

import EfiPay, { type SdkOptions, type SettleChargeParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies SettleChargeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.settleCharge(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

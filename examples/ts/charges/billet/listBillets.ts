/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto#retornar-lista-de-cobranças
 */

import EfiPay, { type ListChargesParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "charge_type": "billet",
    "begin_date": "2024-01-01",
    "end_date": "2024-12-31"
} satisfies ListChargesParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.listCharges(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

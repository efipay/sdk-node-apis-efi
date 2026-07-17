/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria/#consultar-pagamentos-feitos-via-jornada-sem-redirecionamento
 */

import EfiPay, { type OfListBiometricPixPaymentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "inicio": "2025-06-01",
    "fim": "2025-06-30"
} satisfies OfListBiometricPixPaymentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListBiometricPixPayment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#consultar-os-parâmetros-de-uma-adesão
 */

import EfiPay, { type OfListAutomaticEnrollmentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "inicio": "2025-06-01",
    "fim": "2025-06-30",
    "status": "autorizado"
} satisfies OfListAutomaticEnrollmentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListAutomaticEnrollment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

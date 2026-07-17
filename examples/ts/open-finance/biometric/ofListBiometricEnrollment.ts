/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria/#consultar-vínculos-de-um-usuário
 */

import EfiPay, { type OfListBiometricEnrollmentParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "cpf": "11789337682"
} satisfies OfListBiometricEnrollmentParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofListBiometricEnrollment(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

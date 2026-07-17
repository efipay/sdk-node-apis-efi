/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria#revogar-vínculo
 */

import EfiPay, { type OfRevokeBiometricEnrollmentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "identificadorVinculo": "urn:example:00000000-0000-0000-0000-000000000000",
    "motivo": "Encerramento de contrato"
} satisfies OfRevokeBiometricEnrollmentBody;

const headers = {
    "x-idempotency-key": "000000000000000000000000000000000000"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofRevokeBiometricEnrollment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

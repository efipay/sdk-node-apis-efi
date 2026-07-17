/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria#criar-vínculo
 */

import EfiPay, { type OfCreateBiometricEnrollmentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "pagador": {
        "idParticipante": "00000000-0000-0000-0000-000000000000",
        "cpf": "11122233344"
    }
} satisfies OfCreateBiometricEnrollmentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000000"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCreateBiometricEnrollment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#listar-infra%C3%A7%C3%B5es-med-da-conta
 */

import EfiPay, { type MedSubmitDefenseBody, type MedSubmitDefenseParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "idInfracao": "00000000-0000-0000-0000-000000000000"
} satisfies MedSubmitDefenseParams;

const body = {
    "analise": "rejeitado",
    "justificativa": "Justificativa"
} satisfies MedSubmitDefenseBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.medDefense(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

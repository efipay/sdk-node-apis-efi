/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#criar-solicitação-de-confirmação-de-recorrência-de-pix-automático
 */

import EfiPay, { type PixCreateRequestRecurrenceAutomaticBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "idRec": "R00000000000000000000001",
    "calendario": {
        "dataExpiracaoSolicitacao": "2026-12-31T12:17:11.926Z"
    },
    "destinatario": {
        "agencia": "0001",
        "conta": "00000",
        "cpf": "11122233344",
        "ispbParticipante": "09089356"
    }
} satisfies PixCreateRequestRecurrenceAutomaticBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateRequestRecurrenceAutomatic(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

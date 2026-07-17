/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#revisar-recorrência-de-pix-automático
 */

import EfiPay, { type PixUpdateRecurrenceAutomaticBody, type PixUpdateRecurrenceAutomaticParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "idRec": "R000000000000000000000000001"
} satisfies PixUpdateRecurrenceAutomaticParams;

const body = {
    "loc": 1,
    "vinculo": {
        "devedor": {
            "nome": "Gorbadoc Oldbuck"
        }
    },
    "calendario": {
        "dataInicial": "2026-04-01"
    },
    "ativacao": {
        "dadosJornada": {
            "txid": "0000000000000000000000000001"
        }
    }
} satisfies PixUpdateRecurrenceAutomaticBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixUpdateRecurrenceAutomatic(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

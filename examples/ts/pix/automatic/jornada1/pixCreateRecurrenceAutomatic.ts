/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#criar-recorrência-de-pix-automático
 */

import EfiPay, { type PixCreateRecurrenceAutomaticBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "vinculo": {
        "contrato": "63100862",
        "devedor": {
            "cpf": "11122233344",
            "nome": "Gorbadoc Oldbuck"
        },
        "objeto": "Streamming"
    },
    "calendario": {
        "dataInicial": "2026-01-01",
        "dataFinal": "2027-12-31",
        "periodicidade": "MENSAL"
    },
    "valor": {
        "valorRec": "35.00"
    },
    "politicaRetentativa": "NAO_PERMITE",
    "loc": 1,
    "ativacao": {
        "dadosJornada": {
            "txid": "33beb661beda44a8928fef47dbeb2dc5"
        }
    }
} satisfies PixCreateRecurrenceAutomaticBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateRecurrenceAutomatic(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

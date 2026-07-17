/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-agendados#solicitar-iniciação-de-pix-agendado-via-open-finance
 */

import EfiPay, { type OfStartSchedulePixPaymentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const body = {
    "pagador": {
        "idParticipante": "ebbed125-5cd7-42e3-965d-2e7af8e3b7ae",
        "cpf": "11789337682"
    },
    "favorecido": {
        "contaBanco": {
            "codigoBanco": "364",
            "agencia": "0001",
            "conta": "2712075",
            "tipoConta": "CACC",
            "documento": "11789337682",
            "nome": "Guilherme Soares Cota"
        }
    },
    "pagamento": {
        "valor": "0.01",
        "dataAgendamento": "2024-08-28",
        "infoPagador": "Order 00001",
        "idProprio": "Client00001Order00001"
    }
} satisfies OfStartSchedulePixPaymentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000008"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofStartSchedulePixPayment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

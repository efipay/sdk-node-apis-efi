/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-recorrentes#solicitar-iniciação-de-pix-recorrente-via-open-finance
 */

import EfiPay, { type OfStartRecurrencyPixPaymentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
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
            "documento": "11789337682",
            "nome": "Guilherme Soares Cota",
            "conta": "2712075",
            "tipoConta": "CACC"
        }
    },
    "pagamento": {
        "valor": "0.01",
        "infoPagador": "Order 00001",
        "idProprio": "Client00001Order00001",
        "recorrencia": {
            "tipo": "mensal",
            "dataInicio": "2025-01-01",
            "quantidade": 12,
            "diaDoMes": 10
        }
    }
} satisfies OfStartRecurrencyPixPaymentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000006"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofStartRecurrencyPixPayment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

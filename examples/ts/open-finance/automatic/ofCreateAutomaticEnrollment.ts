/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#solicitar-criação-de-uma-adesão-para-um-pagamento-automático
 */

import EfiPay, { type OfCreateAutomaticEnrollmentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "pagador": {
        "nome": "Gorbadoc Oldbuck",
        "cpf": "11122233344",
        "idParticipante": "00000000-0000-0000-0000-000000000000"
    },
    "favorecido": {
        "contaBanco": {
            "nome": "Gorbadoc Oldbuck",
            "documento": "11122233344",
            "codigoBanco": "09089356",
            "agencia": "0001",
            "conta": "000000",
            "tipoConta": "TRAN"
        }
    },
    "assinatura": {
        "expiracao": "2026-08-27",
        "descricao": "Product consumption XYZ",
        "idProprio": "000000000000001",
        "configuracao": {
            "automatico": {
                "valorMinimo": "50.00",
                "valorMaximo": "250.00",
                "intervalo": "SEMANAL",
                "dataInicio": "2025-07-10",
                "permiteRetentativa": true,
                "primeiroPagamento": {
                    "data": "2025-06-10",
                    "valor": "25.00",
                    "infoPagador": "Enrollment"
                }
            }
        }
    }
} satisfies OfCreateAutomaticEnrollmentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000000"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCreateAutomaticEnrollment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

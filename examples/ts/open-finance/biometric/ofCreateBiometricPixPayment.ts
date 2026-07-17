/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-por-biometria/#criar-pagamento-via-jornada-sem-redirecionamento
 */

import EfiPay, { type OfCreateBiometricPixPaymentBody, type RequestHeaders, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "identificadorVinculo": "urn:example:00000000-0000-0000-0000-000000000000",
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
    "pagamento": {
        "valor": "0.01",
        "infoPagador": "Order 00001",
        "idProprio": "Client00001Order00001"
    }
} satisfies OfCreateBiometricPixPaymentBody;

const headers = {
    "x-idempotency-key": "00000000000000000000000000000000"
} satisfies RequestHeaders;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofCreateBiometricPixPayment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

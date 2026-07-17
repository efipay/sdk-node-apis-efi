/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#configuração-de-um-split-de-pagamento-com-id
 */

import EfiPay, { type PixSplitConfigIdBody, type PixSplitConfigIdParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": "splitConfigId0000000000000000001"
} satisfies PixSplitConfigIdParams;

const body = {
    "descricao": "Payment split - Plan 1",
    "lancamento": {
        "imediato": true
    },
    "split": {
        "divisaoTarifa": "assumir_total",
        "minhaParte": {
            "tipo": "porcentagem",
            "valor": "78.00"
        },
        "repasses": [
            {
                "tipo": "porcentagem",
                "valor": "12.00",
                "favorecido": {
                    "cpf": "11111111111",
                    "conta": "1234567"
                }
            },
            {
                "tipo": "porcentagem",
                "valor": "8.00",
                "favorecido": {
                    "cpf": "22222222222",
                    "conta": "7654321"
                }
            }
        ]
    }
} satisfies PixSplitConfigIdBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixSplitConfigId(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

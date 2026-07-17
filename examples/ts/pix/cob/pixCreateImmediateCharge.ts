/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas#criar-cobrança-imediata-sem-txid
 */

import EfiPay, { type PixCreateImmediateChargeBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "calendario": {
        "expiracao": 3600
    },
    "devedor": {
        "cpf": "12345678909",
        "nome": "Francisco da Silva"
    },
    "valor": {
        "original": "0.01"
    },
    "chave": "00000000-0000-0000-0000-000000000000",
    "solicitacaoPagador": "Enter the order number or identifier.",
    "infoAdicionais": [
        {
            "nome": "Field 1",
            "valor": "Additional information1"
        },
        {
            "nome": "Field 2",
            "valor": "Additional information2"
        }
    ]
} satisfies PixCreateImmediateChargeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateImmediateCharge(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

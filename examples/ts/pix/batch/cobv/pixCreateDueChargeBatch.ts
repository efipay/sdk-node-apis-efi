/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#criaralterar-lote-de-cobranças-com-vencimento
 */

import EfiPay, { type PixCreateDueChargeBatchBody, type PixCreateDueChargeBatchParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "id": 1
} satisfies PixCreateDueChargeBatchParams;

const body = {
    "descricao": "Cobranças dos alunos do turno vespertino",
    "cobsv": [
        {
            "calendario": {
                "dataDeVencimento": "2023-12-16",
                "validadeAposVencimento": 5
            },
            "txid": "00000000000000000000000000000000000",
            "devedor": {
                "cpf": "08577095428",
                "nome": "João Souza"
            },
            "valor": {
                "original": "0.01"
            },
            "chave": "00000000-0000-0000-0000-000000000000",
            "solicitacaoPagador": "Informar matrícula"
        },
        {
            "calendario": {
                "dataDeVencimento": "2023-12-17",
                "validadeAposVencimento": 6
            },
            "txid": "00000000000000000000000000000000001",
            "devedor": {
                "cpf": "15311295449",
                "nome": "Manoel Silva"
            },
            "valor": {
                "original": "0.02"
            },
            "chave": "00000000-0000-0000-0000-000000000000",
            "solicitacaoPagador": "Informar matrícula"
        }
    ]
} satisfies PixCreateDueChargeBatchBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateDueChargeBatch(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

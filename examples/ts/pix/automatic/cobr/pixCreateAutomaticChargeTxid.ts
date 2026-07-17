/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#criar-cobrança-de-pix-automático-com-txid
 */

import EfiPay, { type PixCreateAutomaticChargeTxidBody, type PixCreateAutomaticChargeTxidParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "txid": "00000000000000000000000001"
} satisfies PixCreateAutomaticChargeTxidParams;

const body = {
    "idRec": "RR000000000000000000000000001",
    "infoAdicional": "Streamming",
    "calendario": {
        "dataDeVencimento": "2026-12-31"
    },
    "valor": {
        "original": "0.01"
    },
    "ajusteDiaUtil": true,
    "devedor": {
        "cep": "12345678",
        "cidade": "City",
        "email": "client.mail@server.com",
        "logradouro": "Street name 123",
        "uf": "MG"
    },
    "recebedor": {
        "agencia": "0001",
        "conta": "00000",
        "tipoConta": "CORRENTE"
    }
} satisfies PixCreateAutomaticChargeTxidBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixCreateAutomaticChargeTxid(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

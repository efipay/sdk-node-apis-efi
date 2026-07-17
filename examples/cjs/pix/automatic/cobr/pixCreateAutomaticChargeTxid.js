/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#criar-cobrança-de-pix-automático-com-txid
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000001"
};

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
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixCreateAutomaticChargeTxid(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas#criar-cobrança-imediata-com-txid
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000000000000000"
};

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
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixCreateCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#criar-cobrança-com-vencimento
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "txid": "00000000000000000000000000000000000"
};

const body = {
  "calendario": {
    "dataDeVencimento": "2024-12-31",
    "validadeAposVencimento": 90
  },
  "devedor": {
    "nome": "Francisco da Silva",
    "cpf": "12345678909"
  },
  "valor": {
    "original": "123.45",
    "multa": {
      "modalidade": 2,
      "valorPerc": "2.00"
    },
    "juros": {
      "modalidade": 2,
      "valorPerc": "0.30"
    },
    "desconto": {
      "modalidade": 1,
      "descontoDataFixa": [
        {
          "data": "2024-10-15",
          "valorPerc": "30.00"
        },
        {
          "data": "2024-11-15",
          "valorPerc": "15.00"
        },
        {
          "data": "2024-12-15",
          "valorPerc": "5.00"
        }
      ]
    }
  },
  "chave": "00000000-0000-0000-0000-000000000000",
  "solicitacaoPagador": "Enter the order number or identifier.",
  "infoAdicionais": [
    {
      "nome": "Campo 1",
      "valor": "Informação Adicional1"
    },
    {
      "nome": "Campo 2",
      "valor": "Informação Adicional2"
    }
  ]
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixCreateDueCharge(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

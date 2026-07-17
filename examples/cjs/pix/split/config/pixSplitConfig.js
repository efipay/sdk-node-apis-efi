/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix#configuração-de-um-split-de-pagamento-sem-passar-id
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const body = {
  "descricao": "Payment split - Plan 1",
  "lancamento": {
    "imediato": true
  },
  "split": {
    "divisaoTarifa": "assumir_total",
    "minhaParte": {
      "tipo": "porcentagem",
      "valor": "80.00"
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
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixSplitConfig(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

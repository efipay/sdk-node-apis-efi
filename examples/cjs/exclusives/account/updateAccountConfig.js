/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#criarmodificar-configurações-da-conta
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const body = {
  "pix": {
    "receberSemChave": false,
    "chaves": {
      "00000000-0000-0000-0000-000000000000": {
        "recebimento": {
          "txidObrigatorio": true,
          "recusarTipoPessoa": "PJ",
          "documentoPagadorIgualDevedor": true,
          "qrCodeEstatico": {
            "recusarTodos": true
          },
          "webhook": {
            "notificacao": {
              "tarifa": true,
              "pagador": true
            }
          }
        },
        "envio": {
          "webhook": {
            "notificacao": {
              "tarifa": true,
              "favorecido": true
            }
          }
        }
      },
      "11111111-1111-1111-1111-111111111111": {
        "recebimento": {
          "txidObrigatorio": false,
          "qrCodeEstatico": {
            "recusarTodos": false
          }
        }
      }
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.updateAccountConfig(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

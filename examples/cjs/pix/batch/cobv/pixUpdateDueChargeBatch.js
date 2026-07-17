/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento#revisar-cobranças-específicas-de-um-lote
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "id": 1
};

const body = {
  "cobsv": [
    {
      "calendario": {
        "dataDeVencimento": "2023-12-18"
      },
      "txid": "00000000000000000000000000000000000",
      "valor": {
        "original": "0.02"
      }
    },
    {
      "calendario": {
        "dataDeVencimento": "2023-12-19"
      },
      "txid": "00000000000000000000000000000000001",
      "valor": {
        "original": "0.03"
      }
    }
  ]
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixUpdateDueChargeBatch(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

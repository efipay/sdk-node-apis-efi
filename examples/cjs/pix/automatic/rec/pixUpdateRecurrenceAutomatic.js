/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/pix-automatico#revisar-recorrência-de-pix-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const params = {
  "idRec": "R000000000000000000000000001"
};

const body = {
  "loc": 1,
  "vinculo": {
    "devedor": {
      "nome": "Gorbadoc Oldbuck"
    }
  },
  "calendario": {
    "dataInicial": "2026-04-01"
  },
  "ativacao": {
    "dadosJornada": {
      "txid": "0000000000000000000000000001"
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixUpdateRecurrenceAutomatic(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

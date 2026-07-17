/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-extratos/extratos#revisar-recorrência
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "identificador": "diario"
};

const body = {
  "periodicidade": "diario",
  "envia_email": true,
  "comprimir_arquivos": false,
  "status": "ativo"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.updateStatementRecurrency(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

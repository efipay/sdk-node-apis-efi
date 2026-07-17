/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-extratos/extratos#solicitar-download-do-extrato
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "nome_arquivo": "EFI_00000000_00000000_000000_CNAB_240.txt"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.getStatementFile(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

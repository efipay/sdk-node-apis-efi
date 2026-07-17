/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-extratos/extratos#revisar-recorrência
 */

import EfiPay, { type SdkOptions, type UpdateStatementRecurrencyBody, type UpdateStatementRecurrencyParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "identificador": "diario"
} satisfies UpdateStatementRecurrencyParams;

const body = {
    "periodicidade": "diario",
    "envia_email": true,
    "comprimir_arquivos": false,
    "status": "ativo"
} satisfies UpdateStatementRecurrencyBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateStatementRecurrency(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

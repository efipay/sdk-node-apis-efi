/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-extratos/extratos#criar-recorrência
 */

import EfiPay, { type CreateStatementRecurrencyBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "periodicidade": "diario",
    "envia_email": true,
    "comprimir_arquivos": false
} satisfies CreateStatementRecurrencyBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createStatementRecurrency(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

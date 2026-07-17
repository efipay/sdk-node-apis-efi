/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/configuracoes-de-aplicacao#retornar-as-configura%C3%A7%C3%B5es-da-aplicação
 */

import EfiPay, { type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";



const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofConfigDetail();
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

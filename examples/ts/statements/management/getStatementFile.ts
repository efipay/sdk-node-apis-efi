/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-extratos/extratos#solicitar-download-do-extrato
 */

import EfiPay, { type GetStatementFileParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "nome_arquivo": "EFI_00000000_00000000_000000_CNAB_240.txt"
} satisfies GetStatementFileParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.getStatementFile(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

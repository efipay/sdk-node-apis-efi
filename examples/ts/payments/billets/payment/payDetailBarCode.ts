/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/pagamentos#detalhar-código-de-barras-para-pagamento
 */

import EfiPay, { type PayDetailBarCodeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "codBarras": "36400000000000000000000000000000000000000000000"
} satisfies PayDetailBarCodeParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.payDetailBarCode(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pagamento-de-contas/pagamentos#solicitar-pagamento-de-código-de-barras
 */

import EfiPay, { type PayRequestBarCodeBody, type PayRequestBarCodeParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "codBarras": "36400000000000000000000000000000000000000000000"
} satisfies PayRequestBarCodeParams;

const body = {
    "valor": 500,
    "dataPagamento": "2024-12-10",
    "descricao": "Payment of the test billet"
} satisfies PayRequestBarCodeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.payRequestBarCode(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-recorrentes#efetuar-uma-devolução-de-um-pagamento-recorrente
 */

import EfiPay, { type OfReplaceRecurrencyPixParcelBody, type OfReplaceRecurrencyPixParcelParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../../credentials/options.js";

const params = {
    "identificadorPagamento": "urn:participant:00000000-0000-0000-0000-000000000000",
    "endToEndId": "E0000000000000000000000000000000"
} satisfies OfReplaceRecurrencyPixParcelParams;

const body = {
    "valor": "9.99"
} satisfies OfReplaceRecurrencyPixParcelBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.ofReplaceRecurrencyPixParcel(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

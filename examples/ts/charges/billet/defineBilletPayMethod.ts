/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#2-associar-à-forma-de-pagamento-via-boleto
 */

import EfiPay, { type DefinePayMethodBody, type DefinePayMethodParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies DefinePayMethodParams;

const body = {
    "payment": {
        "banking_billet": {
            "expire_at": "2024-12-10",
            "customer": {
                "name": "Gorbadoc Oldbuck",
                "cpf": "94271564656"
            }
        }
    }
} satisfies DefinePayMethodBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.definePayMethod(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

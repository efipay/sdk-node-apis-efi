/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#alterar-vencimento-de-parcelas-de-um-carnê
 */

import EfiPay, { type SdkOptions, type UpdateCarnetParcelsBody, type UpdateCarnetParcelsParams } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "id": 0
} satisfies UpdateCarnetParcelsParams;

const body = {
    "parcels": [
        {
            "parcel": 2,
            "expire_at": "2025-02-28"
        },
        {
            "parcel": 3,
            "expire_at": "2025-03-31"
        },
        {
            "parcel": 4,
            "expire_at": "2025-04-30"
        }
    ]
} satisfies UpdateCarnetParcelsBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.updateCarnetParcels(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

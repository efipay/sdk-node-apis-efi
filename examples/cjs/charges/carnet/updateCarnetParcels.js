/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/carne#alterar-vencimento-de-parcelas-de-um-carnê
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

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
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.updateCarnetParcels(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import EfiPay, { type SdkOptions, type StaticPixData } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const chargeData = {
    "chave": "00000000-0000-0000-0000-000000000000",
    "merchantName": "EFISA",
    "merchantCity": "SAOPAULO",
    "transactionAmount": 0.01,
    "txid": "0000000000000000000000001",
    "infoAdicional": "Regarding_the_sale-0001 ",
    "oneTime": false
} satisfies StaticPixData;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixGenerateStaticQRCode(chargeData);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

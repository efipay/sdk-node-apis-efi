/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#pagar-qr-code-pix
 */

import EfiPay, { type PixQrCodeBody, type PixQrCodePayParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "idEnvio": "00000000000000000000000000000000000"
} satisfies PixQrCodePayParams;

const body = {
    "pagador": {
        "chave": "00000000-0000-0000-0000-000000000000",
        "infoPagador": "Information about the payment"
    },
    "pixCopiaECola": "00020101021226850014BR.GOV.BCB.PIX2563qrcodespix.sejaefi.com.br/v2/000000000000000000000000000000000000000053039865802BR5905EFISA6008SAOPAULO62070503***63040E48"
} satisfies PixQrCodeBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.pixQrCodePay(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

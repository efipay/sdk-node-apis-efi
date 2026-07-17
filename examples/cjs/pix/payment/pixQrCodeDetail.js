/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix#detalhar-qr-code-pix
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const body = {
  "pixCopiaECola": "00020101021226850014BR.GOV.BCB.PIX2563qrcodespix.sejaefi.com.br/v2/000000000000000000000000000000000000000053039865802BR5905EFISA6008SAOPAULO62070503***63040E48"
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.pixQrCodeDetail(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

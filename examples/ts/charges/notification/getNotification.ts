/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/notificacoes
 */

import EfiPay, { type GetNotificationParams, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const params = {
    "token": process.env.EFI_NOTIFICATION_TOKEN ?? "00000000-0000-0000-0000-000000000000"
} satisfies GetNotificationParams;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.getNotification(params);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

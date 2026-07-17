/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-pix/endpoints-exclusivos-efi#requisitar-extrato-conciliação
 */

import EfiPay, { type CreateReportBody, type SdkOptions } from "sdk-node-apis-efi";
import options from "../../credentials/options.js";

const body = {
    "dataMovimento": "2024-12-10",
    "tipoRegistros": {
        "pixRecebido": true,
        "pixEnviadoChave": true,
        "pixEnviadoDadosBancarios": true,
        "estornoPixEnviado": true,
        "pixDevolucaoEnviada": true,
        "pixDevolucaoRecebida": true,
        "tarifaPixEnviado": true,
        "tarifaPixRecebido": true,
        "estornoTarifaPixEnviado": true,
        "saldoDiaAnterior": true,
        "saldoDia": true,
        "transferenciaEnviada": true,
        "transferenciaRecebida": true,
        "estornoTransferenciaEnviada": true,
        "tarifaTransferenciaEnviada": true,
        "estornoTarifaTransferenciaEnviada": true,
        "estornoTarifaPixRecebido": true
    }
} satisfies CreateReportBody;

const efipay = new EfiPay(options as SdkOptions);

async function main() {
  const response = await efipay.createReport(body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

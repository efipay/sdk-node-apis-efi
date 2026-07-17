/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-imediatos#solicitar-iniciação-de-pix-via-open-finance
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../../credentials/options.js");

const headers = {
  "x-idempotency-key": "00000000000000000000000000000000"
};

const body = {
  "pagador": {
    "idParticipante": "00000000-0000-0000-0000-000000000000",
    "cpf": "12345678909"
  },
  "favorecido": {
    "contaBanco": {
      "nome": "Gorbadoc Oldbuck",
      "documento": "11122233344",
      "codigoBanco": "09089356",
      "agencia": "0001",
      "conta": "000000",
      "tipoConta": "CACC"
    }
  },
  "pagamento": {
    "valor": "0.01",
    "infoPagador": "Order 00001",
    "idProprio": "Client00001Order00001"
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofStartPixPayment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

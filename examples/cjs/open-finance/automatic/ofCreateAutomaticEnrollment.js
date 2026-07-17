/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-open-finance/pagamentos-automaticos#solicitar-criação-de-uma-adesão-para-um-pagamento-automático
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const headers = {
  "x-idempotency-key": "00000000000000000000000000000000"
};

const body = {
  "pagador": {
    "nome": "Gorbadoc Oldbuck",
    "cpf": "11122233344",
    "idParticipante": "00000000-0000-0000-0000-000000000000"
  },
  "favorecido": {
    "contaBanco": {
      "nome": "Gorbadoc Oldbuck",
      "documento": "11122233344",
      "codigoBanco": "09089356",
      "agencia": "0001",
      "conta": "000000",
      "tipoConta": "TRAN"
    }
  },
  "assinatura": {
    "expiracao": "2026-08-27",
    "descricao": "Product consumption XYZ",
    "idProprio": "000000000000001",
    "configuracao": {
      "automatico": {
        "valorMinimo": "50.00",
        "valorMaximo": "250.00",
        "intervalo": "SEMANAL",
        "dataInicio": "2025-07-10",
        "permiteRetentativa": true,
        "primeiroPagamento": {
          "data": "2025-06-10",
          "valor": "25.00",
          "infoPagador": "Enrollment"
        }
      }
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.ofCreateAutomaticEnrollment(body, headers);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

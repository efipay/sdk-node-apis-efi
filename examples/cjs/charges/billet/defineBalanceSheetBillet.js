/**
 * Detailed endpoint documentation
 * https://dev.efipay.com.br/docs/api-cobrancas/boleto/#definir-que-a-transação-será-do-tipo-boleto-balancete
 */

const EfiPay = require("sdk-node-apis-efi");
const options = require("../../credentials/options.js");

const params = {
  "id": 0
};

const body = {
  "title": "Balance sheet demonstrative",
  "body": {
    "0": {
      "header": "Consumption  de Consumo",
      "tables": {
        "0": {
          "rows": {
            "0": {
              "0": {
                "align": "left",
                "color": "#000000",
                "style": "bold",
                "text": "Expense example",
                "colspan": 2
              },
              "1": {
                "align": "left",
                "color": "#000000",
                "style": "bold",
                "text": "Total posted",
                "colspan": 2
              }
            },
            "1": {
              "0": {
                "align": "left",
                "color": "#000000",
                "style": "normal",
                "text": "Installation",
                "colspan": 2
              },
              "1": {
                "align": "left",
                "color": "#000000",
                "style": "normal",
                "text": "R$ 100,00",
                "colspan": 2
              }
            }
          }
        }
      }
    },
    "1": {
      "header": "Balance Sheet",
      "tables": {
        "0": {
          "rows": {
            "0": {
              "0": {
                "align": "left",
                "color": "#000000",
                "style": "normal",
                "text": "Check in the Efí documentation all the possible configurations of a balance sheet.",
                "colspan": 4
              }
            }
          }
        }
      }
    }
  }
};

const efipay = new EfiPay(options);

async function main() {
  const response = await efipay.defineBalanceSheetBillet(params, body);
  console.log(JSON.stringify(response, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

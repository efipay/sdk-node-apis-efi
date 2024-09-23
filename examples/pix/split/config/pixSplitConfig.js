const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    descricao: "Batatinha frita 1, 2, 3",
    lancamento: {
        imediato: true
    },
    split: {
        divisaoTarifa: "assumir_total",
        minhaParte: {
            tipo: "porcentagem",
            valor: "60.00"
        },
        repasses: [
            {
                tipo: "porcentagem",
                valor: "15.00",
                favorecido: {
                    cpf: "12345678909",
                    conta: "1234567"
                }
            },
            {
                tipo: "porcentagem",
                valor: "25.00",
                favorecido: {
                    cpf: "94271564656",
                    conta: "7654321"
                }
            }
        ]
    }
};
const efipay = new EfiPay(options)

// O método pixSplitConfig indica os campos que devem ser enviados e que serão retornados
efipay.pixSplitConfig({}, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

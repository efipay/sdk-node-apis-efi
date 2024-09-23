const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    id: 'splitConfigId',
}

let body = {
    descricao: "Batatinha frita 1, 2, 3",
    lancamento: {
        imediato: true
    },
    split: {
        divisaoTarifa: "assumir_total",
        minhaParte: {
            tipo: "fixo",
            valor: "50.00"
        },
        repasses: [
            {
                tipo: "fixo",
                valor: "5.00",
                favorecido: {
                    cpf: "12345678909",
                    conta: "1234567"
                }
            },
            {
                tipo: "fixo",
                valor: "10.00",
                favorecido: {
                    cpf: "94271564656",
                    conta: "7654321"
                }
            }
        ]
    }
};

const efipay = new EfiPay(options)

// O método pixSplitConfigId indica os campos que devem ser enviados e que serão retornados
efipay.pixSplitConfigId(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

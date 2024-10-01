const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

const efipay = new EfiPay(options)

let params = {
    identificadorPagamento: 'urn:efi:ae71713f-875b-4af3-9d85-0bcb43288847',
}

let body = [
    {
        endToEndId: "E09089356202408281500624f423208f",
        valor: "0.01"
    },
    {
        endToEndId: "E09089356202408291500a0ecaa22e86",
        valor: "0.01"
    }
]

// O método ofDevolutionRecurrencyPix indica os campos que devem ser enviados e que serão retornados
efipay.ofDevolutionRecurrencyPix(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

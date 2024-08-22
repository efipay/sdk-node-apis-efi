const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    id: 0,
}

let body = {
    valor: 1000,
}

const efipay = new EfiPay(options)

// O método refundCard indica os campos que devem ser enviados e que serão retornados	
efipay.refundCard(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

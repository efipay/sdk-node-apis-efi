const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

const efipay = new EfiPay(options)

let params = {
    identficadorPagamento: 'urn:efi:ae71713f-875b-4af3-9d85-0bcb43288847',
}

let body = {
    valor: "9.99"
}


// O método ofReplaceRecurrencyPixParcel indica os campos que devem ser enviados e que serão retornados
efipay.ofReplaceRecurrencyPixParcel(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

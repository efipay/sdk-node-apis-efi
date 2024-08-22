const EfiPay = require('sdk-node-apis-efi')
let options = require('../../credentials')


let body = {
    url : 'https://suaUrl.com.br/webhook',
}

const efipay = new EfiPay(options)

// O método payConfigWebhook indica os campos que devem ser enviados e que serão retornados
efipay.payConfigWebhook({}, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

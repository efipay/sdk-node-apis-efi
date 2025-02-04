const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

let params = {
    idInfracao: '1'
}

let body = {
    analise: "aceito",
    justificativa: "Justificativa"
}

// O método medDefense indica os campos que devem ser enviados e que serão retornados
efipay.medDefense(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

const efipay = new EfiPay(options)

let body = {
    periodicidade: "diario",
    status: "ativo",
    envia_email: true,
    comprimir_arquivos: true
}

// O método updateStatementRecurrency indica os campos que devem ser enviados e que serão retornados
efipay.updateStatementRecurrency({}, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

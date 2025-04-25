const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

let params = {
    e2eId: 'E18236120202104191813s0326120V4K',
}

// O método pixGetReceipt indica os campos que devem ser enviados e que serão retornados
efipay.pixGetReceipt(params)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

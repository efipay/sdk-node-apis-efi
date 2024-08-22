const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    begin_date: '2024-01-01',
    end_date: '2024-12-31',
    charge_type: 'billet',
    status: 'link'
}

const efipay = new EfiPay(options)

// O método listCharges indica os campos que devem ser enviados e que serão retornados
efipay.listCharges(params)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })
const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    id: 1009,
}

let body = {
    plan_id: 3,
    customer: {
        email: "gorbadoc.oldbuck@gmail.com",
        phone_number: "31123456789"
    },
    items: [{
        name: "Product 1",
        value: 1000,
        amount: 1
    }],
    shippings: [{
        name: "frete",
        value: 1800
    }]
}

const efipay = new EfiPay(options)

// O método updateSubscription indica os campos que devem ser enviados e que serão retornados
efipay.updateSubscription(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

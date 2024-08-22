const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    id: 0,
}

let body = {
    payment: {
        credit_card: {
            customer: {
                name: "Gorbadoc Oldbuck",
                cpf: "94271564656",
                email: "email_do_cliente@servidor.com.br",
                birth: "1990-08-29",
                phone_number: "5144916523"
            },
            billing_address: {
                street: "Avenida Juscelino Kubitschek",
                number: "909",
                neighborhood: "Bauxita",
                zipcode: "35400000",
                city: "Ouro Preto",
                complement: "",
                state: "MG"
            },
            payment_token: "75bfce47d230b550f7eaac2a932e0878a934cb3"
        }
    }
}

const efipay = new EfiPay(options)

// O método cardPaymentRetry indica os campos que devem ser enviados e que serão retornados	
efipay.cardPaymentRetry(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

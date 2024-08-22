const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    cobsv: [
        {
            calendario: {
                dataDeVencimento: "2020-01-10"
            },
            txid: "fb2761260e554ad593c7226beb5cb650",
            valor: {
                original: "110.00"
            }
        },
        {
            calendario: {
                dataDeVencimento: "2020-01-10"
            },
            txid: "7978c0c97ea847e78e8849634473c1f1",
            valor: {
                original: "110.00"
            }
        }
    ]
};

let params = {
    id: 123,
}

const efipay = new EfiPay(options)

// O método pixUpdateDueCharge indica os campos que devem ser enviados e que serão retornados
efipay.pixUpdateDueChargeBatch(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

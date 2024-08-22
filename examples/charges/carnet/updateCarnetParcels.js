const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    id: 25093006
}

let body = {
    parcels: [
        {
            parcel: 1,
            expire_at: "2024-01-10"
        },
        {
            parcel: 2,
            expire_at: "2024-02-11"
        },
        {
            parcel: 3,
            expire_at: "2024-03-15"
        },
        {
            parcel: 4,
            expire_at: "2024-04-19"
        }
    ]
}

const efipay = new EfiPay(options)

// O método updateCarnetParcels indica os campos que devem ser enviados e que serão retornados
efipay.updateCarnetParcels(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

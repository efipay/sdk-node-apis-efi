const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

let body = {
    id: 12069,
    location: 'pix.example.com/qr/v2/rec/2353c790eefb11eaadc10242ac120002',
    criacao: '2023-12-20T12:38:28.774Z'
}


const efipay = new EfiPay(options)

efipay.pixCreateLocationRecurrenceAutomatic({}, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

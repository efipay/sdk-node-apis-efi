const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    status: "CANCELADA"
}


let params = {
    idSolicRec: 'RN1234567820240115abcdefghijk',
}

const efipay = new EfiPay(options)

efipay.pixUpdateRequestRecurrenceAutomatic(params, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

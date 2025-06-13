const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    idRec: 'RN1234567820240115abcdefghijk',
}

const efipay = new EfiPay(options)

efipay.pixDetailRecurrenceAutomatic(params)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

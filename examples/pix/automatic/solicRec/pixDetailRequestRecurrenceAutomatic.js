
const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    idSolicRec: 'SC876456782024021577825445312',
}

const efipay = new EfiPay(options)

efipay.pixDetailRequestRecurrenceAutomatic(params)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

let params = {
    id: 12069,
}

const efipay = new EfiPay(options)

efipay.pixDetailLocationRecurrenceAutomatic(params)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

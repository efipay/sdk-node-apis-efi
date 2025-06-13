const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    inicio: '2024-04-01T00:00:00Z',
    fim: '2024-04-01T23:59:59Z'
}

const efipay = new EfiPay(options)

efipay.pixListAutomaticCharge(params)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    idEnvio: '',
}

const efipay = new EfiPay(options)

efipay.pixSendDetailId(params, [])
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

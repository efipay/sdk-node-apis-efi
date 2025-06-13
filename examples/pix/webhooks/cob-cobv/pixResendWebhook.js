const EfiPay = require('sdk-node-apis-efi')
let options = require('../../../credentials')


let body = {
    tipo: 'PIX_RECEBIDO',
    e2eids: [
        "E09089356202501151648API44aff264",
        "E09089356202501151647API77209f1c"
    ]
}


const efipay = new EfiPay(options)

efipay.pixResendWebhook({}, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

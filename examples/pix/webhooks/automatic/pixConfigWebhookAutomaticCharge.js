const EfiPay = require('sdk-node-apis-efi')
let options = require('../../../credentials')

options['validateMtls'] = false

let body = {
    webhookUrl: 'https://usuario.recebedor.com/api/webhookcobr/',
}

const efipay = new EfiPay(options)

efipay.pixConfigWebhookAutomaticCharge({}, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

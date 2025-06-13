const EfiPay = require('sdk-node-apis-efi')
let options = require('../../../credentials')

options['validateMtls'] = false

let body = {
    webhookUrl: 'https://usuario.recebedor.com/api/webhookrec/',
}

const efipay = new EfiPay(options)

efipay.pixConfigWebhookRecurrenceAutomatic({}, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

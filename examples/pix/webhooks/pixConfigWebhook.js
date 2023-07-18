const EfiPay = require('sdk-node-apis-efi')
let options = require('../../credentials')

options['validateMtls'] = false

let body = {
	webhookUrl: 'https://exemplo-pix/webhook',
}

let params = {
	chave: 'SUACHAVEPIX',
}

const efipay = new EfiPay(options)

efipay.pixConfigWebhook(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

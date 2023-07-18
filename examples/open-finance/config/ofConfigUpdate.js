const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

let body = {
	redirectURL: 'https:/suaUrl.com.br/redirect',
	webhookURL: 'https://suaUrl.com.br/webhook',
}

efipay.ofConfigUpdate([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	chave: 'SUACHAVEPIX',
}

const efipay = new EfiPay(options)

efipay.pixDeleteEvp(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

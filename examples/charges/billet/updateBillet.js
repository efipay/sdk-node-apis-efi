const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1008,
}

let body = {
	expire_at: '2024-12-12',
}

const efipay = new EfiPay(options)

efipay.updateBillet(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

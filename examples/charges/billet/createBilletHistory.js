const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1001,
}

let body = {
	description: 'This charge was not fully paid',
}

const efipay = new EfiPay(options)

efipay.createChargeHistory(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

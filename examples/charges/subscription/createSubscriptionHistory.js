const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1001,
}

let body = {
	description: 'This subscription is about a service',
}

const efipay = new EfiPay(options)

efipay.createSubscriptionHistory(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

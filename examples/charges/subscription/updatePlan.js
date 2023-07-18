const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1008,
}

let body = {
	name: 'My new plan',
}

const efipay = new EfiPay(options)

efipay.updatePlan(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

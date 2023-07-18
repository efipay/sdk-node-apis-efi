const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {}

let body = {
	name: 'My first plan',
	repeats: 24,
	interval: 2,
}

const efipay = new EfiPay(options)

efipay.createPlan(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

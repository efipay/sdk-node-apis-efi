const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	name: 'My Plan',
	limit: 20,
	offset: 0,
}

const efipay = new EfiPay(options)

efipay.listPlans(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

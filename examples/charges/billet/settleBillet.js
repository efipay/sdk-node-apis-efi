const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 553834,
}

const efipay = new EfiPay(options)

efipay.settleCharge(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

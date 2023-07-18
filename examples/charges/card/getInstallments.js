const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	brand: 'visa',
	total: 5000,
}

const efipay = new EfiPay(options)

efipay.getInstallments(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 26812,
}

const efipay = new EfiPay(options)

efipay.settleCarnet(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
	tipoCob: 'cob',
}

const efipay = new EfiPay(options)

efipay.pixCreateLocation([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

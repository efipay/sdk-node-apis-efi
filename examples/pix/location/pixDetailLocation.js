const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: '95',
}

const efipay = new EfiPay(options)

efipay.pixDetailLocation(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

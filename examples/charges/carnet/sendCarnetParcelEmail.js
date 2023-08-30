const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1002,
	parcel: 1,
}

let body = {
	email: 'oldbuck@efipay.com.br',
}

const efipay = new EfiPay(options)

efipay.sendCarnetParcelEmail(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

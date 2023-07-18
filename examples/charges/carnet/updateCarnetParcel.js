const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 25093006,
	parcel: 1,
}

let body = {
	expire_at: '2023-12-12',
}

const efipay = new EfiPay(options)

efipay.updateCarnetParcel(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

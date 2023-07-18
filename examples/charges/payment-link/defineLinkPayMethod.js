const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	billet_discount: 0,
	card_discount: 0,
	message: '',
	expire_at: '2022-12-01',
	request_delivery_address: false,
	payment_method: 'all',
}

const efipay = new EfiPay(options)

efipay.defineLinkPayMethod(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

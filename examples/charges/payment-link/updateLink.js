const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	billet_discount: 0,
	card_discount: 0,
	message: '',
	expire_at: '2024-12-01',
	request_delivery_address: false,
	payment_method: 'all',
}

const efipay = new EfiPay(options)

// O método updateChargeLink indica os campos que devem ser enviados e que serão retornados
efipay.updateChargeLink(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

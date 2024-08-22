const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 0,
}

let body = {
	items: [
		{
			name: 'Product One',
			value: 600,
			amount: 1,
		},
	],
	settings: {
		payment_method: 'all',
		expire_at: '2022-12-15',
		request_delivery_address: false,
	},
}

const efipay = new EfiPay(options)

// O método oneStepSubscriptionLink indica os campos que devem ser enviados e que serão retornados
efipay.oneStepSubscriptionLink(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	}).catch((error) => {
		console.log(error)
	})

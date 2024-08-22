const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
	items: [
		{
			name: 'Product 1',
			value: 1000,
			amount: 2,
		},
	],
	shippings: [
		{
			name: 'Default Shipping Cost',
			value: 100,
		},
	],
}

const efipay = new EfiPay(options)

// O método createCharge indica os campos que devem ser enviados e que serão retornados
efipay.createCharge({}, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

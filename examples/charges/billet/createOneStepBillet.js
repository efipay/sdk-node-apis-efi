const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
	payment: {
		banking_billet: {
			expire_at: '2024-09-20',
			customer: {
				name: 'Gorbadoc Oldbuck',
				email: 'oldbuck@efipay.com.br',
				cpf: '94271564656',
				birth: '1977-01-15',
				phone_number: '5144916523',
			},
		},
	},

	items: [
		{
			name: 'Product 1',
			value: 500,
			amount: 1,
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

// O método createOneStepCharge indica os campos que devem ser enviados e que serão retornados
efipay.createOneStepCharge([], body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

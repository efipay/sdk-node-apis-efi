const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1001
}

let body = {
	description: 'This charge was not fully paid',
}

const efipay = new EfiPay(options)

// O método createChargeHistory indica os campos que devem ser enviados e que serão retornados
efipay.createChargeHistory(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

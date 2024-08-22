const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1001,
}

let body = {
	description: 'This carnet is about a service',
}

const efipay = new EfiPay(options)

// O método createCarnetHistory indica os campos que devem ser enviados e que serão retornados
efipay.createCarnetHistory(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva	
	})
	.catch((error) => {
		console.log(error)
	})

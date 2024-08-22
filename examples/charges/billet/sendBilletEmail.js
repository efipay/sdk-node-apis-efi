const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1000,
}

let body = {
	email: 'oldbuck@efipay.com.br',
}

const efipay = new EfiPay(options)

// O método sendBilletEmail indica os campos que devem ser enviados e que serão retornados
efipay.sendBilletEmail(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

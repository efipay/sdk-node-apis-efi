const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1002,
}

let body = {
	email: 'oldbuck@efipay.com.br',
}

const efipay = new EfiPay(options)

// O método sendCarnetEmail indica os campos que devem ser enviados e que serão retornados
efipay.sendCarnetEmail(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

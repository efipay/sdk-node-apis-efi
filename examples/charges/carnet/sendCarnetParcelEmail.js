const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1002,
	parcel: 1,
}

let body = {
	email: 'oldbuck@efipay.com.br',
}

const efipay = new EfiPay(options)

// O método sendCarnetParcelEmail indica os campos que devem ser enviados e que serão retornados
efipay.sendCarnetParcelEmail(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

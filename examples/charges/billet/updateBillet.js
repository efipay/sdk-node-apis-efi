const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1008,
}

let body = {
	expire_at: '2024-12-12',
}

const efipay = new EfiPay(options)

// O método updateBillet indica os campos que devem ser enviados e que serão retornados
efipay.updateBillet(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

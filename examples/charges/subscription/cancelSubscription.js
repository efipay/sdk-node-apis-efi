const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 0,
}

const efipay = new EfiPay(options)

// O método cancelSubscription indica os campos que devem ser enviados e que serão retornados
efipay.cancelSubscription(params)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

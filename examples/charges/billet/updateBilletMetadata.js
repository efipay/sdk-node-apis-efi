const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	id: 1008,
}

let body = {
	notification_url: 'http://yourdomain.com',
	custom_id: 'my_new_id',
}

const efipay = new EfiPay(options)

// O método updateChargeMetadata indica os campos que devem ser enviados e que serão retornados
efipay.updateChargeMetadata(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

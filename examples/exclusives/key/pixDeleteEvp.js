const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	chave: 'SUACHAVEPIX',
}

const efipay = new EfiPay(options)

// O método pixDeleteEvp indica os campos que devem ser enviados e que serão retornados
efipay.pixDeleteEvp(params)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva	
	})
	.catch((error) => {
		console.log(error)
	})

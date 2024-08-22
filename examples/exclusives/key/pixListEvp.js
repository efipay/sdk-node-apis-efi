const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

// O método pixListEvp indica os campos que devem ser enviados e que serão retornados
efipay.pixListEvp()
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

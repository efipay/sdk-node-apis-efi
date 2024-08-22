const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	idEnvio: '01',
}

let body = {
	valor: '12.34',
	pagador: {
		chave: 'SUACHAVEPIX',
	},
	favorecido: {
		chave: 'ChavePixDeDestino',
	},
}

const efipay = new EfiPay(options)

// O método pixSend indica os campos que devem ser enviados e que serão retornados
efipay.pixSend(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

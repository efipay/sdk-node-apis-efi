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

efipay.pixSend(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

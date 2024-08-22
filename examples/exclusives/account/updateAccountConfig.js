const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
	pix: {
		receberSemChave: true,
		chaves: {
			SUACHAVEPIX: {
				recebimento: {
					txidObrigatorio: false,
					qrCodeEstatico: {
						recusarTodos: false,
					},
				},
			},
		},
	},
}

const efipay = new EfiPay(options)

// O método updateAccountConfig indica os campos que devem ser enviados e que serão retornados
efipay.updateAccountConfig({}, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

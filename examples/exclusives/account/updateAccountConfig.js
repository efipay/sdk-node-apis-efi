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

efipay.updateAccountConfig([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

const efipay = new EfiPay(options)

let body = {
	pagador: {
		idParticipante: '',
		cpf: '',
	},
	valor: '0.01',
	favorecido: {
		contaBanco: {
			codigoBanco: '',
			agencia: '',
			documento: '',
			nome: '',
			conta: '',
			tipoConta: '',
		},
	},
	codigoCidadeIBGE: '',
	infoPagador: 'Cobrança referente ao pedido X',
}

// O método ofStartPixPayment indica os campos que devem ser enviados e que serão retornados
efipay.ofStartPixPayment({}, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

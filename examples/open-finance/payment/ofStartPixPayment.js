const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

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

efipay.ofStartPixPayment([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

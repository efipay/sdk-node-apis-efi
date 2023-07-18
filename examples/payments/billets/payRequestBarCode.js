const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

let params = {
	codBarras: '',
}

let body = {
	valor: 0,
	dataPagamento: '2022-03-10',
	descricao: 'Pagamento de boleto, teste API Pagamentos',
}

efipay.payRequestBarCode(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

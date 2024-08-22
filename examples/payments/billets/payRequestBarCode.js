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

// O método payRequestBarCode indica os campos que devem ser enviados e que serão retornados
efipay.payRequestBarCode(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

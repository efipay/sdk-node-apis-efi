const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

let params = {
	dataInicio: '2022-01-01',
	dataFim: '2024-06-30',
}

// O método payListPayments indica os campos que devem ser enviados e que serão retornados
efipay.payListPayments(params)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

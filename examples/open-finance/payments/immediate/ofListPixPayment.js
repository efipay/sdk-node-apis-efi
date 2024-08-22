const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

const efipay = new EfiPay(options)

let params = {
	inicio: '2022-01-01',
	fim: '2025-06-30',
}

// O método ofListPixPayment indica os campos que devem ser enviados e que serão retornados
efipay.ofListPixPayment(params)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

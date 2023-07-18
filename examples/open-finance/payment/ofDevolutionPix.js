const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const efipay = new EfiPay(options)

let body = {
	valor: '0.01',
}

let params = {
	identificadorPagamento: 'urn:efipay.:ea807997-9c28-47a7-8ebc-eeb672ea59f0',
}

efipay.ofDevolutionPix(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

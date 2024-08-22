const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
	valor: '7.89',
}

let params = {
	e2eId: 'E18236120202104191813s0326120V4K',
	id: '101',
}

const efipay = new EfiPay(options)

efipay.pixDevolution(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

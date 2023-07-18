const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	e2eid: '',
}

const efipay = new EfiPay(options)

efipay.pixSendDetail(params, [])
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

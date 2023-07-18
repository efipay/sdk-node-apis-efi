const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd',
}

const efipay = new EfiPay(options)

efipay.pixDetailCharge(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
	token: '252948279264ee47e117cb099ef81',
}

const efipay = new EfiPay(options)

efipay.getNotification(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})

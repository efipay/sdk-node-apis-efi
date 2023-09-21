const EfiPay = require('../../../index')
const options = require('../../credentials')

let params = {
	token: '0476a1d1-cf40-4702-889c-60f06acecb73',
}

const efipay = new EfiPay(options)

efipay.getNotification(params)
	.then((resposta) => {
		console.log(JSON.stringify(resposta))
	})
	.catch((error) => {
		console.log(error)
	})

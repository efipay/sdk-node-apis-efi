const Endpoints = require('./lib/endpoints')
const constants = require('./lib/constants')

class EfiPay {
	constructor(options) {
		if (options.pix_cert) {
			options.certificate = options.pix_cert
		}

		let methods = {}

		Object.keys(constants.APIS).forEach((api) => {
			Object.assign(methods, constants.APIS[api].ENDPOINTS)
		})

		let endpoints = new Endpoints(options, constants)
		Object.keys(methods).forEach(function (api) {
			EfiPay.prototype[api] = function (params, body) {
				return endpoints.run(api, params, body)
			}
		})
	}
}

module.exports = EfiPay

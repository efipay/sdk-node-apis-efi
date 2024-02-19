const fs = require('fs')
const https = require('https')
const sdkPackage = require('../package.json')
const axios = require('axios')
const randomstring = require('randomstring')

class Endpoints {
	constructor(options, constants) {
		this.options = options
		this.auth = null
		this.constants = constants
		this.axiosInstance = axios.create()
	}

	run(name, params, body) {
		let endpoint
		if (this.constants.APIS.DEFAULT.ENDPOINTS.hasOwnProperty(name)) {
			endpoint = this.constants.APIS.DEFAULT.ENDPOINTS[name]
			this.baseUrl = this.options.sandbox ? this.constants.APIS.DEFAULT.URL.SANDBOX : this.constants.APIS.DEFAULT.URL.PRODUCTION
			this.authRoute = this.constants.APIS.DEFAULT.ENDPOINTS.authorize
		} else {
			Object.keys(this.constants.APIS).forEach((key) => {
				if (this.constants.APIS[key].ENDPOINTS.hasOwnProperty(name)) {
					endpoint = this.constants.APIS[key].ENDPOINTS[name]
					this.baseUrl = this.options.sandbox ? this.constants.APIS[key].URL.SANDBOX : this.constants.APIS[key].URL.PRODUCTION
					this.authRoute = this.constants.APIS[key].ENDPOINTS.authorize
					return
				}
			})

			try {
				if (this.options.pemKey) {
					this.agent = new https.Agent({
						cert: fs.readFileSync(this.options.certificate),
						key: fs.readFileSync(this.options.pemKey),
						passphrase: '',
					})
				} else {
					this.agent = new https.Agent({
						pfx: fs.readFileSync(this.options.certificate),
						passphrase: '',
					})
				}
			} catch (error) {
				if (this.options.pemKey)
					throw `FALHA AO LER O CERTIFICADO OU A CHAVE, VERIFIQUE O CAMINHO INFORMADO:\n CAMINHO DO CERTIFICADO: ${this.options.certificate} \n CAMINHO DA CHAVE: ${this.options.pemKey}`
				else
					throw `FALHA AO LER O CERTIFICADO, VERIFIQUE O CAMINHO INFORMADO: ${this.options.certificate}`
			}
		}
		this.params = params

		return this.req(endpoint, body)
	}

	async req(endpoint, body) {
		let req = await this.createRequest(endpoint, body)

		// Request interceptor
		this.axiosInstance.interceptors.request.use(
			async (config) => {
				if (!this.auth || this.isExpired()) {
					await this.authenticate()
				}

				config.headers = {
					Authorization: `Bearer ${this.auth.access_token}`,
					'x-skip-mtls-checking': !this.options.validateMtls
				}
				if (this.options.partner_token) {
					config.headers['partner-token'] = this.options.partner_token
				}
				if (this.baseUrl == this.constants.APIS.OPENFINANCE.URL.PRODUCTION || this.baseUrl == this.constants.APIS.OPENFINANCE.URL.SANDBOX) {
					config.headers['x-idempotency-key'] = randomstring.generate({ length: 72, charset: 'alphanumeric' })
				}

				return config
			},
			(error) => {
				Promise.reject(error)
			},
		)

		return this.axiosInstance(req)
			.then((res) => {
				return res.data
			})
			.catch((error) => {
				throw error.response.data
			})
	}

	isExpired() {
		let current_time = new Date().getTime() / 1000
		if (current_time > this.auth.authDate + this.auth.expires_in) {
			return true
		}
		return false
	}

	async authenticate() {
		let authParams = {
			method: 'POST',
			url: this.baseUrl + this.authRoute.route,
			headers: {
				'api-sdk': 'node-' + sdkPackage.version,
			},
			data: {
				grant_type: 'client_credentials',
			},
		}
		if (this.constants.APIS.DEFAULT.URL.PRODUCTION == this.baseUrl || this.constants.APIS.DEFAULT.URL.SANDBOX == this.baseUrl) {
			authParams.auth = {
				username: this.options.client_id,
				password: this.options.client_secret,
			}
		} else {
			let token = Buffer.from(this.options.client_id + ':' + this.options.client_secret).toString('base64')
			authParams.headers['Authorization'] = 'Basic ' + token
			authParams.headers['Content-Type'] = 'application/json'
			authParams.httpsAgent = this.agent
		}
		return axios(authParams)
			.then((res) => {
				this.auth = res.data
				this.auth.authDate = new Date().getTime() / 1000
			})
			.catch((error) => {
				throw error.data
			})
	}

	async createRequest(endpoint, body) {
		let { route, method } = endpoint
		let regex = /\:(\w+)/g
		let query = ''
		let placeholders = route.match(regex) || []
		let params = {}

		for (let prop in this.params) {
			params[prop] = this.params[prop]
		}

		let getVariables = function () {
			return placeholders.map(function (item) {
				return item.replace(':', '')
			})
		}

		let updateRoute = function () {
			let variables = getVariables()
			variables.forEach(function (value, index) {
				if (params[value]) {
					route = route.replace(placeholders[index], params[value])
					delete params[value]
				}
			})
		}

		let getQueryString = function () {
			let keys = Object.keys(params)
			let initial = keys.length >= 1 ? '?' : ''
			return keys.reduce(function (previous, current, index, array) {
				let next = index === array.length - 1 ? '' : '&'
				return [previous, current, '=', params[current], next].join('')
			}, initial)
		}

		updateRoute()
		query = getQueryString()

		let headers = new Object()
		headers['x-skip-mtls-checking'] = !this.options.validateMtls

		if (this.options.partner_token) {
			headers['partner-token'] = this.options.partner_token
		}

		if (this.baseUrl == this.constants.APIS.OPENFINANCE.URL.PRODUCTION || this.baseUrl == this.constants.APIS.OPENFINANCE.URL.SANDBOX) {
			headers['x-idempotency-key'] = randomstring.generate({ length: 72, charset: 'alphanumeric' })
		}

		let req = {
			method,
			url: String([this.baseUrl, route, query].join('')),
			headers,
			data: body,
		}

		if (this.baseUrl != this.constants.APIS.DEFAULT.URL.PRODUCTION && this.baseUrl != this.constants.APIS.DEFAULT.URL.SANDBOX) {
			req['httpsAgent'] = this.agent
		}

		return req
	}
}

module.exports = Endpoints

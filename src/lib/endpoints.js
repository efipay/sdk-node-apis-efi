// @ts-nocheck
import fs from 'fs'
import https from 'https'
import sdkPackage from '../../package.json'
import axios from 'axios'
import randomstring from 'randomstring'

class Endpoints {

	constructor(options, constants) {
		this.options = options
		this.auth = null
		this.constants = constants
		this.authError = null
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
				if (this.options.cert_base64 === undefined || this.options.cert_base64 === false) {
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
				} else if (this.options.cert_base64 === true) {

					if (this.options.pemKey) {
						this.agent = new https.Agent({
							cert: Buffer.from(this.options.certificate, 'base64'),
							key: Buffer.from(this.options.pemKey, 'base64'),
							passphrase: '',
						})
					} else {
						this.agent = new https.Agent({
							pfx: Buffer.from(this.options.certificate, 'base64'),
							passphrase: '',
						})
					}
				}
			} catch (error) {

				if (this.options.pemKey && (this.options.cert_base64 === undefined || this.options.cert_base64 === false)) {
					console.error(`Falha ao ler o certificado ou a chave, verifique o caminho informado:\nCaminho do certificado: ${this.options.certificate}\nCaminho da chave: ${this.options.pemKey}`);
				} else if (this.options.cert_base64 === undefined || this.options.cert_base64 === false) {
					console.error(`Falha ao ler o certificado, verifique o caminho informado: ${this.options.certificate}`);
				}
				if (this.options.pemKey && this.options.cert_base64 === true) {
					console.error(`Falha ao ler o certificado ou a chave, verifique o conteúdo informado do certificado e da chave`);
				} else if (this.options.cert_base64 === true) {
					console.error(`Falha ao ler o certificado, verifique o conteúdo informado`);
				}

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
					this.authError = await this.authenticate()
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
				// Para a rota de comprovantes, retornar os dados diretamente (arraybuffer)
				if (req.url.includes('/v2/gn/pix/comprovantes')) {
					return res.data
				}
				return res.data
			})
			.catch((error) => {
				if (this.authError) {
					const error = this.authError?.response?.data || this.authError?.cause || this.authError;

					switch (error.message) {

						case 'socket hang up': throw 'Verifique o atributo sandbox e certificate, e garanta que eles estejam corretamente atribuidos para o ambiente desejado'

						case 'header too long': throw 'Verifique se o certificado foi enviado no formato correto'

						case 'wrong tag':
						case 'error:0909006C:PEM routines:get_name:no start line':
							throw 'Foi enviando um certificado .pem porém não foi enviado o atributo pemKey corretamente, tente enviar o mesmo valor para ambos'

						default: throw error
					}
				} else {
					// Para erros na rota de comprovantes, tratar normalmente (não como arraybuffer)
					let errorData = error.response?.data;

					const errorUrl = error.request.res.responseUrl || '';

					// Se for um arraybuffer (rota de comprovantes), converter para string/JSON
					if (errorUrl.includes('/v2/gn/pix/comprovantes')) {
						try {
							const decoder = new TextDecoder('utf-8');
							const errorText = decoder.decode(errorData);
							errorData = JSON.parse(errorText);
						} catch (parseError) {
							// Se não conseguir parsear, manter o erro original
							errorData = error.response?.data;
						}
					}

					switch (this.baseUrl) {
						case this.constants.APIS.DEFAULT.URL.PRODUCTION:
						case this.constants.APIS.DEFAULT.URL.SANDBOX:
							throw errorData
						case this.constants.APIS.PIX.URL.PRODUCTION:
						case this.constants.APIS.PIX.URL.SANDBOX:
							throw errorData
						case this.constants.APIS.OPENFINANCE.URL.PRODUCTION:
						case this.constants.APIS.OPENFINANCE.URL.SANDBOX:
							throw errorData
						case this.constants.APIS.PAGAMENTOS.URL.PRODUCTION:
						case this.constants.APIS.PAGAMENTOS.URL.SANDBOX:
							throw errorData
						case this.constants.APIS.CONTAS.URL.PRODUCTION:
						case this.constants.APIS.CONTAS.URL.SANDBOX:
							throw errorData
						default:
							throw errorData
					}
				}
			})
	}

	isExpired() {
		if (!this.options.cache) {
			return true
		}
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
				'api-sdk': 'efi-node-' + sdkPackage.version,
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
				return error
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

		if (endpoint.route === this.constants.APIS.PIX.ENDPOINTS.pixConfigWebhook.route && endpoint.method === this.constants.APIS.PIX.ENDPOINTS.pixConfigWebhook.method) {

			this.options.validateMtls = this.options.validateMtls || this.options.validate_mtls

			headers['x-skip-mtls-checking'] = !this.options.validateMtls

		}

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

		// Configurar responseType como arraybuffer para a rota de comprovantes
		if (route.includes('/v2/gn/pix/comprovantes')) {
			req['responseType'] = 'arraybuffer'
		}

		if (this.baseUrl != this.constants.APIS.DEFAULT.URL.PRODUCTION && this.baseUrl != this.constants.APIS.DEFAULT.URL.SANDBOX) {
			req['httpsAgent'] = this.agent
		}

		return req
	}
}

export default Endpoints

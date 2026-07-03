// @ts-nocheck
import fs from 'fs'
import https from 'https'
import { randomInt } from 'crypto'
import sdkPackage from '../../package.json'
import axios from 'axios'

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const TOKEN_EXPIRATION_MARGIN_SECONDS = 30

function generateIdempotencyKey(length = 72) {
	let key = ''
	for (let i = 0; i < length; i++) {
		key += ALPHANUMERIC[randomInt(0, ALPHANUMERIC.length)]
	}
	return key
}

class Endpoints {

	constructor(options, constants) {
		this.options = options
		this.constants = constants
		this.authCache = new Map()
		this.axiosInstance = axios.create()
	}

	run(name, params, body) {
		const context = this.resolveRequestContext(name)
		return this.req(context, params, body)
	}

	resolveRequestContext(name) {
		let apiKey = null
		let apiConfig = null
		let endpoint = null

		if (Object.prototype.hasOwnProperty.call(this.constants.APIS.DEFAULT.ENDPOINTS, name)) {
			apiKey = 'DEFAULT'
			apiConfig = this.constants.APIS.DEFAULT
			endpoint = apiConfig.ENDPOINTS[name]
		} else {
			Object.keys(this.constants.APIS).forEach((key) => {
				if (!endpoint && Object.prototype.hasOwnProperty.call(this.constants.APIS[key].ENDPOINTS, name)) {
					apiKey = key
					apiConfig = this.constants.APIS[key]
					endpoint = apiConfig.ENDPOINTS[name]
				}
			})
		}

		if (!endpoint) {
			throw new Error(`Endpoint "${name}" não encontrado`)
		}

		const baseUrl = this.options.sandbox ? apiConfig.URL.SANDBOX : apiConfig.URL.PRODUCTION
		const context = {
			apiKey,
			endpoint,
			baseUrl,
			authRoute: apiConfig.ENDPOINTS.authorize,
		}

		if (apiKey !== 'DEFAULT') {
			context.httpsAgent = this.createHttpsAgent()
		}

		return context
	}

	createHttpsAgent() {
		try {
			if (this.options.cert_base64 === undefined || this.options.cert_base64 === false) {
				if (this.options.pemKey) {
					return new https.Agent({
						cert: fs.readFileSync(this.options.certificate),
						key: fs.readFileSync(this.options.pemKey),
						passphrase: '',
					})
				}

				return new https.Agent({
					pfx: fs.readFileSync(this.options.certificate),
					passphrase: '',
				})
			}

			if (this.options.cert_base64 === true) {
				if (this.options.pemKey) {
					return new https.Agent({
						cert: Buffer.from(this.options.certificate, 'base64'),
						key: Buffer.from(this.options.pemKey, 'base64'),
						passphrase: '',
					})
				}

				return new https.Agent({
					pfx: Buffer.from(this.options.certificate, 'base64'),
					passphrase: '',
				})
			}
		} catch (error) {
			this.handleCertificateError()
		}

		return undefined
	}

	handleCertificateError() {
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

	async req(context, params, body) {
		let req = await this.createRequest(context, params, body)

		return this.axiosInstance(req)
			.then((res) => {
				// Para a rota de comprovantes, retornar os dados diretamente (arraybuffer)
				if (req.url.includes('/v2/gn/pix/comprovantes')) {
					return res.data
				}
				return res.data
			})
			.catch((error) => {
				let errorData = error.response?.data;
				const errorUrl = error.request?.res?.responseUrl || '';

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

				throw errorData
			})
	}

	isExpired(auth) {
		if (!this.options.cache) {
			return true
		}
		let current_time = new Date().getTime() / 1000
		if (current_time > auth.authDate + auth.expires_in - TOKEN_EXPIRATION_MARGIN_SECONDS) {
			return true
		}
		return false
	}

	async getAuthentication(context) {
		const cachedAuth = this.authCache.get(context.baseUrl)

		if (cachedAuth && !this.isExpired(cachedAuth)) {
			return cachedAuth
		}

		try {
			const auth = await this.authenticate(context)
			this.authCache.set(context.baseUrl, auth)
			return auth
		} catch (error) {
			this.handleAuthError(error)
		}
	}

	handleAuthError(authError) {
		const error = authError?.response?.data || authError?.cause || authError;

		switch (error.message) {
			case 'socket hang up': throw 'Verifique o atributo sandbox e certificate, e garanta que eles estejam corretamente atribuidos para o ambiente desejado'

			case 'header too long': throw 'Verifique se o certificado foi enviado no formato correto'

			case 'wrong tag':
			case 'error:0909006C:PEM routines:get_name:no start line':
				throw 'Foi enviando um certificado .pem porém não foi enviado o atributo pemKey corretamente, tente enviar o mesmo valor para ambos'

			default: throw error
		}
	}

	async authenticate(context) {
		let authParams = {
			method: 'POST',
			url: context.baseUrl + context.authRoute.route,
			headers: {
				'api-sdk': 'efi-node-' + sdkPackage.version,
			},
			data: {
				grant_type: 'client_credentials',
			},
		}
		if (context.apiKey === 'DEFAULT') {
			authParams.auth = {
				username: this.options.client_id,
				password: this.options.client_secret,
			}
		} else {
			let token = Buffer.from(this.options.client_id + ':' + this.options.client_secret).toString('base64')
			authParams.headers['Authorization'] = 'Basic ' + token
			authParams.headers['Content-Type'] = 'application/json'
			authParams.httpsAgent = context.httpsAgent
		}

		const res = await axios(authParams)
		const auth = res.data
		auth.authDate = new Date().getTime() / 1000
		return auth
	}

	async createRequest(context, params = {}, body) {
		const auth = await this.getAuthentication(context)
		let { route, method } = context.endpoint
		let regex = /\:(\w+)/g
		let placeholders = route.match(regex) || []
		let requestParams = { ...params }

		let getVariables = function () {
			return placeholders.map(function (item) {
				return item.replace(':', '')
			})
		}

		let updateRoute = function () {
			let variables = getVariables()
			variables.forEach(function (value, index) {
				if (Object.prototype.hasOwnProperty.call(requestParams, value)) {
					route = route.replace(placeholders[index], encodeURIComponent(requestParams[value]))
					delete requestParams[value]
				}
			})
		}

		let getQueryString = function () {
			let keys = Object.keys(requestParams)
			let initial = keys.length >= 1 ? '?' : ''
			return keys.reduce(function (previous, current, index, array) {
				let next = index === array.length - 1 ? '' : '&'
				return [previous, encodeURIComponent(current), '=', encodeURIComponent(requestParams[current]), next].join('')
			}, initial)
		}

		updateRoute()
		let query = getQueryString()

		let headers = {
			Authorization: `Bearer ${auth.access_token}`,
			'x-skip-mtls-checking': !(this.options.validateMtls || this.options.validate_mtls)
		}

		if (this.options.partner_token) {
			headers['partner-token'] = this.options.partner_token
		}

		if (context.apiKey === 'OPENFINANCE') {
			headers['x-idempotency-key'] = generateIdempotencyKey()
		}

		let req = {
			method,
			url: String([context.baseUrl, route, query].join('')),
			headers,
			data: body,
		}

		// Configurar responseType como arraybuffer para a rota de comprovantes
		if (route.includes('/v2/gn/pix/comprovantes')) {
			req['responseType'] = 'arraybuffer'
		}

		if (context.apiKey !== 'DEFAULT') {
			req['httpsAgent'] = context.httpsAgent
		}

		return req
	}
}

export default Endpoints

// @ts-nocheck
import constants from "./lib/constants"
import Endpoints from "./lib/endpoints"
import { AllMethods } from "./methods/index"

export default class EfiPay extends AllMethods {

	/**
	 * Construtor da classe EfiPay.
	 * @param {Object} options - Objeto com opções de configuração e credenciais.
	 * @param {boolean} options.sandbox - Indica o ambite deseja, true para homologação e false para produção.
	 * @param {string} options.client_id - Client ID obtido em sua conta.
	 * @param {string} options.client_secret - Client Secrect obtido em sua conta.
	 * @param {string} [options.partner_token] - Token de parceiro caso tenha.
	 * @param {string} [options.certificate] - Caminho para o certificado
	 * @param {boolean} [options.cert_base64] - Indica se será enviado o certificado em base64
	 * @param {boolean} [options.validate_mtls] - Indica se será utilizado mTLS ou não no webhook
	 * @param {boolean} [options.validateMtls] - Indica se será utilizado mTLS ou não no webhook 
	 * @param {boolean} [options.cache] - Inidica se você deseja usar cache no token de autenticação, por padrão `true`
	 * 
	 * @param {string} [options.pix_cert] - # PRETERIDO # Caminho para o certificado
	 * @param {string} [options.pemKey] - Caminho para a chave privada, caso opte por enviar o certificado em PEM.
	*/
	constructor(options) {
		super()
		if (options.cache === undefined) {
			options.cache = true
		}
		if (options.pix_cert) {
			console.warn('⚠️  WARNING:\nO parâmetro "pix_cert" foi preterido, utilize "certificate" no lugar.');
			options.certificate = options.pix_cert;
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

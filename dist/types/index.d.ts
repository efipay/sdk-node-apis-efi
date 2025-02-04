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
    constructor(options: {
        sandbox: boolean;
        client_id: string;
        client_secret: string;
        partner_token?: string | undefined;
        certificate?: string | undefined;
        cert_base64?: boolean | undefined;
        validate_mtls?: boolean | undefined;
        validateMtls?: boolean | undefined;
        cache?: boolean | undefined;
        pix_cert?: string | undefined;
        pemKey?: string | undefined;
    });
}
import { AllMethods } from "./methods/index";

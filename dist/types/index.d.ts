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
    /**
     * Método para gerar o payload do PIX Estático e a imagem do QR Code em base64, retornando um objeto com os campos `qrcode` e `imagemQrcode`. O payload é gerado seguindo as especificações do Banco Central para o BRCode, incluindo a estrutura TLV e o cálculo do CRC-16 CCITT. A imagem do QR Code é gerada a partir do payload utilizando a biblioteca `qrcode`.
     *
     * @param {Object} pixData
     * @param {string} pixData.chave - Chave PIX (CPF, CNPJ, e-mail, telefone ou chave aleatória)
     * @param {string} pixData.merchantName - Nome do recebedor (máx. 25 caracteres)
     * @param {string} pixData.merchantCity - Cidade do recebedor (máx. 15 caracteres)
     * @param {number} [pixData.transactionAmount] - Valor da transação (ex: 10.50). Opcional.
     * @param {string} [pixData.txid='***'] - Identificador da transação (máx. 25 caracteres)
     * @param {string} [pixData.infoAdicional] - Informação adicional no MAI do PIX
     * @param {boolean} [pixData.oneTime=false] - Se true, o QR Code é de pagamento único
     * @returns {Promise<{ qrcode: string, imagemQrcode: string }>} - Retorna o payload do PIX e a imagem do QR Code em base64
     */
    pixGenerateStaticQRCode(pixData: {
        chave: string;
        merchantName: string;
        merchantCity: string;
        transactionAmount?: number | undefined;
        txid?: string | undefined;
        infoAdicional?: string | undefined;
        oneTime?: boolean | undefined;
    }): Promise<{
        qrcode: string;
        imagemQrcode: string;
    }>;
}
import { AllMethods } from "./methods/index";

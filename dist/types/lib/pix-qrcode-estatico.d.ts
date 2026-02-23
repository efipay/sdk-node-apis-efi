/**
 * Gera o payload (BRCode) e a imagem do QR Code para um PIX Estático.
 * Retorna o mesmo formato do endpoint `pixGenerateQRCode` da API Efí:
 * `{ qrcode: string, imagemQrcode: string }`
 *
 * @param {Object} options - Dados do PIX
 * @param {string} options.chave - Chave PIX (CPF, CNPJ, e-mail, telefone ou chave aleatória)
 * @param {string} options.merchantName - Nome do recebedor (máx. 25 caracteres)
 * @param {string} options.merchantCity - Cidade do recebedor (máx. 15 caracteres)
 * @param {number} [options.transactionAmount] - Valor da transação (ex: 10.50). Opcional.
 * @param {string} [options.txid='***'] - Identificador da transação (máx. 25 caracteres)
 * @param {string} [options.infoAdicional] - Informação adicional no MAI do PIX
 * @param {boolean} [options.oneTime=false] - Se true, o QR Code é de pagamento único
 * @param {string} [options.merchantCategoryCode='0000'] - MCC
 * @param {number} [options.transactionCurrency=986] - Código da moeda (986 = BRL)
 * @param {string} [options.countryCode='BR'] - Código do país
 * @returns {Promise<{ qrcode: string, imagemQrcode: string }>}
 */
export function createStaticPix(options: {
    chave: string;
    merchantName: string;
    merchantCity: string;
    transactionAmount?: number | undefined;
    txid?: string | undefined;
    infoAdicional?: string | undefined;
    oneTime?: boolean | undefined;
    merchantCategoryCode?: string | undefined;
    transactionCurrency?: number | undefined;
    countryCode?: string | undefined;
}): Promise<{
    qrcode: string;
    imagemQrcode: string;
}>;
/**
 * @param {string} str
 * @returns {string}
 */
export function computeCRC(str: string): string;

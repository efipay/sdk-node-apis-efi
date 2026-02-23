const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

let body = {
    chave: 'SUACHAVEPIX',                // CPF, CNPJ, e-mail, telefone ou chave aleatória
    merchantName: 'FULANO DE TAL',       // Nome do recebedor
    merchantCity: 'SAO PAULO',           // Cidade do recebedor
    transactionAmount: 25.50,            // Valor (opcional — omita para o pagador definir)
    txid: 'PEDIDO123',                   // ID da transação (opcional, padrão "***")
    oneTime: false,                       // true = pagamento único
}

const efipay = new EfiPay(options)

// O método pixGenerateStaticQRCode indica os campos que devem ser enviados e que serão retornados
efipay.pixGenerateStaticQRCode(body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    idEnvio: '01',
}

let body = {
    pagador: {
        chave: "a1f4102e-a446-4a57-bcce-6fa48899c1d1",
        infoPagador: "Pagamento de QR Code via API Pix"
    },
    pixCopiaECola: "00020101021226830014BR.GOV.BCB.PIX2561qrcodespix.sejaefi.com.br/v2 41e0badf811a4ce6ad8a80b306821fce5204000053000065802BR5905EFISA6008SAOPAULO60070503***61040000"
};



const efipay = new EfiPay(options)

// O método pixQrCodePay indica os campos que devem ser enviados e que serão retornados
efipay.pixQrCodePay(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })


const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    idRec: 'RN123456782024011577825445612',
    calendario: {
        dataExpiracaoSolicitacao: '2023-12-20T12:17:11.926Z'
    },
    destinatario: {
        agencia: '2569',
        conta: '550689',
        cpf: '15231470190',
        ispbParticipante: '91193552'
    }
}


const efipay = new EfiPay(options)

efipay.pixCreateRequestRecurrenceAutomatic({}, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

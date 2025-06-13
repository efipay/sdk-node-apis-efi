const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    loc: 108,
    vinculo: {
        devedor: {
            nome: 'Fulano de Tal'
        }
    },
    calendario: {
        dataInicial: '2024-04-01'
    },
    ativacao: {
        dadosJornada: {
            txid: '33beb661beda44a8928fef47dbeb2dc5'
        }
    }
}


let params = {
    idRec: 'RN1234567820240115abcdefghijk',
}

const efipay = new EfiPay(options)

efipay.pixUpdateRecurrenceAutomatic(params, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

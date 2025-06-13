const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    vinculo: {
        contrato: '63100862',
        devedor: {
            cpf: '45164632481',
            nome: 'Fulano de Tal'
        },
        objeto: 'Serviço de Streamming de Música.'
    },
    calendario: {
        dataFinal: '2025-04-01',
        dataInicial: '2024-04-01',
        periodicidade: 'MENSAL'
    },
    valor: {
        valorRec: '35.00'
    },
    politicaRetentativa: 'NAO_PERMITE',
    loc: 108,
    ativacao: {
        dadosJornada: {
            txid: '33beb661beda44a8928fef47dbeb2dc5'
        }
    }
}


const efipay = new EfiPay(options)

efipay.pixCreateRecurrenceAutomatic({}, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

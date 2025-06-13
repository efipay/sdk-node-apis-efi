const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    idRec: 'RR1234567820240115abcdefghijk',
    infoAdicional: 'Serviços de Streamming de Música e Filmes.',
    calendario: {
        dataDeVencimento: '2024-04-15'
    },
    valor: {
        original: '106.07'
    },
    ajusteDiaUtil: true,
    devedor: {
        cep: '89256140',
        cidade: 'Uberlândia',
        email: 'sebastiao.tavares@mail.com',
        logradouro: 'Alameda Franco 1056',
        uf: 'MG'
    },
    recebedor: {
        agencia: '9708',
        conta: '12682',
        tipoConta: 'CORRENTE'
    }
}


let params = {
    txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111',
}

const efipay = new EfiPay(options)

efipay.pixCreateAutomaticChargeTxid(params, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

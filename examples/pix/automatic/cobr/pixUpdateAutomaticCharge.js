const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    status: "CANCELADA"
}


let params = {
    txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111',
}

const efipay = new EfiPay(options)

efipay.pixUpdateAutomaticCharge(params, body)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

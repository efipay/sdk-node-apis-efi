const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111',
    data: '2024-05-20'
}

const efipay = new EfiPay(options)

efipay.pixRetryRequestAutomatic(params)
    .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error)
    })

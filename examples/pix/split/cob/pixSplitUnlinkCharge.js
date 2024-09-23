const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let params = {
    txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd',
}

const efipay = new EfiPay(options)

// O método pixSplitUnlinkCharge indica os campos que devem ser enviados e que serão retornados
efipay.pixSplitUnlinkCharge(params)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

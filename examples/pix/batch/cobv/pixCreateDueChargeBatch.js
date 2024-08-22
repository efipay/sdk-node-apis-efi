const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
    descricao: "Cobranças dos alunos do turno vespertino",
    cobsv: [
        {
            calendario: {
                dataDeVencimento: "2020-12-31",
                validadeAposVencimento: 30
            },
            txid: "fb2761260e554ad593c7226beb5cb650",
            devedor: {
                cpf: "08577095428",
                nome: "João Souza"
            },
            valor: {
                original: "100.00"
            },
            chave: "7c084cd4-54af-4172-a516-a7d1a12b75cc",
            solicitacaoPagador: "Informar matrícula"
        },
        {
            calendario: {
                dataDeVencimento: "2020-12-31",
                validadeAposVencimento: 30
            },
            txid: "7978c0c97ea847e78e8849634473c1f1",
            devedor: {
                cpf: "15311295449",
                nome: "Manoel Silva"
            },
            valor: {
                original: "100.00"
            },
            chave: "7c084cd4-54af-4172-a516-a7d1a12b75cc",
            solicitacaoPagador: "Informar matrícula"
        }
    ]
};


let params = {
    id: 123
}

const efipay = new EfiPay(options)

// O método pixCreateDueChargeBatch indica os campos que devem ser enviados e que serão retornados
efipay.pixCreateDueChargeBatch(params, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

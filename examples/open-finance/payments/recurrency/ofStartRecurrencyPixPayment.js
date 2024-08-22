const EfiPay = require('sdk-node-apis-efi')
const options = require('../../../credentials')

const efipay = new EfiPay(options)

let body = {
    pagador: {
        idParticipante: "9f4cd202-8f2b-11ec-b909-0242ac120002",
        cpf: "45204392050",
        cnpj: "90293071000112"
    },
    favorecido: {
        contaBanco: {
            nome: "Lucas Silva",
            documento: "17558266300",
            codigoBanco: "09089356",
            agencia: "0001",
            conta: "654984",
            tipoConta: "CACC"
        }
    },
    pagamento: {
        valor: "9.90",
        codigoCidadeIBGE: "3540000",
        infoPagador: "Churrasco",
        idProprio: "6236574863254",
        recorrencia: {
            tipo: "diaria",
            dataInicio: "2025-12-31",
            quantidade: 8,
            diaDaSemana: "SEGUNDA_FEIRA",
            diaDoMes: 15,
            datas: [
                "2024-08-01",
                "2024-08-08",
                "2024-08-15"
            ],
            descricao: "Petshop"
        }
    }
};


// O método ofStartRecurrencyPixPayment indica os campos que devem ser enviados e que serão retornados
efipay.ofStartRecurrencyPixPayment({}, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

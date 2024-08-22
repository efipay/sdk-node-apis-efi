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
        valor: "9.99",
        codigoCidadeIBGE: "3540000",
        infoPagador: "Churrasco",
        idProprio: "6236574863254",
        dataAgendamento: "2024-08-06"
    }
};

// O método ofStartSchedulePixPayment indica os campos que devem ser enviados e que serão retornados
efipay.ofStartSchedulePixPayment({}, body)
    .then((resposta) => {
        console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
    })
    .catch((error) => {
        console.log(error)
    })

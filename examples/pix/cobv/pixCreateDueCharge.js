const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

let body = {
	calendario: {
		dataDeVencimento: '2022-12-01',
		validadeAposVencimento: 30,
	},
	devedor: {
		logradouro: 'Alameda Souza, Numero 80, Bairro Braz',
		cidade: 'Recife',
		uf: 'PE',
		cep: '70011750',
		cpf: '12345678909',
		nome: 'Francisco da Silva',
	},
	valor: {
		original: '123.45',
		multa: {
			modalidade: 2,
			valorPerc: '15.00',
		},
		juros: {
			modalidade: 2,
			valorPerc: '2.00',
		},
		desconto: {
			modalidade: 1,
			descontoDataFixa: [
				{
					data: '2022 - 11 - 30',
					valorPerc: '30.00',
				},
			],
		},
	},
	chave: 'suaChavePix',
}

let params = {
	txid: 'dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVq111',
}

const efipay = new EfiPay(options)

// O método pixCreateDueCharge indica os campos que devem ser enviados e que serão retornados
efipay.pixCreateDueCharge(params, body)
	.then((resposta) => {
		console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
	})
	.catch((error) => {
		console.log(error)
	})

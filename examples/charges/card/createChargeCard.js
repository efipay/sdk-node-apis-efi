const EfiPay = require('sdk-node-apis-efi')
const options = require('../../credentials')

const paymentToken = '00000000000000000000000000000' // Insira aqui o payment_token obtido no front-end

const tdsInfo = {
    tds_identifier: '00000000-0000-0000-0000-000000000000', // Identificador da transação 3DS em formato UUID obtido no front-end
    challenge_callback_url: 'https://your-domain.com.br/payment-processing/', // URL para onde o cliente será redirecionado após o desafio 3DS
}

const body = {
    items: [
        {
            name: 'Product 1',
            amount: 1,
            value: 1000,
        },
        {
            name: 'Product 2',
            amount: 2,
            value: 2000,
        },
    ],
    installments: 1, // opcional
    shippings: [
        {
            name: 'Shipping to City',
            value: 1200,
        },
    ], // opcional
    metadata: {
        notification_url: 'https://webhook.site/00000000-0000-0000-0000-00000000',
    },
    customer: {
        name: 'Gorbadoc Oldbuck',
        cpf: '94271564656',
        phone_number: '5144916523',
        email: 'oldbuck@server.com.br',
    },
    discount: {
        type: 'currency',
        value: 599,
    }, // opcional
    billing_address: {
        street: 'Av JK',
        number: '909',
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG',
    }, // opcional
    message: 'This is a space\n of up to 80 characters\n to tell\n your client something',
    payment_token: paymentToken,
    tds_info: tdsInfo,
}

const efipay = new EfiPay(options)

efipay.createChargeCard({}, body)
    .then((resposta) => {
        console.log('Log de Retorno da API:')
        console.log(JSON.stringify(resposta, null, 2))

        // Handling the 3DS Challenge
        if (
            resposta.status === 'waiting' &&
            resposta.tdsChallenge
        ) {
            const { tdsChallenge } = resposta

            /**
             * =================================================================
             * OPTION A: Using htmlTemplate (Easier and faster)
             * =================================================================
             * O htmlTemplate já é um documento HTML completo com formulário
             * e script de auto-submit.
             *
             * Em uma aplicação web, você pode enviar esse HTML como resposta
             * para o navegador.
             */

            if (tdsChallenge.htmlTemplate) {
                console.log('HTML Template para redirecionamento 3DS:')
                console.log(tdsChallenge.htmlTemplate)

                // Exemplo em Express:
                // return res.send(tdsChallenge.htmlTemplate)
            }

            /**
             * =================================================================
             * OPTION B: Using formData (Full Frontend Control)
             * =================================================================
             * Dados estruturados para montar o formulário manualmente no front-end.
             */

            if (tdsChallenge.formData) {
                const { formData } = tdsChallenge

                console.log('Dados do formulário 3DS:')
                console.log({
                    method: formData.method,
                    actionUrl: formData.actionUrl,
                    creq: formData.creq,
                    threeDSSessionData: formData.threeDSSessionData,
                })

                // Exemplo de HTML que poderia ser renderizado no navegador:
                const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="UTF-8">
	<title>Autenticação 3D Secure</title>
	<style>
		body {
			font-family: sans-serif;
			background-color: #f4f4f9;
			padding: 20px;
		}

		.loader-container {
			max-width: 600px;
			margin: 50px auto;
			text-align: center;
			background: #fff;
			padding: 30px;
			border-radius: 8px;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}

		.btn-submit {
			background-color: #f37021;
			color: white;
			padding: 10px 20px;
			border: none;
			border-radius: 4px;
			font-size: 16px;
			cursor: pointer;
			margin-top: 20px;
		}
	</style>
</head>
<body>
	<div class="loader-container">
		<h3>Aguarde, redirecionando para o seu banco...</h3>
		<p>Se você não for redirecionado automaticamente em alguns segundos, clique no botão abaixo.</p>

		<form id="custom_tds_form" method="${formData.method}" action="${formData.actionUrl}">
			<input type="hidden" name="creq" value="${formData.creq}" />
			<input type="hidden" name="threeDSSessionData" value="${formData.threeDSSessionData}" />

			<noscript>
				<button type="submit" class="btn-submit">Clique aqui para continuar</button>
			</noscript>
		</form>
	</div>

	<script>
		window.onload = function () {
			document.getElementById('custom_tds_form').submit()
		}
	</script>
</body>
</html>
				`

                console.log('HTML gerado a partir do formData:')
                console.log(html)

                // Exemplo em Express:
                // return res.send(html)
            }
        }
    })
    .catch((error) => {
        console.log('Erro ao criar cobrança com cartão:')
        console.log(error)
    })
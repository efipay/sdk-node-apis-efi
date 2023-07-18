<h1 align="center">SDK Node.js para APIs Efí Pay</h1>

![Banner APIs Efí Pay](https://gnetbr.com/BJgSIUhlYs)


> Um módulo nodejs para integrar seu backend com os serviços de pagamento da [Efí](http://sejaefi.com.br).

## Instalação

```bash
$ npm install sdk-node-apis-efi
```

## Uso Básico

Importe o módulo:

```js
const EfiPay = require('sdk-node-apis-efi')
```

Insira suas credenciais e defina se deseja usar o sandbox ou não.
Você também pode usar o arquivo [examples/credentials.js](examples/credentials.js) de modelo.

```js
module.exports = {
	// PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: false,
	client_id: 'seuClientId',
	client_secret: 'seuClientSecret',
	certificate: 'caminho/Ate/O/Certificado/Pix',
}
```

Instancie o módulo passando as options:

```js
const efipay = new EfiPay(options)
```

Crie uma cobrança:

```js
let chargeInput = {
	items: [
		{
			name: 'Product A',
			value: 1000,
			amount: 2,
		},
	],
}

efipay.createCharge({}, chargeInput)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
```

## Exemplos

Para executar os exemplos, clone este repo e instale as dependências:

```bash
$ git clone git@github.com:efipay/sdk-node-apis-efi.git
$ cd sdk-node-apis-efi/examples
$ npm install
```

Defina suas credenciais em credentials.js:

```js
module.exports = {
	// PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: false,
	client_id: 'seuClientId',
	client_secret: 'seuClientSecret',
	certificate: 'caminhoAteOCertificadoPix',
}
```

Em seguida, execute o exemplo que você deseja:

```bash
$ node createCharge.js
```

## Documentação

A documentação completa com todos os endpoints disponíveis você encontra em: https://dev.sejaefi.com.br/.

## License

[MIT](LICENSE)
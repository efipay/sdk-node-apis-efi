# SDK Node para APIs Efí

SDK oficial para integração com as APIs de Cobranças, Pix, Open Finance, Pagamento de Contas, Abertura de Contas e Extratos da Efí.

## Requisitos

- Node.js 22 ou superior.
- Credenciais da aplicação Efí.
- Certificado para as APIs que usam mTLS.

## Instalação

```bash
npm install sdk-node-apis-efi
```

## Uso com TypeScript ou ESM

```ts
import EfiPay, {
  type PixCreateImmediateChargeBody,
  type SdkOptions,
} from 'sdk-node-apis-efi';

const options: SdkOptions = {
  sandbox: true,
  client_id: 'seu-client-id',
  client_secret: 'seu-client-secret',
  certificate: '/caminho/para/certificado.p12',
};

const efipay = new EfiPay(options);

const body: PixCreateImmediateChargeBody = {
  calendario: { expiracao: 3600 },
  valor: { original: '10.00' },
  chave: 'sua-chave-pix',
};

const cobranca = await efipay.pixCreateImmediateCharge(body);
```

A classe também pode ser importada pelo nome:

```ts
import { EfiPay } from 'sdk-node-apis-efi';
```

## Uso com CommonJS

```js
const EfiPay = require('sdk-node-apis-efi');

async function main() {
  const efipay = new EfiPay({
    sandbox: true,
    client_id: 'seu-client-id',
    client_secret: 'seu-client-secret',
    certificate: '/caminho/para/certificado.p12',
  });

  const cobranca = await efipay.pixCreateImmediateCharge({
    calendario: { expiracao: 3600 },
    valor: { original: '10.00' },
    chave: 'sua-chave-pix',
  });

  console.log(cobranca);
}

main().catch(console.error);
```

`const { EfiPay } = require('sdk-node-apis-efi')` também é suportado.

## Assinaturas dos métodos

As chamadas seguem uma convenção única:

| Endpoint | Assinatura |
| --- | --- |
| Sem params | `metodo(body, headers?)` |
| Sem body | `metodo(params, headers?)` |
| Com params e body | `metodo(params, body, headers?)` |
| Sem params e body | `metodo(headers?)` |

Chamadas da v1 que enviam `{}` como primeiro argumento continuam disponíveis nesta versão:

```ts
await efipay.pixCreateImmediateCharge({}, body); // legado
await efipay.pixCreateImmediateCharge(body);     // recomendado
```

Os overloads legados estão marcados com `@deprecated` nas declarações TypeScript e serão removidos em uma futura versão major. O SDK não emite avisos em runtime.

## Opções

| Opção | Descrição |
| --- | --- |
| `sandbox` | Seleciona homologação (`true`) ou produção (`false`). |
| `client_id` | Client ID da aplicação. |
| `client_secret` | Client secret da aplicação. |
| `certificate` | Caminho do P12/PEM ou certificado em base64. |
| `pemKey` | Caminho ou conteúdo base64 da chave do certificado PEM. |
| `cert_base64` | Indica que certificado e chave foram fornecidos em base64. |
| `partner_token` | Token de parceiro, quando aplicável. |
| `validateMtls` | Use `false` somente ao configurar webhooks sem validação mTLS. |
| `cache` | Controla o cache de tokens OAuth; padrão `true`. |
| `idempotencyKey` | Chave global de idempotência para Open Finance. |

## Tipos e schemas

Todos os tipos e schemas Zod públicos são exportados pela raiz do pacote:

```ts
import {
  PixCreateImmediateChargeBodySchema,
  type PixCreateImmediateChargeBody,
} from 'sdk-node-apis-efi';
```

Os schemas usam Zod 4. O SDK não valida requests automaticamente em runtime; aplicações podem usar os schemas exportados quando desejarem validação local.

Cada método possui um tipo de resposta específico, também importável pela raiz, como `CreateChargeResponse` e `DetailCarnetResponse`.

## Erros

Falhas retornadas pelas APIs são rejeitadas preservando o payload de erro da Efí. Erros locais de configuração, certificado ou resolução de rota são instâncias de `Error`.

## Exemplos

O repositório contém exemplos equivalentes em TypeScript (`examples/ts`) e CommonJS (`examples/cjs`). Eles não fazem parte do tarball publicado no NPM.

## Migração e mudanças

Consulte [MIGRATION.md](./MIGRATION.md) para migrar da v1 e [CHANGELOG.md](./CHANGELOG.md) para o histórico da versão.

## Desenvolvimento

```bash
npm test
npm run test:package
```

`npm test` executa build, typecheck, auditoria da API pública, testes de transporte, examples e smoke tests CJS/ESM. `npm run test:package` instala o tarball em um projeto temporário e valida CJS, ESM e TypeScript.

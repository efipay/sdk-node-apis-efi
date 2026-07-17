# Migração para v2

A v2 é uma nova versão major do pacote `sdk-node-apis-efi`. Ela mantém os nomes públicos dos métodos atuais, mas substitui a geração dinâmica/JSDoc por uma classe TypeScript explícita e contratos Zod exportáveis.

## Requisitos e imports

- Node.js 22 ou superior.
- A classe pública é `EfiPay`.
- CJS, ESM e declarações TypeScript são publicados pelo mesmo entrypoint.

```ts
import EfiPay, { type SdkOptions } from 'sdk-node-apis-efi';
```

```js
const EfiPay = require('sdk-node-apis-efi');
```

## Assinaturas modernas

Na v1, métodos sem parâmetros de rota ou query normalmente recebiam um objeto vazio antes do body. A v2 aceita a chamada antiga, mas destaca esse overload como depreciado no TypeScript e no IntelliSense.

```ts
// v1, ainda compatível na v2
await efipay.pixCreateImmediateCharge({}, body, headers);

// v2
await efipay.pixCreateImmediateCharge(body, headers);
```

Para endpoints sem params e sem body:

```ts
// v1, depreciado
await efipay.pixCreateEvp({}, headers);

// v2
await efipay.pixCreateEvp(headers);
```

Os overloads antigos serão removidos em uma futura versão major. Não há aviso em runtime.

## Contratos mais estritos

Requests agora usam tipos específicos por método. Isso pode revelar chamadas que a v1 aceitava no TypeScript, mas que não representavam o contrato da API.

Principais ajustes:

- Corpos e params documentados são fechados e rejeitam campos desconhecidos no tipo.
- `banking_billet` e `credit_card` são alternativas exclusivas onde a API exige apenas um deles.
- `createChargeCard` exige `tds_info`; `installments` e `amount` permanecem opcionais.
- IDs de Pagamento de Contas usam os escalares documentados e consultas exigem períodos completos.
- Filtros, recorrências, devoluções e substituições de Open Finance foram alinhados à documentação.
- Respostas documentadas agora exigem seus campos-base e discriminam status e modalidades quando o payload varia.
- `idPagamento` é sempre `string`, inclusive nas respostas de Pagamento de Contas.
- Params de path não são repetidos na query string.

Zod não é executado automaticamente nas chamadas. Os schemas podem ser importados para validação explícita:

```ts
import { PixCreateImmediateChargeBodySchema } from 'sdk-node-apis-efi';

const body = PixCreateImmediateChargeBodySchema.parse(input);
```

## Opções removidas

Aliases e parâmetros já depreciados na v1 não fazem parte de `SdkOptions`, incluindo `pix_cert`. Use `certificate` e, para PEM, `pemKey`.

Também não foram reintroduzidos aliases de métodos ou endpoints como `pixListWebhooks`, `pixDeleteLocation`, `oneStepSubscription`, `oneStepSubscriptionLink` e `linkCharge`. Use os nomes canônicos exportados por `EfiPay`.

## Transporte

- Tokens OAuth são armazenados por API e autenticações concorrentes são deduplicadas.
- `x-idempotency-key` é aplicado somente a Open Finance: header da chamada, opção global e chave automática, nessa ordem.
- APIs mTLS falham antes da autenticação quando não há certificado.
- `validateMtls: false` envia o bypass somente na configuração de webhooks.
- Comprovantes Pix são retornados como `Buffer`.

## Examples

Os examples do repositório usam somente as assinaturas modernas. Eles permanecem fora do pacote publicado.

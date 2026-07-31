# Changelog

Todas as mudanças relevantes deste projeto serão registradas neste arquivo.

## [2.0.1] - 2026-07-31

### Corrigido

- O campo `recebedor` da resposta de `pixQrCodeDetail` agora é opcional, acompanhando o contrato retornado pelo Pix Copia e Cola.

## [2.0.0] - 2026-07-15

### Adicionado

- Build e exports para CommonJS, ESM e declarações TypeScript.
- Classe pública estática `EfiPay` e exportação de tipos/schemas pela raiz.
- Schemas Zod 4 específicos para requests e respostas documentadas.
- Respostas específicas para todos os métodos da API de Cobranças.
- Cache OAuth por API com deduplicação de autenticações concorrentes.
- Examples equivalentes em TypeScript e CommonJS.
- Testes de transporte, tipos, API pública, examples e instalação do tarball.

### Alterado

- Assinaturas sem params agora recebem `body` como primeiro argumento.
- Assinaturas sem params e body agora recebem apenas `headers` opcional.
- Chamadas antigas com params vazios permanecem como overloads `@deprecated`.
- Rotas, verbos, params, mTLS e idempotência foram alinhados à documentação técnica.
- Respostas de Cobranças, Pix, Open Finance e Pagamento de Contas agora discriminam status e modalidades documentados.
- IDs de Pagamento de Contas são tipados exclusivamente como `string`.
- O retorno de comprovantes Pix declara explicitamente o tipo Node.js `Buffer`.
- O requisito mínimo passou a Node.js 22, com CI em Node.js 22 e 24.

### Removido

- Geração de tipagens por JSDoc e atribuição dinâmica de métodos.
- Parâmetros e aliases já depreciados na v1, incluindo `pix_cert`.
- Aliases não canônicos de métodos e endpoints.

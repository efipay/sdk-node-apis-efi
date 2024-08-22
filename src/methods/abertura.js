// @ts-nocheck
import { PagamentoDeContasMethods } from "./pagamento-de-contas";

export class OpenAccountMethods extends PagamentoDeContasMethods {
    /**
     * **POST /v1/conta-simplificada**
     * 
     * Cria uma conta simplificada para um cliente final.
     * 
     *  Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{}} params
     * @param { {
     *   clienteFinal: {
     *     cpf: string,
     *     nomeCompleto: string,
     *     dataNascimento: string,
     *     nomeMae?: string,
     *     celular: string,
     *     email: string,
     *     cnpj?: string,
     *     razaoSocial?: string,
     *     endereco: {
     *       cep: string,
     *       estado: 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO',
     *       cidade: string,
     *       bairro: string,
     *       logradouro: string,
     *       numero: string,
     *       complemento?: string
     *     }
     *   },
     *   meioDeNotificacao: Array<'sms' | 'whatsapp'>,
     *   escoposIntegrados: Array<string>
     * } } body
     * 
     * @returns {Promise<{
     *   contaSimplificada:{
     *      identificador:string
     * }
     *   id: string,
     *   status: string
     * }>}
     */
    createAccount(params, body) { }

    /**
     * **GET /v1/conta-simplificada/:idContaSimplificada/credenciais**
     * 
     * Retorna as credenciais de uma conta simplificada específica.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { idContaSimplificada: string } } params 
     * 
     * @returns {Promise<{
     *   clientId: string,
     *   clientSecret: string,
     *   conta: {
     *     numero: string,
     *     payeeCode: string
     *   },
     *   escopos: string[],
     *   ativo: boolean
     * }>}
     */
    getAccountCredentials(params) { }

    /**
     * **POST /v1/conta-simplificada/:idContaSimplificada/certificado**
     * 
     * Cria o certificado para integrar à uma conta simplificada.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { idContaSimplificada: string } } params 
     * 
     * @returns {Promise<{
     *   certificado: string
     * }>}
     */
    createAccountCertificate(params) { }

    /**
     * **POST /v1/webhook**
     * 
     * Registra um novo webhook para receber notificações de eventos.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{}} params
     * @param { {
     *   webhookUrl?: string,
     *   url?: string,
     *   chave?: string
     * } } body
     * 
     * @returns {Promise<{
     *   identificadorWebhook: string
     * }>}
     */
    accountConfigWebhook(params, body) { }

    /**
     * **GET /v1/webhook/:identificadorWebhook**
     * 
     * Obtém as informações de um webhook registrado.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { identificadorWebhook: string } } params
     * 
     * @returns {Promise<{
     *   webhookUrl: string,
     *   identificadorWebhook: string,
     *   criacao: string
     * }>}
     */
    accountDetailWebhook(params) { }

    /**
     * **GET /v1/webhooks**
     * 
     * Lista os webhooks registrados.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *   inicio: string,
     *   fim: string
     * } } params
     * 
     * @returns {Promise<{
     *   parametros: {
     *     inicio: string,
     *     fim: string,
     *     paginacao: {
     *       paginaAtual: number,
     *       itensPorPagina: number,
     *       quantidadeDePaginas: number,
     *       quantidadeTotalDeItens: number
     *     }
     *   },
     *   webhooks: Array<{
     *     webhookUrl: string,
     *     identificadorWebhook: string,
     *     criacao: string
     *   }>
     * }>}
     */
    accountListWebhook(params) { }

    /**
     * **DELETE /v1/webhook/:identificadorWebhook**
     * 
     * Remove um webhook específico.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { identificadorWebhook: string } } params
     * 
     * @returns {Promise<{ void }>}
     */
    accountDeleteWebhook(params) { }

}
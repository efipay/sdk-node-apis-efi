export class ExtratosMethods {
    /**
     * **GET /v1/extrato-cnab/arquivos**
     *
     * Consultar arquivos gerados
     *
     * Este endpoint é utilizado para consultar os arquivos CNAB gerados e associados a uma conta específica.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `mensagem`.
     *
     * @returns { Promise <{
     *  Array<{
     *      data_geracao: string,
     *      nome: string
     *  }>
     * }>}
     */
    listStatementFiles(): Promise<{
        Array();
    }>;
    /**
     * **GET /v1/extrato-cnab/download/:nome_arquivo**
     *
     * Solicitar Download do extrato
     *
     * Este endpoint é utilizado para Endpoint para solicitar download do extrato.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `mensagem`.
     *
     * @param { { nome_arquivo: string } } params
     *
     * @returns { Promise<string> }
     */
    getStatementFile(params: {
        nome_arquivo: string;
    }): Promise<string>;
    /**
     * **GET /v1/extrato-cnab/agendamentos**
     *
     * Consultar recorrências cadastradas
     *
     * Este endpoint é utilizado para consultar os agendamentos de recorrências cadastradas em uma conta específica.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `mensagem`.
     *
     * @returns { Promise<{
     *  Array<{
     *      status: string,
     *      periodicidade: string,
     *      envia_email: boolean,
     *      comprimir_arquivos: boolean,
     *      data_criacao: string
     *  }>
     * }>}
     *
     */
    listStatementRecurrences(): Promise<{
        Array();
    }>;
    /**
     * **POST /v1/extrato-cnab/agendar**
     *
     * Criar recorrência
     *
     * Este endpoint é utilizado para criar uma nova recorrência.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `mensagem`.
     *
     * @param { {} } params
     * @param { {
     *  periodicidade: string,
     *  enviar_email: boolean,
     *  comprimir_arquivos: boolean
     * } } body
     *
     * @returns { Promise<void> }
     */
    createStatementRecurrency(params: {}, body: {
        periodicidade: string;
        enviar_email: boolean;
        comprimir_arquivos: boolean;
    }): Promise<void>;
    /**
     * **PATCH /v1/extrato-cnab/agendar/:identificador**
     *
     * Revisar recorrência
     *
     * Este endpoint é utilizado para atualizar ou modificar uma recorrência existente a partir do identificador.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `mensagem`.
     *
     * @param { { identificador: string } } params
     * @param {{
     *      periodicidade: string,
     *      status: string,
     *      envia_email: boolean,
     *      comprimir_arquivos: boolean,
     * }} body
     *
     * @returns { Promise<void> }
     */
    updateStatementRecurrency(params: {
        identificador: string;
    }, body: {
        periodicidade: string;
        status: string;
        envia_email: boolean;
        comprimir_arquivos: boolean;
    }): Promise<void>;
    /**
     * **POST /v1/extrato-cnab/gerar-chaves**
     *
     * Gerar chave
     *
     * Este endpoint é utilizado para gerar uma chave associada a uma conta específica.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `mensagem`.
     *
     * @returns { Promise<{
     *  privateKey: string
     * }>}
     */
    createSftpKey(): Promise<{
        privateKey: string;
    }>;
}

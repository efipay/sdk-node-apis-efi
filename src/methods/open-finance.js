// @ts-nocheck
import { PixMethods } from "./pix";

export class OpenFinanceMethods extends PixMethods {

    /**
     * **GET /v1/config**
     * 
     * Retornar as configurações da aplicação
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @returns { Promise<{
     *  redirectURL: string,
     *  webhookURL: string,
     *  webhookSecurity: {
     *      type: 'mtls' | 'hmac',
     *  },
     * }> }
     */
    ofConfigDetail() { }

    /**
     * **PUT /v1/config**
     * 
     * Configurar URLs da aplicação
     * 
     * Se webhookSecurity não for informado, assumirá o valor 'mtls'.
     * 
     * Se processPayment não for informado, assumirá o valor 'sync'
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {} } params 
     * @param { {
     *  redirectURL: string,
     *  webhookURL: string,
     *  webhookSecurity?: {
     *      type: 'mtls' | 'hmac',
     *      hash?: string
     *  },
     *  processPayment?: 'async' | 'sync'
     * } } body 
     * 
     * @returns { Promise<{
     *  redirectURL: string,
     *  webhookURL: string,
     *  webhookSecurity: {
     *      type: 'mtls' | 'hmac',
     *      hash?: string,
     *  }
     * }> }
     */
    ofConfigUpdate(params, body) { }

    /**
     * **GET /v1/participantes**
     * 
     * Recuperar as instituições participantes do Open Finance
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { 
     *  nome?: string,
     *  organizacao?: boolean,
     *  modalidade?: 'imediato' | 'recorrente' | 'agendado',
     *  tipoPessoa?: 'PJ' | 'PF'
     *  } } params 
     * 
     * @returns { Promise<{
     *  participantes: Array<{
     *      identificador: string,
     *      nome: string,
     *      descricao: string,
     *      portal: string,
     *      logo: string,
     *      organizacoes: Array<{
     *          nome: string,
     *          cnpj: string,
     *          status: string
     *      }>
     *  }>
     * >} }
     */
    ofListParticipants(params) { }

    /**
     * **GET /v1/pagamentos/pix**
     * 
     * Listar pagamentos por um determinado período
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *  inicio: string,
     *  fim: string,
     *  quantidade?: string,
     *  pagina?: string,
     *  status?: string,
     *  identificador?: string,
     * } } params 
     * 
     * @returns { Promise<{
     *  pagamentos: Array<{
     *      identificadorPagamento: string,
     *      endToEndId?: string,
     *      valor?: string,
     *      status: string,
     *      dataCriacao: string,
     *      devolucoes?: Array<{
     *          identificadorDevolucao: string,
     *          valor: string,
     *          status: string,
     *          dataCriacao: string   
     *      }>,
     *      idProprio?: string,
     *   }>,
     *  total: string,
     *  porPagina: string,
     *  ultimo: string,
     *  proximo: string | null,
     *  anterior: string | null,
     *  atual: string
     * }>}
     */
    ofListPixPayment(params) { }

    /**
     * **POST /v1/pagamentos/pix**
     * 
     * Solicitar iniciação de Pix via Open Finance
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {} } params 
     * @param { {
     *  pagador: {
     *      idParticipante: string,
     *      cpf: string,
     *      cnpj?: string, 
     *  },
     *  favorecido: {
     *      contaBanco: {
     *          codigoBanco: string,
     *          agencia: string,
     *          documento: string,
     *          nome: string,
     *          tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN'
     *      }
     *  },
     *  detalhes: {
     *      valor: string,
     *      idProprio?: string,
     *      infoPagador?: string,
     *      dataAgendamento?: string,
     *      codigoCidadeIBGE?: string,
     *  }
     * 
     *  }} body 
     * 
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  redirectURI: string,
     * }> }
     */
    ofStartPixPayment(params, body) { }

    /**
     * **POST /v1/pagamentos/pix/:identificadorPagamento/devolver**
     * 
     * Efetuar uma devolução de um pagamento
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *  identificadorPagamento: string
     * }} params 
     * @param {{
     *  valor: string
     * }} body 
     * 
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  valorDevolucao: string,
     *  dataCriacao: string,
     *  status: string,
     * }>}
     */
    ofDevolutionPix(params, body) { }

    /**
     * **POST /v1/pagamentos-agendados/pix**
     * 
     * Solicitar iniciação de Pix Agendado via Open Finance
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{}} params 
     * @param { {
     *  pagador: {
     *      idParticipante: string,
     *      cpf: string,
     *      cnpj?: string, 
     *  },
     *  favorecido: {
     *      contaBanco: {
     *          codigoBanco: string,
     *          agencia: string,
     *          documento: string,
     *          nome: string,
     *          tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN'
     *      }
     *  },
     *  pagamento: {
     *     valor: string,
     *     codigoCidadeIBGE?: string,
     *     infoPagador?: string,
     *     idProprio?: string,
     *     dataAgendamento: string,
     *  }
     * }} body 
     * 
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  redirectURI: string,
     *  }>}
     */
    ofStartSchedulePixPayment(params, body) { }

    /**
     * **GET /v1/pagamentos-agendados/pix**
     * 
     * Listar pagamentos agendados por um determinado período
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{
     *  inicio: string,
     *  fim: string,
     *  quantidade?: string,
     *  pagina?: string,
     *  status?: string,
     *  identificador?: string,
     * }} params 
     * 
     * @returns { Promise<{
     *  pagamentos: Array<{
     *      identificadorPagamento: string,
     *      endToEndId?: string,
     *      valor?: string,
     *      status: string,
     *      dataOperacao: string,
     *      dataCriacao: string,
     *      idProprio: string,
     *      devolucoes: Array<{
     *         identificadorDevolucao: string,
     *          valor: string,
     *          status: string,
     *          dataCriacao: string
     *      }>  
     *  }>
     *  total: number,
     *  porPagina: number,
     *  ultimo: string,
     *  proximo: string | null,
     *  anterior: string | null,
     *  atual: string
     * }>}
     */
    ofListSchedulePixPayment(params) { }

    /**
     * **PATCH /v1/pagamentos-agendados/pix/:identificadorPagamento/cancelar**
     * 
     * Cancelar um pagamento agendado
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *  identificadorPagamento: string
     * }} params 
     * 
     * @returns { Promise<{
     *  pagamentos: {
     *    identificadorPagamento: string,
     *    status: string,
     *    dataCancelamento: string,
     *  }
     * }> }
     */
    ofCancelSchedulePix(params) { }

    /**
     * **POST /v1/pagamentos-agendados/pix/:identificadorPagamento/devolver**
     * 
     * Efetuar uma devolução de um pagamento agendado
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{ identificadorPagamento: string }} params 
     * @param {{ valor: string }} body 
     * 
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  endToEndId: string,
     *  valor: string,
     *  dataCriacao: string,
     *  status: string,
     * }>}
     */
    ofDevolutionSchedulePix(params, body) { }

    /**
     * **POST /v1/pagamentos-recorrentes/pix**
     * 
     * Solicitar iniciação de Pix Recorrente via Open Finance
     * 
     * Obs: A recorrência do pagamento é configurada no campo `recorrencia` do body.
     * 
     *  - Para o tipo de recorrência `diaria` é necessário informar a `dataInicio` e a `quantidade`.
     *  - Para o tipo de recorrência `semanal` é necessário informar a `dataInicio`, a `quantidade` e o `diaDaSemana`.
     *  - Para o tipo de recorrência `mensal` é necessário informar a `dataInicio`, a `quantidade` e o `diaDoMes`.
     *  - Para o tipo de recorrência `personalizada` é necessário informar as `datas`.
     * 
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{}} params 
     * @param { {
     *  pagador: {
     *      idParticipante: string,
     *      cpf: string,
     *      cnpj?: string, 
     *  },
     *  favorecido: {
     *      contaBanco: {
     *          codigoBanco: string,
     *          agencia: string,
     *          documento: string,
     *          nome: string,
     *          tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN'
     *      }
     *  },
     *  pagamento: {
     *     valor: string,
     *     codigoCidadeIBGE?: string,
     *     infoPagador?: string,
     *     idProprio?: string,
     *     recorrencia: {
     *      tipo: 'diaria' | 'semanal' | 'mensal' | 'personalizada',
     *      dataInicio?: string,
     *      quantidade?: number,
     *      diaDaSemana?: string,
     *      diaDoMes?: number,
     *      datas?: Array<string>
     *      descricao?: string,
     *    }
     *  }
     * }} body 
     * 
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  redirectURI: string,
     *  }>}
     */
    ofStartRecurrencyPixPayment(params, body) { }

    /**
     * **GET /v1/pagamentos-recorrentes/pix**
     * 
     * Listar pagamentos recorrentes por um determinado período
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{
     *  inicio: string,
     *  fim: string,
     *  quantidade?: string,
     *  pagina?: string,
     *  status?: string,
     *  identificador?: string,
     * }} params 
     * 
     * @returns { Promise<{
     *  pagamentos: Array<{
     *      identificadorPagamento: string,
     *      valor: string,
     *      status: string,
     *      dataCriacao: string,
     *      idProprio: string,
     *      recorrencia: Array<{
     *          endToEndId: string,
     *          dataOperacao: string,
     *          status: string,
     *          devolucoes: Array<{
     *              identificadorDevolucao: string,
     *              valor: string,
     *              status: string,
     *              dataCriacao: string
     *          }>       
     *      }>
     *  }>
     *  total: number,
     *  porPagina: number,
     *  ultimo: string,
     *  proximo: string | null,
     *  anterior: string | null,
     *  atual: string
     * }>}
     */
    ofListRecurrencyPixPayment(params) { }

    /**
     * **PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar**
     * 
     * Cancelar um pagamento recorrente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *  identificadorPagamento: string
     * }} params 
     * 
     * @returns { Promise<{
     *  pagamentos: {
     *    identificadorPagamento: string,
     *    status: string,
     *    dataCancelamento: string,
     *  }
     * }> }
     */
    ofCancelRecurrencyPix(params) { }

    /**
     * **POST /v1/pagamentos-recorrentes/pix/:identificadorPagamento/devolver**
     * 
     * Efetuar uma devolução de um pagamento recorrente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param {{ identificadorPagamento: string }} params 
     * @param {Array<{
     *  endToEndId: string, 
     *  valor: string 
     * }>} body 
     * 
     * @returns { Promise<Array<{
     *  identificadorPagamento: string,
     *  endToEndId: string,
     *  valor: string,
     *  dataCriacao: string,
     *  status: string,
     * }>>}
     */
    ofDevolutionRecurrencyPix(params, body) { }
}



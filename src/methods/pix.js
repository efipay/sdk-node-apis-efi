// @ts-nocheck
import { CobrancasMethods } from "./cobrancas";

export class PixMethods extends CobrancasMethods {



    /**
     * **POST /v2/cob**
     * 
     * Cria uma cobrança imediata (sem txid)
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {} } params
     * @param { {
     *   calendario: {
     *     expiracao: number
     *   },
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   loc?: {
     *     id: number
     *   },
     *   infoAdicionais?: Array<{
     *     nome: string,
     *     valor: string
     *   }>
     * } } body
     * 
     * @returns {Promise<{
     *   calendario: {
     *     criacao: string,
     *     expiracao: number
     *   },
     *   txid: string,
     *   revisao: number,
     *   loc: {
     *     id: number,
     *     location: string,
     *     tipoCob: string
     *   },
     *   location: string,
     *   status: string,
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   pixCopiaECola: string
     * }>}
     */
    pixCreateImmediateCharge(params, body) { }


    /**
     * **PUT /v2/cob/:txid**
     * 
     * Cria uma cobrança imediata (com txid)
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.`
     *
     * @param { { txid: string } } params 
     * @param { {
     *   calendario: {
     *     expiracao: number
     *   },
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   loc?: {
     *     id: number
     *   },
     *   infoAdicionais?: Array<{
     *     nome: string,
     *     valor: string
     *   }>
     * } } body
     * 
     * @returns {Promise<{
     *   calendario: {
     *     criacao: string,
     *     expiracao: number
     *   },
     *   txid: string,
     *   revisao: number,
     *   loc: {
     *     id: number,
     *     location: string,
     *     tipoCob: string
     *   },
     *   location: string,
     *   status: string,
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   pixCopiaECola: string
     * }>}
     */
    pixCreateCharge(params, body) { }

    /**
     * PATCH /v2/cob/:txid
     * 
     * Revisar cobrança. Apenas os campos fornecidos serão atualizados.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * @param { { txid: string } } params
     * @param { {
     *   calendario?: {
     *     expiracao: number
     *   },
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor?: {
     *     original: string
     *   },
     *   chave?: string,
     *   solicitacaoPagador?: string,
     *   loc?: {
     *     id: number
     *   },
     *   infoAdicionais?: Array<{
     *     nome: string,
     *     valor: string
     *   }>
     * } } body
     * 
     * @returns {Promise<{
     *   status: string,
     *   calendario: {
     *     criacao: string,
     *     expiracao: number
     *   },
     *   location: string,
     *   txid: string,
     *   revisao: number,
     *   devedor: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador: string | null,
     *   pixCopiaECola: string
     * }>}
     */
    pixUpdateCharge(params, body) { }

    /**
     * GET /v2/cob/:txid
     * 
     * Recupera informações de uma cobrança existente baseada no txid.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { txid: string, revisao?: number } } params
     * 
     * @returns {Promise<{
     *   status: string,
     *   calendario: {
     *     criacao: string,
     *     expiracao: string
     *   },
     *   location: string,
     *   txid: string,
     *   revisao: number,
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   pixCopiaECola?: string,
     *   pix?: Array<{
     *     endToEndId: string,
     *     txid: string,
     *     valor: string,
     *     horario: string,
     *     infoPagador?: string,
     *     devolucoes?: Array<{
     *       id: string,
     *       rtrId: string,
     *       valor: string,
     *       horario: {
     *         solicitacao: string
     *       },
     *       status: string
     *     }>
     *   }>
     * }
     * >}
     */
    pixDetailCharge(params) { }

    /**
     * **GET /v2/cob**
     * 
     * Recupera uma lista de cobranças Pix dentro de um intervalo de tempo especificado.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *   inicio: string,
     *   fim: string,
     *   cpf?:string,
     *   cnpj?:string,
     *   status?:string
     *   }
     * }params
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
     *   cobs: Array<{
     *     status: string,
     *     calendario: {
     *       criacao: string,
     *       expiracao: string
     *     },
     *     location: string,
     *     txid: string,
     *     revisao: number,
     *     devedor?: {
     *       cpf?: string,
     *       cnpj?: string,
     *       nome: string
     *     },
     *     valor: {
     *       original: string
     *     },
     *     chave: string,
     *     solicitacaoPagador?: string,
     *     pixCopiaECola?: string,
     *     pix?: Array<{
     *       endToEndId: string,
     *       txid: string,
     *       valor: string,
     *       horario: string,
     *       pagador?: {
     *         cpf?: string,
     *         cnpj?: string,
     *         nome: string
     *       },
     *       infoPagador?: string,
     *       devolucoes?: Array<{
     *         id: string,
     *         rtrId: string,
     *         valor: string,
     *         horario: {
     *           solicitacao: string
     *         },
     *         status: string
     *       }>
     *     }>
     *   }>
     * }>}
     */
    pixListCharges(params) { }

    /**
     * **PUT /v2/cobv/:txid**
     * 
     * Cria uma cobrança com vencimento (CobV).
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * - `multa.modalide`: 
     *      - **1 para valor fixo;**
     *      - **2 para valor em percentual;**
     * 
     * - `juros.modalide`:
     *      - **1 Valor (dias corridos);**
     *      - **2 Percentual ao dia (dias corridos);**
     *      - **3 Percentual ao mês (dias corridos);**
     *      - **4 Percentual ao ano (dias corridos);**
     *      - **5 Valor (dias úteis);**
     *      - **6 Percentual ao dia (dias úteis) ;**
     *      - **7 Percentual ao mês (dias úteis);**
     *      - **8 Percentual ao ano (dias úteis);**
     * 
     * - `abatimento.modalidade:`
     *      - **1 para valor fixo;**
     *      - **2 para valor em percentual;**
     * 
     * 
     * - `desconto.modalide`:
     *      - **1 Valor Fixo até a[s] data[s] informada[s];**
     *      - **2 Percentual até a data informada;**
     *      - **3 Valor por antecipação dia corrido;**
     *      - **4 Valor por antecipação dia útil;**
     *      - **5 Percentual por antecipação dia corrido;**
     *      - **6 Percentual por antecipação dia útil;**
     * @param { { txid: string } } params - Parâmetros da rota
     * @param { {
     *   calendario: {
     *     dataDeVencimento: string,
     *     validadeAposVencimento?: number
     *   },
     *   devedor: {
     *     logradouro: string,
     *     cidade: string,
     *     uf: string,
     *     cep: string,
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string,
     *     multa?: {
     *       modalidade: number,
     *       valorPerc: string
     *     },
     *     juros?: {
     *       modalidade: number,
     *       valorPerc: string
     *     },
     *     desconto?: {
     *       modalidade: number,
     *       descontoDataFixa?: Array<{
     *         data: string,
     *         valorPerc: string
     *       }>
     *     },
     *     abatimento?: {
     *       modalidade: number,
     *       valorPerc: string
     *     }
     *   },
     *   loc?: {
     *     id: number
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string
     * } } body - Dados da requisição
     * 
     * @returns {Promise<{
     *   calendario: {
     *     dataDeVencimento: string,
     *     validadeAposVencimento: number
     *   },
     *   devedor: {
     *     logradouro: string,
     *     cidade: string,
     *     uf: string,
     *     cep: string,
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string,
     *     multa?: {
     *       modalidade: number,
     *       valorPerc: string
     *     },
     *     juros?: {
     *       modalidade: number,
     *       valorPerc: string
     *     },
     *     desconto?: {
     *       modalidade: number,
     *       descontoDataFixa?: Array<{
     *         data: string,
     *         valorPerc: string
     *       }>
     *     }
     *   },
     *   loc?: {
     *     id: number
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string
     * }>}
     */
    pixCreateDueCharge(params, body) { }

    /**
     * **PATCH /v2/cobv/:txid**
     * 
     * Revisar cobrança com vencimento (CobV). Apenas os campos fornecidos serão atualizados.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * - `multa.modalide`: 
     *      - **1 para valor fixo;**
     *      - **2 para valor em percentual;**
     * 
     * - `juros.modalide`:
     *      - **1 Valor (dias corridos);**
     *      - **2 Percentual ao dia (dias corridos);**
     *      - **3 Percentual ao mês (dias corridos);**
     *      - **4 Percentual ao ano (dias corridos);**
     *      - **5 Valor (dias úteis);**
     *      - **6 Percentual ao dia (dias úteis) ;**
     *      - **7 Percentual ao mês (dias úteis);**
     *      - **8 Percentual ao ano (dias úteis);**
     * 
     * - `abatimento.modalidade:`
     *      - **1 para valor fixo;**
     *      - **2 para valor em percentual;**
     * 
     * 
     * - `desconto.modalide`:
     *      - **1 Valor Fixo até a[s] data[s] informada[s];**
     *      - **2 Percentual até a data informada;**
     *      - **3 Valor por antecipação dia corrido;**
     *      - **4 Valor por antecipação dia útil;**
     *      - **5 Percentual por antecipação dia corrido;**
     *      - **6 Percentual por antecipação dia útil;**
     * @param { { txid: string } } params 
     * @param { {
     *   calendario?: {
     *     dataDeVencimento?: string,
     *     validadeAposVencimento?: number
     *   },
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome?: string,
     *     logradouro?: string,
     *     cidade?: string,
     *     uf?: string,
     *     cep?: string
     *   },
     *   valor?: {
     *     original?: string,
     *     multa?: {
     *       modalidade?: number,
     *       valorPerc?: string
     *     },
     *     juros?: {
     *       modalidade?: number,
     *       valorPerc?: string
     *     },
     *     desconto?: {
     *       modalidade?: number,
     *       descontoDataFixa?: Array<{
     *         data?: string,
     *         valorPerc?: string
     *       }>
     *     }
     *   },
     *   chave?: string,
     *   solicitacaoPagador?: string,
     *   loc?: {
     *     id?: number
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   status: string,
     *   calendario: {
     *     dataDeVencimento: string,
     *     validadeAposVencimento?: number
     *   },
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string,
     *     logradouro?: string,
     *     cidade?: string,
     *     uf?: string,
     *     cep?: string
     *   },
     *   valor: {
     *     original: string,
     *     multa?: {
     *       modalidade: number,
     *       valorPerc: string
     *     },
     *     juros?: {
     *       modalidade: number,
     *       valorPerc: string
     *     },
     *     desconto?: {
     *       modalidade: number,
     *       descontoDataFixa?: Array<{
     *         data: string,
     *         valorPerc: string
     *       }>
     *     }
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   loc?: {
     *     id: number
     *   }
     * }>}
     */
    pixUpdateDueCharge(params, body) { }

    /**
     * **GET /v2/cobv/:txid**
     * 
     * Obtém os detalhes de uma cobrança com vencimento (CobV) existente.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string } } params 
     * 
     * @returns {Promise<{
     *   calendario: {
     *     criacao: string,
     *     dataDeVencimento: string,
     *     validadeAposVencimento?: number
     *   },
     *   txid: string,
     *   revisao: number,
     *   loc: {
     *     id: number,
     *     location: string,
     *     tipoCob: string
     *   },
     *   status: string,
     *   devedor: {
     *     logradouro: string,
     *     cidade: string,
     *     uf: string,
     *     cep: string,
     *     cpf: string,
     *     nome: string
     *   },
     *   recebedor: {
     *     logradouro: string,
     *     cidade: string,
     *     uf: string,
     *     cep: string,
     *     cnpj: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   pixCopiaECola: string
     * }>}
     */
    pixDetailDueCharge(params) { }

    /**
     * **GET /v2/cobv**
     * 
     * Obtém uma lista de cobranças com vencimento (CobV).
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
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
     *   cobs: Array<{
     *     calendario: {
     *       criacao: string,
     *       dataDeVencimento: string,
     *       validadeAposVencimento: number
     *     },
     *     txid: string,
     *     revisao: number,
     *     status: string,
     *     devedor: {
     *       nome: string,
     *       cpf?: string,
     *       cnpj?: string,
     *       logradouro?: string,
     *       cidade?: string,
     *       uf?: string,
     *       cep?: string
     *     },
     *     recebedor: {
     *       logradouro?: string,
     *       cidade?: string,
     *       uf?: string,
     *       cep?: string,
     *       cnpj?: string,
     *       nome?: string
     *     },
     *     valor: {
     *       original: string,
     *       juros?: {
     *         modalidade: number,
     *         valorPerc: string
     *       },
     *       multa?: {
     *         modalidade: number,
     *         valorPerc: string
     *       },
     *       desconto?: {
     *         modalidade: number,
     *         descontoDataFixa?: Array<{
     *           data: string,
     *           valorPerc: string
     *         }>,
     *         valorPerc?: string
     *       },
     *       abatimento?: {
     *         modalidade: number,
     *         valorPerc: string
     *       }
     *     },
     *     chave: string,
     *     solicitacaoPagador?: string,
     *     infoAdicionais?: Array<{
     *       nome: string,
     *       valor: string
     *     }>,
     *     loc: {
     *       id: number,
     *       location: string,
     *       tipoCob: string,
     *       criacao: string
     *     },
     *     pixCopiaECola: string
     *   }>
     * }>}
     */
    pixListDueCharges(params) { }

    /**
     * **PUT /v3/gn/pix/:idEnvio**
     * 
     * Realiza o envio de Pix.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { idEnvio: string } } params 
     * @param { {
     *   valor: string,
     *   pagador: {
     *     chave: string,
     *     infoPagador?: string
     *   },
     *   favorecido: {
     *     chave?: string,
     *     contaBanco?: {
     *       nome: string,
     *       cpf?: string,
     *       cnpj?: string,
     *       codigoBanco: string,
     *       agencia: string,
     *       conta: string,
     *       tipoConta: string
     *     },
     *     cpf?: string,
     *     cnpj?: string
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   idEnvio: string,
     *   e2eId: string,
     *   valor: string,
     *   horario: {
     *      solicitacao: string
     *   }
     *   status: string
     * }>}
     */
    pixSend(params, body) { }

    /**
     * **GET /v2/gn/pix/enviados/:e2eid**
     * 
     * Consulta os dados de uma transferência Pix enviada.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { e2eid: string } } params
     * 
     * @returns {Promise<{
     *   endToEndId: string,
     *   idEnvio: string,
     *   valor: string,
     *   chave: string,
     *   status: string,
     *   infoPagador?: string,
     *   horario: {
     *     solicitacao: string,
     *     liquidacao: string
     *   },
     *   favorecido: {
     *     chave?: string,
     *     identificacao?: {
     *       nome: string,
     *       cpf: string
     *     },
     *     contaBanco?: {
     *       nome: string,
     *       cpf: string,
     *       agencia: string,
     *       conta: string,
     *       tipoConta: string
     *     }
     *   }
     * }>}
     */
    pixSendDetail(params) { }

    /**
     * **GET /v2/gn/pix/enviados/id-envio/:idEnvio**
     * 
     * Consulta os dados de uma transferência Pix enviada pelo identificador de envio.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { idEnvio: string } } params
     * 
     * @returns {Promise<{
     *   endToEndId: string,
     *   idEnvio: string,
     *   valor: string,
     *   chave: string,
     *   status: string,
     *   infoPagador?: string,
     *   horario: {
     *     solicitacao: string,
     *     liquidacao: string
     *   },
     *   favorecido: {
     *     chave?: string,
     *     identificacao?: {
     *       nome: string,
     *       cpf: string
     *     },
     *     contaBanco?: {
     *       nome: string,
     *       cpf: string,
     *       agencia: string,
     *       conta: string,
     *       tipoConta: string
     *     }
     *   }
     * }>}
     */
    pixSendDetailId(params) { }
    /**
     * **GET /v2/gn/pix/enviados**
     * 
     * Consulta as transferências Pix enviadas.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { {
     *   inicio: string,
     *   fim: string,
     *   status?: string,
     *   devolucaoPresente?: boolean,
     *   "paginacao.itensPorPagina"?: number,
     *   "paginacao.paginaAtual"?: number
     * } } params 
     * 
     * @returns {Promise<Array<{
     *   endToEndId: string,
     *   idEnvio: string,
     *   valor: string,
     *   chave: string,
     *   status: string,
     *   infoPagador?: string,
     *   horario: {
     *     solicitacao: string,
     *     liquidacao: string
     *   },
     *   favorecido: {
     *     chave?: string,
     *     identificacao?: {
     *       nome: string,
     *       cpf: string
     *     },
     *     contaBanco?: {
     *       nome: string,
     *       cpf: string,
     *       agencia: string,
     *       conta: string,
     *       tipoConta: string
     *     }
     *   }
     * }>>}
     */
    pixSendList(params) { }
    /**
     * **POST /v2/gn/qrcodes/detalhar**
     * 
     * Detalha um QR Code Pix.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { } } params 
     * 
     * @param { {
     *   pixCopiaECola: string
     * } } body 
     * 
     * @returns {Promise<{
     *   tipoCob: string,
     *   txid: string,
     *   revisao: number,
     *   calendario: {
     *     criacao: string,
     *     apresentacao: string,
     *     expiracao: number
     *   },
     *   status: string,
     *   devedor: {
     *     nome: string,
     *     cpf: string
     *   },
     *   recebedor: {
     *     nome: string,
     *     cpf: string
     *   },
     *   valor: {
     *     final: string
     *   },
     *   chave: string,
     *   solicitacaoPagador: string
     * }>}
     */
    pixQrCodeDetail(params, body) { }
    /**
     * **PUT /v2/gn/pix/:idEnvio/qrcode**
     * 
     * Realiza o envio de um pagamento via QR Code.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { idEnvio: string } } params 
     * @param { {
     *   pagador: {
     *     chave: string,
     *     infoPagador: string
     *   },
     *   pixCopiaECola: string
     * } } body - Dados do pagamento via QR Code
     * 
     * @returns {Promise<{
     *   idEnvio: string,
     *   e2eId: string,
     *   valor: string,
     *   horario: {
     *     solicitacao: string
     *   },
     *   status: string
     * }>}
     */
    pixQrCodePay(params, body) { }
    /**
     * **GET /v2/pix/:e2eId**
     * 
     * Obtém detalhes de um pagamento Pix específico.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { e2eId: string } } params 
     * 
     * @returns {Promise<{
     *   endToEndId: string,
     *   txid: string,
     *   valor: string,
     *   horario: string,
     *   infoPagador?: string,
     *   devolucoes?: Array<{
     *     id: string,
     *     rtrId: string,
     *     valor: string,
     *     horario: {
     *       solicitacao: string
     *     },
     *     status: string
     *   }>
     * }>}
     */
    pixDetailReceived(params) { }
    /**
     * **GET /v2/pix**
     * 
     * Obtém uma lista de pagamentos Pix.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {
     *   inicio: string,
     *   fim: string,
     *   txid?: string,
     *   txIdPresente?: boolean,
     *   devolucaoPresente?: boolean,
     *   cpf?: string,
     *   cnpj?: string,
     *   "paginacao.itensPorPagina"?: number,
     *   "paginacao.paginaAtual"?: number
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
     *   pix: Array<{
     *     endToEndId: string,
     *     txid?: string,
     *     valor: string,
     *     chave: string,
     *     horario: string,
     *     devolucoes?: Array<{
     *       id: string,
     *       rtrId: string,
     *       valor: string,
     *       horario: {
     *         solicitacao: string,
     *         liquidacao: string
     *       },
     *       status: string
     *     }>
     *   }>
     * }>}
     */
    pixReceivedList(params) { }
    /**
     * **PUT /v2/pix/:e2eId/devolucao/:id**
     * 
     * Realiza a devolução de um pagamento Pix recebido.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { e2eId: string, id: string } } params - Identificadores da transação e devolução
     * @param { {
     *   valor: string
     * } } body - Dados da devolução
     * 
     * @returns {Promise<{
     *   id: string,
     *   rtrId: string,
     *   valor: string,
     *   horario: {
     *     solicitacao: string
     *   },
     *   status: string
     * }>}
     */
    pixDevolution(params, body) { }

    /**
     * **GET /v2/pix/:e2eId/devolucao/:id**
     * 
     * Consulta o status de uma devolução de pagamento Pix.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { e2eId: string, id: string } } params - Identificadores da transação e devolução
     * 
     * @returns {Promise<{
     *   id: string,
     *   rtrId: string,
     *   valor: string,
     *   horario: {
     *     solicitacao: string
     *   },
     *   status: string
     * }>}
     */
    pixDetailDevolution(params) { }

    /**
     * **POST /v2/loc**
     * 
     * Cria uma nova localização (location) para um QR Code.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome`, `mensagem`
     * 
     * @param { { 
     *   tipoCob: 'cob' | 'cobv' 
     * } } body 
     * 
     * @returns {Promise<{
     *   id: number,
     *   location: string,
     *   tipoCob: string,
     *   criacao: string
     * }>}
     */
    pixCreateLocation(params, body) { }

    /**
     * **GET /v2/loc**
     * 
     * Retorna uma lista de location de QR Codes.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`
     * 
     * @param { { 
     *   inicio: string, 
     *   fim: string
     * } } params - Filtros e paginação para a busca das localizações
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
     *   loc: Array<{
     *     id: number,
     *     location: string,
     *     tipoCob: string,
     *     criacao: string,
     *     txid?: string
     *   }>
     * }>}
     */
    pixLocationList(params) { }

    /**
     * **GET /v2/loc/:id**
     * 
     * Retorna os detalhes de um location específico de QR Code.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   id: number,
     *   txid: string,
     *   location: string,
     *   tipoCob: string,
     *   criacao: string
     * }>}
     */
    pixDetailLocation(params) { }

    /**
     * **GET /v2/loc/:id/qrcode**
     * 
     * Retorna os detalhes do QR Code de um location específico
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   qrcode: string,
     *   imagemQrcode: string,
     *   linkVisualizacao: string
     * }>}
     */
    pixGenerateQRCode(params) { }

    /**
     * **DELETE /v2/loc/:id/txid**
     * 
     * Remove o txid associado a um location específica.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   id: number,
     *   location: string,
     *   tipoCob: string,
     *   criacao: string
     * }>}
     */
    pixUnlinkTxidLocation(params) { }

    /**
     * **PUT /v2/lotecobv/:id**
     * 
     * Cria/Altera um lote de cobranças com vencimento (CobV).
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * - `multa.modalide`: 
     *      - **1 para valor fixo;**
     *      - **2 para valor em percentual;**
     * 
     * - `juros.modalide`:
     *      - **1 Valor (dias corridos);**
     *      - **2 Percentual ao dia (dias corridos);**
     *      - **3 Percentual ao mês (dias corridos);**
     *      - **4 Percentual ao ano (dias corridos);**
     *      - **5 Valor (dias úteis);**
     *      - **6 Percentual ao dia (dias úteis) ;**
     *      - **7 Percentual ao mês (dias úteis);**
     *      - **8 Percentual ao ano (dias úteis);**
     * 
     * - `abatimento.modalidade:`
     *      - **1 para valor fixo;**
     *      - **2 para valor em percentual;**
     * 
     * 
     * - `desconto.modalide`:
     *      - **1 Valor Fixo até a[s] data[s] informada[s];**
     *      - **2 Percentual até a data informada;**
     *      - **3 Valor por antecipação dia corrido;**
     *      - **4 Valor por antecipação dia útil;**
     *      - **5 Percentual por antecipação dia corrido;**
     *      - **6 Percentual por antecipação dia útil;**
     * 
     * @param { { id: number } } params 
     * 
     * @param { {
     *   descricao: string,
     *   cobsv: Array<{
     *     calendario: {
     *       dataDeVencimento: string,
     *       validadeAposVencimento: number
     *     },
     *     txid: string,
     *     loc?: {
     *       id: number
     *     },
     *     devedor?: {
     *       logradouro?: string,
     *       cidade?: string,
     *       uf?: string,
     *       cep?: string,
     *       cpf?: string,
     *       cnpj?: string,
     *       nome: string
     *     },
     *     valor: {
     *       original: string,
     *       multa?: {
     *         modalidade: number,
     *         valorPerc: string
     *       },
     *       juros?: {
     *         modalidade: number,
     *         valorPerc: string
     *       },
     *       desconto?: {
     *         modalidade: number,
     *         descontoDataFixa?: Array<{
     *           data: string,
     *           valorPerc: string
     *         }>
     *       },
     *       abatimento?: {
     *       modalidade: number,
     *       valorPerc: string
     *      }
     *     },
     *     chave: string,
     *     solicitacaoPagador: string,
     *     infoAdicionais?: Array<{
     *       nome: string,
     *       valor: string
     *     }>
     *   }>
     * } } body 
     * 
     * @returns { Promise<void> }
     */
    pixCreateDueChargeBatch(params, body) { }

    /**
     * **PATCH /v2/lotecobv/:id**
     * 
     * Revisar cobranças específicas de um lote.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { id: number } } params 
     * 
     * @param { {
     *   cobsv: Array<{
     *     txid: string,
     *     calendario?: {
     *       dataDeVencimento?: string,
     *       validadeAposVencimento?: number
     *     },
     *     loc?: {
     *       id?: number
     *     },
     *     devedor?: {
     *       logradouro?: string,
     *       cidade?: string,
     *       uf?: string,
     *       cep?: string,
     *       cpf?: string,
     *       cnpj?: string,
     *       nome?: string
     *     },
     *     valor?: {
     *       original?: string,
     *       multa?: {
     *         modalidade?: number,
     *         valorPerc?: string
     *       },
     *       juros?: {
     *         modalidade?: number,
     *         valorPerc?: string
     *       },
     *       desconto?: {
     *         modalidade?: number,
     *         descontoDataFixa?: Array<{
     *           data?: string,
     *           valorPerc?: string
     *         }>
     *       }
     *     },
     *     chave?: string,
     *     solicitacaoPagador?: string,
     *     infoAdicionais?: Array<{
     *       nome?: string,
     *       valor?: string
     *     }>
     *   }>
     * } } body 
     * 
     * @returns { Promise<void> }
     */
    pixUpdateDueChargeBatch(params, body) { }

    /**
     * **GET /v2/lotecobv/:id**
     * 
     * Obtém informações sobre um lote de cobranças com vencimento (CobV).
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   descricao: string,
     *   criacao: string,
     *   cobsv: Array<{
     *     criacao?: string,
     *     txid: string,
     *     status: string,
     *     problema?: {
     *       type: string,
     *       title: string,
     *       status: number,
     *       detail: string,
     *       violacoes: Array<{
     *         razao: string,
     *         propriedade: string
     *       }>
     *     }
     *   }>
     * }>}
     * 
     * 
     */
    pixDetailDueChargeBatch(params) { }

    /**
     * **GET /v2/lotecobv**
     * 
     * Obtém uma lista de cobranças com vencimento (CobV).
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
     *   lotes: Array<{
     *     id: number,
     *     descricao?: string,
     *     criacao: string,
     *     cobsv: Array<{
     *       criacao: string,
     *       txid: string,
     *       status: string
     *     }>
     *   }>
     * }>}
     */
    pixListDueChargeBatch(params) { }

    /**
     * **POST /v2/gn/split/config**
     * 
     * Cria uma configuração split de recebimentos (sem passar id)
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { {} } params
     * 
     * @param { {
     *   descricao?: string,
     *   txid?: string,
     *   lancamento: {
     *     imediato: boolean
     *   },
     *   split: {
     *     divisaoTarifa: string,
     *     minhaParte: {
     *       tipo: string,
     *       valor: string
     *     },
     *     repasses: Array<{
     *       tipo: string,
     *       valor: string,
     *       favorecido: {
     *         cpf?: string,
     *         cnpj?: string,
     *         conta: string
     *       }
     *     }>
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   id: string,
     *   status: string,
     *   txid?: string,
     *   descricao?: string,
     *   lancamento: {
     *     imediato: boolean
     *   },
     *   split: {
     *     divisaoTarifa: string,
     *     minhaParte: {
     *       tipo: string,
     *       valor: string
     *     },
     *     repasses: Array<{
     *       tipo: string,
     *       valor: string,
     *       favorecido: {
     *         conta: string,
     *         cpf: string,
     *         cnpj: string
     *       }
     *     }>
     *   }
     * }>}
     */
    pixSplitConfig(params, body) { }

    /**
     * **PUT /v2/gn/split/config/:id**
     * 
     * Cria/Atualiza uma configuração split de recebimentos (com id)
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { id: string } } params
     * 
     * @param { {
     *   descricao?: string,
     *   txid?: string,
     *   lancamento: {
     *     imediato: boolean
     *   },
     *   split: {
     *     divisaoTarifa: string,
     *     minhaParte: {
     *       tipo: string,
     *       valor: string
     *     },
     *     repasses: Array<{
     *       tipo: string,
     *       valor: string,
     *       favorecido: {
     *         cpf?: string,
     *         cnpj?: string,
     *         conta: string
     *       }
     *     }>
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   id: string,
     *   status: string,
     *   txid?: string,
     *   descricao: string,
     *   lancamento: {
     *     imediato: boolean
     *   },
     *   split: {
     *     divisaoTarifa: string,
     *     minhaParte: {
     *       tipo: string,
     *       valor: string
     *     },
     *     repasses: Array<{
     *       tipo: string,
     *       valor: string,
     *       favorecido: {
     *         conta: string,
     *         cpf: string,
     *         cnpj: string
     *       }
     *     }>
     *   }
     * }>}
     */
    pixSplitConfigId(params, body) { }

    /**
     * **GET /v2/gn/split/config/:id**
     * 
     * Consulta uma configuração do Split pelo id
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { id: string } } params
     * 
     * @returns {Promise<{
     *   id: string,
     *   txid?:string,
     *   status: string,
     *   revisao: number,
     *   descricao: string,
     *   lancamento: {
     *     imediato: boolean
     *   },
     *   split: {
     *     divisaoTarifa: string,
     *     minhaParte: {
     *       tipo: string,
     *       valor: string
     *     },
     *     repasses: Array<{
     *       tipo: string,
     *       valor: string,
     *       favorecido: {
     *         conta: string,
     *         cpf?: string
     *         cnpj?: string
     *       }
     *     }>
     *   }
     * }>}
     */
    pixSplitDetailConfig(params) { }

    /**
     * **PUT /v2/gn/split/cob/:txid/vinculo/:splitConfigId**
     * 
     * Vincula uma cobrança a um Split de pagamento
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string, splitConfigId: string } } params
     * 
     * @returns { Promise<void> }    
     */
    pixSplitLinkCharge(params) { }

    /**
     * **PUT /v2/gn/split/cobv/:txid/vinculo/:splitConfigId**
     * 
     * Vincula uma cobrança com vencimento (CobV) a um Split de pagamento
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string, splitConfigId: string } } params
     * 
     * @returns { Promise<void> }
     */
    pixSplitLinkDueCharge(params) { }

    /**
     * **DELETE /v2/gn/split/cob/:txid/vinculo**
     * 
     * Deleta o vínculo entre um Split de pagamento e uma cobrança
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string } } params
     * 
     * @returns { Promise<void> }
     */
    pixSplitUnlinkCharge(params) { }

    /**
     * **DELETE /v2/gn/split/cobv/:txid/vinculo**
     * 
     * Deleta o vínculo entre um Split de pagamento e uma cobrança com vencimento (CobV).
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string } } params
     * 
     * @returns { Promise<void> }
     */
    pixSplitUnlinkDueCharge(params) { }

    /**
     * **GET /v2/gn/split/cob/:txid**
     * 
     * Obtém as informações detalhadas de uma cobrança com split de pagamento.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string } } params
     * 
     * @returns {Promise<{
     *   calendario: {
     *     criacao: string,
     *     expiracao: number
     *   },
     *   txid: string,
     *   revisao: number,
     *   status: string,
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   devedor?: {
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   solicitacaoPagador?: string,
     *   loc: {
     *     id: number,
     *     location: string,
     *     tipoCob: string,
     *     criacao: string
     *   },
     *   location: string,
     *   pixCopiaECola: string,
     *   config: {
     *     id: string,
     *     status: string,
     *     revisao: number,
     *     descricao?: string,
     *     tipo: string
     *   }
     * }>}
     */
    pixSplitDetailCharge(params) { }


    /**
     * **GET /v2/gn/split/cobv/:txid**
     * 
     * Obtém os detalhes de uma cobrança com vencimento Pix (CobV) vinculada a uma configuração de divisão de recebíveis (split).
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { txid: string } } params
     * 
     * @returns {Promise<{
     *   calendario: {
     *     criacao: string,
     *     dataDeVencimento: string,
     *     validadeAposVencimento?: number
     *   },
     *   txid: string,
     *   revisao: number,
     *   loc: {
     *     id: number,
     *     location: string,
     *     tipoCob: string
     *   },
     *   status: string,
     *   devedor: {
     *     logradouro?: string,
     *     cidade: string,
     *     uf?: string,
     *     cep?: string,
     *     cpf?: string,
     *     cnpj?: string,
     *     nome: string
     *   },
     *   recebedor: {
     *     logradouro: string,
     *     cidade: string,
     *     uf: string,
     *     cep: string,
     *     cnpj: string,
     *     nome: string
     *   },
     *   valor: {
     *     original: string
     *   },
     *   chave: string,
     *   solicitacaoPagador?: string,
     *   config: {
     *     id: string,
     *     status: string,
     *     descricao?: string
     *   },
     *   pixCopiaECola: string
     * }>}
     */

    pixSplitDetailDueCharge(params) { }

    /**
     * **PUT /v2/webhook/:chave**
     * 
     * Configura a URL do webhook associado à chave Pix.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { chave: string } } params
     * @param { {
     *   webhookUrl: string
     * } } body
     * 
     * @returns { Promise<{
     *  webhookUrl: string,
     * }> }
     */
    pixConfigWebhook(params, body) { }

    /**
     * **GET /v2/webhook/:chave**
     * 
     * Obtém a URL do webhook associado à chave Pix.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { chave: string } } params
     * 
     * @returns {Promise<{
     *   webhookUrl: string,
     *   chave: string,
     *   criacao: string
     * }>}
     */
    pixDetailWebhook(params) { }

    /**
     * **GET /v2/webhook**
     * 
     * Obtém a lista de webhooks registrados.
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
     *     chave: string,
     *     criacao: string
     *   }>
     * }>}
     */
    pixListWebhook(params) { }

    /**
     * **DELETE /v2/webhook/:chave**
     * 
     * Remove um webhook registrado.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { chave: string } } params
     * 
     * @returns { Promise<void> }
     */
    pixDeleteWebhook(params) { }

    /**
     * **POST /v2/gn/evp**
     * 
     * Cria uma nova chave aleatória.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @returns {Promise<{
     *   chave: string
     * }>}
     */
    pixCreateEvp() { }

    /**
     * **GET /v2/gn/evp**
     * 
     * Recupera todas as chaves EVP.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @returns {Promise<{
     *   chaves: string[]
     * }>}
     */
    pixListEvp() { }

    /**
     * **DELETE /v2/gn/evp/:chave**
     * 
     * Deleta uma chave EVP específica.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { { chave: string } } params 
     * 
     * @returns { Promise<void> }
     */
    pixDeleteEvp(params) { }

    /**
     * **GET /v2/gn/saldo**
     * 
     * Obtém o saldo da conta.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @returns {Promise<{
     *   saldo: string,
     *   bloqueios?: {
     *     judicial: string,
     *     med: string,
     *     total: string
     *   }
     * }>}
     */
    getAccountBalance() { }

    /**
     * **PUT /v2/gn/config**
     * 
     * Cria/modifica as configurações da conta.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @param { {} } params
     * @param { {
     *   pix: {
     *     receberSemChave: boolean,
     *     chaves?: Map<string, {
     *       recebimento: {
     *         txidObrigatorio: boolean,
     *         recusarTipoPessoa?: string,
     *         qrCodeEstatico: {
     *           recusarTodos: boolean
     *         },
     *         webhook?: {
     *           notificacao?: {
     *             tarifa: boolean,
     *             pagador: boolean
     *           },
     *           notificar?: {
     *             pixSemTxid: boolean
     *           }
     *         }
     *       },
     *       envio?: {
     *         webhook: {
     *           notificacao: {
     *             tarifa: boolean,
     *             favorecido: boolean
     *           }
     *         }
     *       }
     *     }>
     *   }
     * } } body
     * 
     *  @returns { Promise<void> }
     */
    updateAccountConfig(params, body) { }

    /**
     * **GET /v2/gn/config**
     * 
     * Lista as configurações da conta
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     * 
     * @returns {Promise<{
     *   pix: {
     *     receberSemChave: boolean,
     *     chaves?: Map<string, {
     *       recebimento: {
     *         txidObrigatorio: boolean,
     *         recusarTipoPessoa?: string,
     *         qrCodeEstatico: {
     *           recusarTodos: boolean
     *         },
     *         webhook?: {
     *           notificacao?: {
     *             tarifa: boolean,
     *             pagador: boolean
     *           },
     *           notificar?: {
     *             pixSemTxid: boolean
     *           }
     *         }
     *       },
     *       envio?: {
     *         webhook: {
     *           notificacao: {
     *             tarifa: boolean,
     *             favorecido: boolean
     *           }
     *         }
     *       }
     *     }>
     *   }
     * }>}
     */
    listAccountConfig() { }

    /**
     * **GET /v2/gn/infracoes**
     * 
     * Lista as infrações MED da conta
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
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
     *   infracoes: Array<{
     *     idInfracao: string,
     *     endToEndId: string,
     *     protocolo: string,
     *     dataTransacao: string,
     *     valor: string,
     *     chave?: string,
     *     status: "ABERTA" | "ACEITA" | "CANCELADA_EFI" | "EM_DEFESA" | "REJEITADA",
     *     razao: string,
     *     tipoSituacao?: "golpe" | "aquisição da conta" | "coerção" | "acesso fraudulento" | "outro" | "desconhecido",
     *     tipoFraude?: string,
     *     comentario?: string,
     *     defesa?: string,
     *     justificativaAnalista?: string,
     *     identificadorTicket: Array<number>,
     *     dadosAnalise: {
     *       abertura: string,
     *       prazoFinalizacao: string,
     *       recebimentoDefesa?: string,
     *       finalizacao?: string
     *     },
     *     origem: {
     *       nomeParticipante: string,
     *       conta: string,
     *       nome: string,
     *       documento: string
     *     },
     *     destino: {
     *       nomeParticipante: string,
     *       conta: string,
     *       nome: string,
     *       documento: string
     *     },
     *     criadoEm: string,
     *     atualizadoEm: string
     *   }>
     * }>}
     */
    medList(params) { }

    /**
     * **POST /v2/gn/infracoes/:idInfracao/defesa**
     * 
     * Submete uma defesa de infração MED
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { idInfracao: string } } params 
     * @param { {
     *   analise: "aceito" | "rejeitado",
     *   justificativa: string
     * } } body
     * 
     * @returns { Promise<void> }
     * 
     */
    medDefense(params, body) { }

    /**
     * **POST /v2/gn/relatorios/extrato-conciliacao**
     * 
     * Solicita a geração de um relatório de extrato de conciliação.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param { { } } params 
     * @param { {
     *   dataMovimento: string,
     *   tipoRegistros: {
     *     pixRecebido?: boolean,
     *     pixEnviadoChave?: boolean,
     *     pixEnviadoDadosBancarios?: boolean,
     *     estornoPixEnviado?: boolean,
     *     pixDevolucaoEnviada?: boolean,
     *     pixDevolucaoRecebida?: boolean,
     *     tarifaPixEnviado?: boolean,
     *     tarifaPixRecebido?: boolean,
     *     estornoTarifaPixEnviado?: boolean,
     *     saldoDiaAnterior?: boolean,
     *     saldoDia?: boolean,
     *     transferenciaEnviada?: boolean,
     *     transferenciaRecebida?: boolean,
     *     estornoTransferenciaEnviada?: boolean,
     *     tarifaTransferenciaEnviada?: boolean,
     *     estornoTarifaTransferenciaEnviada?: boolean,
     *     estornoTarifaPixRecebido?: boolean
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   id: string,
     *   dataSolicitacao: string,
     *   status: string,
     * }>}
     */
    createReport(params, body) { }

    /**
     * **GET /v2/gn/relatorios/:id**
     * 
     * Solicitar Download Extrato Conciliação.
     * 
     * O retorno será uma string que deve ser tratada como um arquivo CSV.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * Obs: Se o extrato ainda não tiver sido processado, a resposta será sucesso(202) e o retorno será semelhante ao que é retornado na solicitação, informando em qual etapa de processamento está a solicitação.
     * 
     * @param { { id: string } } params 
     * 
     * @returns {Promise<{
     *   id: string,
     *   dataSolicitacao: string,
     *   status: string,
     * } | string>}
     */
    detailReport(params) { }

    /**
     * **POST /v2/gn/webhook/reenviar**
     * 
     * Reenviar webhook Pix
     * 
     * Endpoint que permite reenviar webhook pix.
     * 
     * É possível solicitar o reenvio de Webhooks para transações que ocorreram a partir do dia 27/12 às 10:00 da manhã.
     * 
     * O reenvio de webhook para uma transação fica disponível por um prazo máximo de 30 dias.
     * 
     * A tentativa de reenvio ocorre uma vez para cada webhook, NÃO existe reagendamentos como ocorre no envio normal. Caso o servidor do cliente esteja inoperante, o cliente terá que solicitar novamente o reenvio.
     * 
     * Nos casos de webhooks de devoluções (recebimento e envio) ocorre o reenvio de um webhook com todo o array de devolução ao invés de um webhook por devolução. Por exemplo, se você realizar duas devoluções relacionadas a um mesmo endToEndId, no envio, você receberá dois webhooks distintos. Porém, ao solicitar o reenvio, receberá apenas um webhook.
     * 
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * Obs: Se o extrato ainda não tiver sido processado, a resposta será sucesso(202) e o retorno será semelhante ao que é retornado na solicitação, informando em qual etapa de processamento está a solicitação.
     * 
     * @param { {} } params
     * @param { {
     *  tipo:  'PIX_RECEBIDO' | 'PIX_ENVIADO' | 'DEVOLUCAO_RECEBIDA' | 'DEVOLUCAO_ENVIADA',
     *  e2eids: Array<string>
     * } } body 
     * 
     * @returns { Promise<void> }
     * 
     */
    pixResendWebhook(params, body) { }

    /**
     * **GET /v2/gn/pix/comprovantes**
     * 
     * Obter comprovantes
     * 
     * Endpoint com a finalidade de obter comprovantes de transações Pix realizadas via API.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e `violacoes`.
     * 
     * @param { {
     *  e2eid?: string,
     *  idEnvio?: string,
     *  rtrId?: string,
     *  txid?: string 
     * } } params 
     * 
     * @returns { Promise<Buffer> }
     */
    pixGetReceipt(params) { }

    /**
     * **GET /v2/rec/:idRec**
     * 
     * Endpoint para consultar recorrência de Pix Automático.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e `violacoes`.
     * 
     * @param {{
     *  idRec: string
     * }} params 
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  status: string,
     *  valor: {
     *      valorRec?: string,
     *      valorMinimoRecebedor?: string
     *  },
     *  vinculo: {
     *      contrato: string,
     *      devedor: {
     *        cpf?: string,
     *        cnpj?: string,
     *        nome: string
     *      },
     *      objeto?: string,  
     * }
     * calendario: {
     *  dataFinal?: string,
     *  dataInicial: string,
     *  periodicidade: string,
     * }
     * politicaRetentativa: string,
     * loc?: {
     *  id: number,
     *  location: string,
     *  idRec: string,
     * },
     * pagador?: {
     *  ispbParticipante: string,
     *  codMun: string,
     *  cpf?: string,
     *  cnpj?: string,
     * },
     * status: string,
     * dadosQR?: {
     *   jornada: string,
     *   pixCopiaECola: string,
     * },
     * encerramento?: {
     *  cancelamento: {
     *   solicitante: string,
     *   codigo: string,
     *   descricao: string
     *  }
     * },
     * ativacao: {
     *  tipoJornada: string,
     *  dadosJornada?: {
     *   txid: string,
     *  }
     * },
     * atualizacao: Array<{
     *   status: string,
     *   data: string,
     * }>
     * }> 
     * }
     */
    pixDetailRecurrenceAutomatic(params) { }

    /**
     * ** PATCH /v2/rec/:idRec**
     * 
     * Endpoint para revisar recorrência de Pix Automático.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e `violacoes`.
     * 
     * @param {{
     *  idRec: string
     * }} params 
     * @param {{
     *  loc?: string,
     *  status?: string,
     *  vinculo?: {
     *    devedor: {
     *      nome: string
     *   }
     *  },
     *  calendario?: {
     *   dataInicial?: string,
     *  },
     *   ativacao?: {
     *      dadosJornada: {
     *      txid: string
     *  }
     * }
     * }} body
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  status: string,
     *  valor: {
     *      valorRec?: string,
     *      valorMinimoRecebedor?: string
     *  },
     *  vinculo: {
     *      contrato: string,
     *      devedor: {
     *        cpf?: string,
     *        cnpj?: string,
     *        nome: string
     *      },
     *      objeto?: string,  
     * }
     * calendario: {
     *  dataFinal?: string,
     *  dataInicial: string,
     *  periodicidade: string,
     * }
     * politicaRetentativa: string,
     * loc?: {
     *  id: number,
     *  location: string,
     *  idRec: string,
     * },
     * pagador?: {
     *  ispbParticipante: string,
     *  codMun: string,
     *  cpf?: string,
     *  cnpj?: string,
     * },
     * status: string,
     * dadosQR?: {
     *   jornada: string,
     *   pixCopiaECola: string,
     * },
     * encerramento?: {
     *  cancelamento: {
     *   solicitante: string,
     *   codigo: string,
     *   descricao: string
     *  }
     * },
     * ativacao: {
     *  tipoJornada: string,
     *  dadosJornada?: {
     *   txid: string,
     *  }
     * },
     * atualizacao: Array<{
     *   status: string,
     *   data: string,
     * }>}> 
     * }
     */
    pixUpdateRecurrenceAutomatic(params, body) { }

    /**
     * **GET /v2/rec**
     * 
     * Consultar lista de recorrências de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e `violacoes`.
     * 
     * @param {{
     *  inicio: string,
     *  fim: string,
     *  cpf?: string,
     *  cnpj?: string,
     *  locationPresente?: boolean,
     *  status?: string,
     *  convenio?: string,
     *  "paginacao.itensPorPagina"?: number,
     *  "paginacao.paginaAtual"?: number
     * }} params 
     * 
     * @returns {Promise<{
     *  parametros: {
     *    inicio: string,
     *    fim: string,
     *    paginacao: {  
     *     paginaAtual: number,
     *     itensPorPagina: number,
     *     quantidadeDePaginas: number,
     *     quantidadeTotalDeItens: number
     *    }
     * },
     * recs: Array<{
     *  idRec: string,
     *  status: string,
     *  valor: {
     *      valorRec?: string,
     *      valorMinimoRecebedor?: string
     *  },
     *  vinculo: {
     *      contrato: string,
     *      devedor: {
     *        cpf?: string,
     *        cnpj?: string,
     *        nome: string
     *      },
     *      objeto?: string,  
     * }
     * calendario: {
     *  dataFinal?: string,
     *  dataInicial: string,
     *  periodicidade: string,
     * }
     * politicaRetentativa: string,
     * loc?: {
     *  id: number,
     *  location: string,
     *  idRec: string,
     * },
     * pagador?: {
     *  ispbParticipante: string,
     *  codMun: string,
     *  cpf?: string,
     *  cnpj?: string,
     * },
     * status: string,
     * dadosQR?: {
     *   jornada: string,
     *   pixCopiaECola: string,
     * },
     * encerramento?: {
     *  cancelamento: {
     *   solicitante: string,
     *   codigo: string,
     *   descricao: string
     *  }
     * },
     * ativacao: {
     *  tipoJornada: string,
     *  dadosJornada?: {
     *   txid: string,
     *  }
     * },
     * atualizacao: Array<{
     *   status: string,
     *   data: string,
     * }>
     * }> 
     * }>}
     */
    pixListRecurrenceAutomatic(params) { }

    /**
     * **POST /v2/rec**
     * 
     * Criar recorrência de Pix Automático
     * 
     * Endpoint para criar recorrência de Pix Automático.
     * 
     * @param {{}} params 
     * @param {{
     *  valor: {
     *      valorRec?: string,
     *      valorMinimoRecebedor?: string
     *  },
     *  vinculo: {
     *      contrato: string,
     *      devedor: {
     *        cpf?: string,
     *        cnpj?: string,
     *        nome: string
     *      },
     *      objeto?: string,  
     * }
     * calendario: {
     *  dataFinal?: string,
     *  dataInicial: string,
     *  periodicidade: string,
     * }
     * politicaRetentativa: string,
     * loc?: id,
     * ativacao?: {
     *  dadosJornada: {
     *  txid: string
     * }
     * },
     * recebedor?: {
     *  convenio: string,
     * }
     * }} body 
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  status: string,
     *  valor: {
     *      valorRec?: string,
     *      valorMinimoRecebedor?: string
     *  },
     *  vinculo: {
     *      contrato: string,
     *      devedor: {
     *        cpf?: string,
     *        cnpj?: string,
     *        nome: string
     *      },
     *      objeto?: string,  
     * }
     * calendario: {
     *  dataFinal?: string,
     *  dataInicial: string,
     *  periodicidade: string,
     * }
     * politicaRetentativa: string,
     * loc?: {
     *  id: number,
     *  location: string,
     *  idRec: string,
     * },
     * pagador?: {
     *  ispbParticipante: string,
     *  codMun: string,
     *  cpf?: string,
     *  cnpj?: string,
     * },
     * status: string,
     * ativacao: {
     *  tipoJornada: string,
     *  dadosJornada?: {
     *   txid: string,
     *  }
     * },
     * atualizacao: Array<{
     *   status: string,
     *   data: string,
     * }>
     * }>}
     */
    pixCreateRecurrenceAutomatic(params, body) { }

    /**
     * **POST /v2/solicrec**
     * 
     * Criar solicitação de confirmação de recorrência de Pix Automático
     * 
     * Endpoint para criar uma solicitação de confirmação de recorrência de Pix Automático.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e `violacoes`.
     * 
     * @param {{}} params 
     * @param {{
     *  idRec: string,
     *  calendario: {
     *   dataExpiracaoSolicitacao: string,
     * },
     * destinatario: {
     *  cpf?: string,
     *  cnpj?: string,
     *  conta: string,
     *  agencia: string,
     *  ispbParticipante: string
     * }
     * }} body 
     * 
     * @returns {Promise<{
     *  idSolicRec: string,
     *  idRec: string,
     *  calendario: {
     *  dataExpiracaoSolicitacao: string,
     * },
     * status: string,
     * destinatario: {
     *  cpf?: string,
     *  cnpj?: string,
     *  conta: string,
     *  agencia: string,
     *  ispbParticipante: string
     * },
     * atualizacao: Array<{
     *  status: string,
     * data: string
     * }>,
     * recPayload: {
     *  idRec: string,
     *  vinculo: {
     *   contrato: string,
     *   devedor: {
     *    cpf?: string,
     *    cnpj?: string,
     *    nome: string
     *  },
     *  objeto?: string,
     * },
     * calendario: {
     *  dataFinal?: string,
     * dataInicial: string,
     * periodicidade: string,
     * },
     * recebedor: {
     *  cnpj: string,
     *  nome: string
     * },
     * valor: {
     * valorRec?: string,
     * valorMinimoRecebedor?: string    
     * },
     * atualizacao: Array<{
     * status: string,
     * data: string
     * }>
     * }
     * }>} 
     */
    pixCreateRequestRecurrenceAutomatic(params, body) { }

    /**
     * **GET /v2/solicrec/:idSolicRec**
     * 
     * Consultar solicitação de confirmação de recorrência de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e `violacoes`.
     * 
     * @param {{
     *  idSolicRec: string
     * }} params 
     * 
     * @returns {Promise<{
     *  idSolicRec: string,
     *  idRec: string,
     *  calendario: {
     *  dataExpiracaoSolicitacao: string,
     * },
     * status: string,
     * destinatario: {
     *  cpf?: string,
     *  cnpj?: string,
     *  conta: string,
     *  agencia: string,
     *  ispbParticipante: string
     * },
     * atualizacao: Array<{
     *  status: string,
     * data: string
     * }>
     * }>}
     */
    pixDetailRequestRecurrenceAutomatic(params) { }

    /**
     * **PATCH /v2/solicrec/:idSolicRec**
     * 
     * Revisar solicitação de confirmação de recorrência de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{
     *  idSolicRec: string
     * }} params 
     * @param {{
     *  status: string,
     * }} body 
     * 
     * @returns {Promise<{
     *  idSolicRec: string,
     *  idRec: string,
     *  calendario: {
     *  dataExpiracaoSolicitacao: string,
     * },
     * status: string,
     * destinatario: {
     *  cpf?: string,
     *  cnpj?: string,
     *  conta: string,
     *  agencia: string,
     *  ispbParticipante: string
     * },
     * atualizacao: Array<{
     *  status: string,
     * data: string
     * }>
     * }>}
     */
    pixUpdateRequestRecurrenceAutomatic(params, body) { }

    /**
     * **PUT /v2/cobr/:txid**
     * 
     * Criar cobrança de Pix Automático (com txid)
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{
     *  txid: string
     * }} params 
     * @param {{
     *  idRec: string,
     *  infoAdicional?: string,
     *  calendario: {
     *   dataDeVencimento: string,
     * },
     * valor: {
     *  original: string, 
     * },
     * ajusteDiaUtil: boolean,
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * }
     * }} body
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  txid: string,
     *  infoAdicional?: string,
     *  calendario: {
     *  criacao: string,
     *  dataDeVencimento: string,
     * },
     * valor: {
     *  original: string
     * },
     * status: string,
     * politicaRetentativa: string,
     * ajusteDiaUtil: boolean,
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * },
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * atualizacao: Array<{
     *  status: string,
     *  data: string
     * }>
     * }>} 
     */
    pixCreateAutomaticChargeTxid(params, body) { }

    /**
     * **PATCH /v2/cobr/:txid**
     * 
     * Revisar cobrança de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{
     *  txid: string
     * }} params 
     * 
     * @param {{
     *  status: string,
     * }} body 
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  txid: string,
     *  infoAdicional?: string,
     *  calendario: {
     *  criacao: string,
     *  dataDeVencimento: string,
     * },
     * valor: {
     *  original: string
     * },
     * status: string,
     * politicaRetentativa: string,
     * ajusteDiaUtil: boolean,
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * },
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * tentativas?: Array<{
     *  dataLiquidacao: string,
     *  tipo: string,
     *  endToEndId: string,
     *  status: string,
     * }>,
     * encerramento: {
     *  cancelamento: {
     *   solicitante: string,
     *   codigo: string,
     *   descricao: string
     * }
     * }
     * atualizacao: Array<{
     *  status: string,
     *  data: string
     * }>
     * }>}
     */
    pixUpdateAutomaticCharge(params, body) { }


    /**
     * **GET /v2/cobr/:txid**
     * 
     * Consultar cobrança de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{ 
     *  txid: string
     * }} params 
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  txid: string,
     *  infoAdicional?: string,
     *  calendario: {
     *  criacao: string,
     *  dataDeVencimento: string,
     * },
     * valor: {
     *  original: string
     * },
     * status: string,
     * politicaRetentativa: string,
     * ajusteDiaUtil: boolean,
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * },
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * tentativas?: Array<{
     *  dataLiquidacao: string,
     *  tipo: string,
     *  endToEndId: string,
     *  status: string,
     * }>,
     * encerramento: {
     *  cancelamento: {
     *   solicitante: string,
     *   codigo: string,
     *   descricao: string
     * }
     * }
     * atualizacao: Array<{
     *  status: string,
     *  data: string
     * }>
     * }>}
     */
    pixDetailAutomaticCharge(params) { }

    /**
     * **POST /v2/cobr**
     * 
     * Criar cobrança de Pix Automático (sem txid)
     * 
     * @param {{}} params 
     * 
     * @param {{
     *  idRec: string,
     *  infoAdicional?: string,
     *  calendario: {
     *   dataDeVencimento: string,
     * },
     * valor: {
     *  original: string, 
     * },
     * ajusteDiaUtil: boolean,
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * }
     * }} body
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  txid: string,
     *  infoAdicional?: string,
     *  calendario: {
     *  criacao: string,
     *  dataDeVencimento: string,
     * },
     * valor: {
     *  original: string
     * },
     * status: string,
     * politicaRetentativa: string,
     * ajusteDiaUtil: boolean,
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * },
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * atualizacao: Array<{
     *  status: string,
     *  data: string
     * }>
     * }>} 
     */
    pixCreateAutomaticCharge(params, body) { }

    /**
     * **GET /v2/cobr**
     * 
     * Consultar lista de cobranças de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * 
     * @param {{
     *  inicio: string,
     *  fim: string,
     *  idRec?: string,
     *  cpf?: string,
     *  cnpj?: string,
     *  status?: string,
     *  convenio?: string,
     *  "paginacao.itensPorPagina"?: number,
     *  "paginacao.paginaAtual"?: number
     * }} params 
     * 
     * @returns {Promise<{
     *  parametros: {
     *   inicio: string,
     *  fim: string,
     *  paginacao: {
     *   paginaAtual: number,
     *  itensPorPagina: number,
     *  quantidadeDePaginas: number,
     *  quantidadeTotalDeItens: number
     *  }
     * },
     * cobsr: Array<{
     *  idRec: string,
     *  txid: string,
     *  infoAdicional?: string,
     *  calendario: {
     *  criacao: string,
     *  dataDeVencimento: string,
     * },
     * valor: {
     *  original: string
     * },
     * status: string,
     * politicaRetentativa: string,
     * ajusteDiaUtil: boolean,
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * },
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * tentativas?: Array<{
     *  dataLiquidacao: string,
     *  tipo: string,
     *  endToEndId: string,
     *  status: string,
     * }>,
     * encerramento: {
     *  cancelamento: {
     *   solicitante: string,
     *   codigo: string,
     *   descricao: string
     * }
     * }
     * atualizacao: Array<{
     *  status: string,
     *  data: string
     * }>
     * }>
     * }>}
     */
    pixListAutomaticCharge(params) { }

    /**
     * 
     * **POST /v2/cobr/:txid/retentativa/:data**
     * 
     * Solicitar retentativa de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * 
     * @param {{
     *  txid: string,
     *  data: string
     * }} params 
     * 
     * @returns {Promise<{
     *  idRec: string,
     *  txid: string,
     *  infoAdicional?: string,
     *  calendario: {
     *  criacao: string,
     *  dataDeVencimento: string,
     * },
     * valor: {
     *  original: string
     * },
     * status: string,
     * politicaRetentativa: string,
     * ajusteDiaUtil: boolean,
     * devedor?: {
     *  email?: string,
     *  logradouro?: string,
     *  cidade?: string,
     *  uf?: string,
     *  cep?: string,
     * },
     * recebedor: {
     *  conta: string,
     *  tipoConta: string,
     *  agencia: string,
     * },
     * tentativas?: Array<{
     *  dataLiquidacao: string,
     *  tipo: string,
     *  endToEndId: string,
     *  status: string,
     * }>,
     * atualizacao: Array<{
     *  status: string,
     *  data: string
     * }>
     * }>}
     */
    pixRetryRequestAutomaticCharge(params) { }

    /**
     * **POST /v2/locrec**
     * 
     * Criar location do payload de recorrência de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * 
     * @returns {Promise<{
     *  id: number,
     *  location: string,
     *  criacao: string,
     * }>}
     */
    pixCreateLocationRecurrenceAutomatic() { }


    /**
     * **GET /v2/locrec**
     * 
     * Consultar locations de recorrência de Pix Automático cadastradas
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{
     *  inicio: string,
     *  fim: string,
     *  idRecPresente?: boolean,
     *  convenio?: string,
     *  "paginacao.itensPorPagina"?: number,
     *  "paginacao.paginaAtual"?: number
     * }} params 
     * 
     * @returns {Promise<{
     *  parametros: {
     *  inicio: string,
     * fim: string,
     * paginacao: {
     * paginaAtual: number,
     * itensPorPagina: number,
     * quantidadeDePaginas: number,
     * quantidadeTotalDeItens: number
     * }
     * },
     * loc: Array<{
     *  id: number,
     *  location: string,
     *  criacao: string,
     *  idRec: string,
     * }>
     * }>}
     */
    pixListLocationRecurrenceAutomatic(params) { }

    /**
     * **GET /v2/locrec/:id**
     * 
     * Recuperar location do payload de recorrência de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {
     *  id: string
     * } params 
     * 
     * @returns {Promise<{
     *  id: number,
     *  location: string,
     *  criacao: string,
     *  idRec: string
     * }>}
     */
    pixDetailLocationRecurrenceAutomatic(params) { }

    /**
     * **DELETE /v2/locrec/:id/idRec**
     * 
     * Desvincular uma recorrência de Pix Automático de um location
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{
     *  id: string
     * }} params 
     * 
     * @returns {Promise<{
     *  id: number,
     *  location: string,
     *  criacao: string,
     * }>}
     */
    pixUnlinkLocationRecurrenceAutomatic(params) { }

    /**
     * 
     * **PUT /v2/webhookrec**
     * 
     * Configurar o webhook de recorrência de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{}} params 
     * @param {{
     *  webhookUrl: string,
     * }} body 
     * 
     * @returns {Promise<void>}
     */
    pixConfigWebhookRecurrenceAutomatic(params, body) { }

    /**
     * **GET /v2/webhookrec**
     * 
     * Exibir informações do webhook de recorrência de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @returns {Promise<{
     *  webhookUrl: string,
     *  criacao: string,
     * }>}
     */
    pixListWebhookRecurrenceAutomatic() { }

    /**
     * **DELETE /v2/webhookrec**
     * 
     * Cancelar o webhook de recorrência de Pix Automático
     * 
     * @returns {Promise<void>}
     * 
     */
    pixDeleteWebhookRecurrenceAutomatic() { }

    /**
     * **PUT /v2/webhookcobr**
     * 
     * Configurar o webhook de cobrança de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @param {{}} params
     * @param {{
     * webhookUrl: string,
     * }} body
     * 
     * @returns {Promise<void>}
     * 
     */
    pixConfigWebhookAutomaticCharge(params, body) { }

    /**
     * **GET /v2/webhookcobr**
     * 
     * Exibir informações do webhook de cobrança de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @returns {Promise<{
     *  webhookUrl: string,
     *  criacao: string,
     * }>}
     */
    pixListWebhookAutomaticCharge() { }

    /**
     * **DELETE /v2/webhookcobr**
     * 
     * Cancelar o webhook de cobrança de Pix Automático
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `type`, `title`, `status`, `detail` e dependendo da falha `violacoes`.
     * 
     * @returns {Promise<void>}
     * 
     */
    pixDeleteWebhookAutomaticCharge() { }

}


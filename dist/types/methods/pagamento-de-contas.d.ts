export class PagamentoDeContasMethods extends OpenFinanceMethods {
    /**
     * **GET /v1/codBarras/:codBarras**
     *
     * Detalhar código de barras para pagamento
     *
     * Há dois tipos de cobranças e elas podem retornar informações diferentes. São eles:
     *  - Tipo tributo, conhecido também como títulos e convênios, esse tipo de cobrança é emitido por concessionárias de serviços, como: conta de água, luz, telefone e gás. Eles não são registrados na Câmara Interbancária de Pagamento (CIP) e, por isso, não retornam as mesmas informações que um boleto registrado na CIP apresenta.
     *  - Tipo boleto, possui registro na Câmara Interbancária de Pagamento (CIP) e, por isso, após ser consultado, o endpoint retorna informações mais completas sobre o pagamento.
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `mensagem` OU `descricao`.
     *
     * @param {{ codBarras: string }} params
     *
     * @returns { Promise<{
     *  tipo: 'boleto' | 'tributo',
     *  banco: {
     *      codigo: number,
     *      nome: string
     *  } | null,
     *  codBarras: string,
     *  linhaDigitavel: string,
     *  datas: {
     *      vencimento: string,
     *      limitePagamento: string | null,
     *  }
     *  beneficiario: {
     *      nome: string,
     *      documento: string,
     *      fantasia: string
     *  } | null,
     *  pagador: {
     *      nome: string,
     *      documento: string,
     *  } | null,
     *  valores: {
     *      original: number,
     *      abatimento: number | null,
     *      multa: number,
     *      juros: number,
     *      desconto: number,
     *      pago: number | null,
     *      final: number
     *  },
     *  informacoesPagamento: {
     *      divergente: {
     *          deveAceitar: boolean,
     *          valorMinimo: number,
     *          valorMaximo: number,
     *      },
     *      parcial: {
     *          deveAceitar: boolean,
     *          limiteDePagamentos: number,
     *      },
     *      podeSerPago: boolean,
     *  } | null,
     * > }
     * }
     */
    payDetailBarCode(params: {
        codBarras: string;
    }): Promise<{
        tipo: 'boleto' | 'tributo';
        banco: {
            codigo: number;
            nome: string;
        } | null;
        codBarras: string;
        linhaDigitavel: string;
        datas: {
            vencimento: string;
            limitePagamento: string | null;
        };
        beneficiario: {
            nome: string;
            documento: string;
            fantasia: string;
        } | null;
        pagador: {
            nome: string;
            documento: string;
        } | null;
        valores: {
            original: number;
            abatimento: number | null;
            multa: number;
            juros: number;
            desconto: number;
            pago: number | null;
            final: number;
        };
        informacoesPagamento: {
            divergente: {
                deveAceitar: boolean;
                valorMinimo: number;
                valorMaximo: number;
            };
            parcial: {
                deveAceitar: boolean;
                limiteDePagamentos: number;
            };
            podeSerPago: boolean;
        } | null;
    }>;
    /**
     * **POST /v1/codBarras/:codBarras**
     *
     * Solicitar pagamento de código de barras
     *
     * Para pagamento no mesmo dia, os boletos são aceitos até as 22 horas, com exceção dos boletos com valores superiores a R$249.000,00 que são aceitos até as 14 horas.
     * No caso de contas de consumo (água, energia, TV a cabo, gás e telefone) e tributos, o processamento ocorre até às 18 horas.
     * Mas, é possível agendá-los para o próximo dia útil.
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível será `descricao`
     *
     * @param {{ codBarras: string }} params
     * @param {{
     *  dataPagamento: string,
     *  valor: number,
     *  descricao?: string
     * }} body
     *
     * @returns { Promise<{
     *  idPagamento: string,
     *  valorPago: number,
     *  status: string,
     *  data: {
     *      solicitacao: string,
     *      pagamento: string
     *  }
     * }> }
     */
    payRequestBarCode(params: {
        codBarras: string;
    }, body: {
        dataPagamento: string;
        valor: number;
        descricao?: string;
    }): Promise<{
        idPagamento: string;
        valorPago: number;
        status: string;
        data: {
            solicitacao: string;
            pagamento: string;
        };
    }>;
    /**
     * **GET /v1/:idPagamento**
     *
     * Consultar solicitação de pagamento
     *
     * Para capturar uma falha utilize o `catch`, o campo disponível no objeto será `descricao`.
     *
     * @param {{ idPagamento: string}} params
     *
     * @returns { Promise<{
     *  idPagamento: string,
     *  codBarras?: string,
     *  linhaDigitavel?: string,
     *  valorPago?: number,
     *  status?: string,
     *  retornoBancario?: string,
     *  protocolo?: string | null,
     *  motivoRecusa?: string | null,
     *  data?: {
     *      solicitacao: string,
     *      pagamento: string
     *  }
     *  descricao?: string,
     *  horario?: {
     *     solicitacao: string,
     *  }
     * }> }
     */
    payDetailPayment(params: {
        idPagamento: string;
    }): Promise<{
        idPagamento: string;
        codBarras?: string;
        linhaDigitavel?: string;
        valorPago?: number;
        status?: string;
        retornoBancario?: string;
        protocolo?: string | null;
        motivoRecusa?: string | null;
        data?: {
            solicitacao: string;
            pagamento: string;
        };
        descricao?: string;
        horario?: {
            solicitacao: string;
        };
    }>;
    /**
     * **GET /v1/resumo**
     *
     * Consultar resumo de solicitações de pagamento
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{
     *  dataInicio: string,
     *  dataFim: string,
     * }} params
     *
     * @returns { Promise<{
     *  datas: {
     *      inicial: string,
     *      final: string
     *  },
     *  solicitacoes: {
     *      total: number,
     *      processando: number,
     *      sucesso: number,
     *      falha: number,
     *      cancelada: number
     *  }
     *  solicitacoesFalhas: Array<number>,
     * }> }
     */
    payListPayments(params: {
        dataInicio: string;
        dataFim: string;
    }): Promise<{
        datas: {
            inicial: string;
            final: string;
        };
        solicitacoes: {
            total: number;
            processando: number;
            sucesso: number;
            falha: number;
            cancelada: number;
        };
        solicitacoesFalhas: Array<number>;
    }>;
    /**
     * **PUT /v1/webhook**
     *
     * Criar webhook de pagamento
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param { {} } params
     * @param {{ url: string }} body
     *
     * @returns { Promise<{
     *  url: string
     * }> }
     */
    payConfigWebhook(params: {}, body: {
        url: string;
    }): Promise<{
        url: string;
    }>;
    /**
     * **GET /v1/webhook**
     *
     * Listar webhooks de pagamento
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{
     *  dataInicio: string,
     *  dataFim: string,
     * }} params
     *
     * @returns { Promise<{
     *  parametros: {
     *      inicio: string,
     *      fim: string,
     *      paginacao: {
     *          paginaAtual: number,
     *          itensPorPagina: number,
     *          quantidadeDePaginas: number,
     *          quantidadeTotalDeItens: number
     *      }
     *  },
     *  webhooks: Array<{
     *     url: string,
     *     criacao: string
     *  }>
     * }}
     */
    payListWebhook(params: {
        dataInicio: string;
        dataFim: string;
    }): Promise<{
        parametros: {
            inicio: string;
            fim: string;
            paginacao: {
                paginaAtual: number;
                itensPorPagina: number;
                quantidadeDePaginas: number;
                quantidadeTotalDeItens: number;
            };
        };
        webhooks: Array<{
            url: string;
            criacao: string;
        }>;
    }>;
    /**
     * **DELETE /v1/webhook**
     *
     * Deletar webhook de pagamento
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param { {} } params
     * @param {{ url: string }} body
     *
     * @returns { Promise<void> }
     */
    payDeleteWebhook(params: {}, body: {
        url: string;
    }): Promise<void>;
}
import { OpenFinanceMethods } from "./open-finance";

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
    ofConfigDetail(): Promise<{
        redirectURL: string;
        webhookURL: string;
        webhookSecurity: {
            type: 'mtls' | 'hmac';
        };
    }>;
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
    ofConfigUpdate(params: {}, body: {
        redirectURL: string;
        webhookURL: string;
        webhookSecurity?: {
            type: 'mtls' | 'hmac';
            hash?: string;
        };
        processPayment?: 'async' | 'sync';
    }): Promise<{
        redirectURL: string;
        webhookURL: string;
        webhookSecurity: {
            type: 'mtls' | 'hmac';
            hash?: string;
        };
    }>;
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
     *  modalidade?: string,
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
    ofListParticipants(params: {
        nome?: string;
        organizacao?: boolean;
        modalidade?: string;
        tipoPessoa?: 'PJ' | 'PF';
    }): Promise<{
        participantes: Array<{
            identificador: string;
            nome: string;
            descricao: string;
            portal: string;
            logo: string;
            organizacoes: Array<{
                nome: string;
                cnpj: string;
                status: string;
            }>;
        }>;
    }>;
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
    ofListPixPayment(params: {
        inicio: string;
        fim: string;
        quantidade?: string;
        pagina?: string;
        status?: string;
        identificador?: string;
    }): Promise<{
        pagamentos: Array<{
            identificadorPagamento: string;
            endToEndId?: string;
            valor?: string;
            status: string;
            dataCriacao: string;
            devolucoes?: Array<{
                identificadorDevolucao: string;
                valor: string;
                status: string;
                dataCriacao: string;
            }>;
            idProprio?: string;
        }>;
        total: string;
        porPagina: string;
        ultimo: string;
        proximo: string | null;
        anterior: string | null;
        atual: string;
    }>;
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
    ofStartPixPayment(params: {}, body: any): Promise<{
        identificadorPagamento: string;
        redirectURI: string;
    }>;
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
    ofDevolutionPix(params: {
        identificadorPagamento: string;
    }, body: {
        valor: string;
    }): Promise<{
        identificadorPagamento: string;
        valorDevolucao: string;
        dataCriacao: string;
        status: string;
    }>;
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
    ofStartSchedulePixPayment(params: {}, body: {
        pagador: {
            idParticipante: string;
            cpf: string;
            cnpj?: string;
        };
        favorecido: {
            contaBanco: {
                codigoBanco: string;
                agencia: string;
                documento: string;
                nome: string;
                tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN';
            };
        };
        pagamento: {
            valor: string;
            codigoCidadeIBGE?: string;
            infoPagador?: string;
            idProprio?: string;
            dataAgendamento: string;
        };
    }): Promise<{
        identificadorPagamento: string;
        redirectURI: string;
    }>;
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
    ofListSchedulePixPayment(params: {
        inicio: string;
        fim: string;
        quantidade?: string;
        pagina?: string;
        status?: string;
        identificador?: string;
    }): Promise<{
        pagamentos: Array<{
            identificadorPagamento: string;
            endToEndId?: string;
            valor?: string;
            status: string;
            dataOperacao: string;
            dataCriacao: string;
            idProprio: string;
            devolucoes: Array<{
                identificadorDevolucao: string;
                valor: string;
                status: string;
                dataCriacao: string;
            }>;
        }>;
        total: number;
        porPagina: number;
        ultimo: string;
        proximo: string | null;
        anterior: string | null;
        atual: string;
    }>;
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
    ofCancelSchedulePix(params: {
        identificadorPagamento: string;
    }): Promise<{
        pagamentos: {
            identificadorPagamento: string;
            status: string;
            dataCancelamento: string;
        };
    }>;
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
    ofDevolutionSchedulePix(params: {
        identificadorPagamento: string;
    }, body: {
        valor: string;
    }): Promise<{
        identificadorPagamento: string;
        endToEndId: string;
        valor: string;
        dataCriacao: string;
        status: string;
    }>;
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
    ofStartRecurrencyPixPayment(params: {}, body: {
        pagador: {
            idParticipante: string;
            cpf: string;
            cnpj?: string;
        };
        favorecido: {
            contaBanco: {
                codigoBanco: string;
                agencia: string;
                documento: string;
                nome: string;
                tipoConta: 'CACC' | 'SLRY' | 'SVGS' | 'TRAN';
            };
        };
        pagamento: {
            valor: string;
            codigoCidadeIBGE?: string;
            infoPagador?: string;
            idProprio?: string;
            recorrencia: {
                tipo: 'diaria' | 'semanal' | 'mensal' | 'personalizada';
                dataInicio?: string;
                quantidade?: number;
                diaDaSemana?: string;
                diaDoMes?: number;
                datas?: Array<string>;
                descricao?: string;
            };
        };
    }): Promise<{
        identificadorPagamento: string;
        redirectURI: string;
    }>;
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
    ofListRecurrencyPixPayment(params: {
        inicio: string;
        fim: string;
        quantidade?: string;
        pagina?: string;
        status?: string;
        identificador?: string;
    }): Promise<{
        pagamentos: Array<{
            identificadorPagamento: string;
            valor: string;
            status: string;
            dataCriacao: string;
            idProprio: string;
            recorrencia: Array<{
                endToEndId: string;
                dataOperacao: string;
                status: string;
                devolucoes: Array<{
                    identificadorDevolucao: string;
                    valor: string;
                    status: string;
                    dataCriacao: string;
                }>;
            }>;
        }>;
        total: number;
        porPagina: number;
        ultimo: string;
        proximo: string | null;
        anterior: string | null;
        atual: string;
    }>;
    /**
     * **PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar**
     *
     * Este endpoint é utilizado para cancelar um pagamento recorrente. Deve receber como entrada um identificadorPagamento ou EndToEndId válido no parametro.
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
    ofCancelRecurrencyPix(params: {
        identificadorPagamento: string;
    }): Promise<{
        pagamentos: {
            identificadorPagamento: string;
            status: string;
            dataCancelamento: string;
        };
    }>;
    /**
     * **POST /v1/pagamentos-recorrentes/pix/:identificadorPagamento/devolver**
     *
     * Este endpoint é utilizado para realizar a devolução de um pagamento recorrente. Deve receber como entrada um endToEndId válido e o valor a ser devolvido no corpo da requisição.
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
    ofDevolutionRecurrencyPix(params: {
        identificadorPagamento: string;
    }, body: Array<{
        endToEndId: string;
        valor: string;
    }>): Promise<Array<{
        identificadorPagamento: string;
        endToEndId: string;
        valor: string;
        dataCriacao: string;
        status: string;
    }>>;
    /**
     * **PATCH /v1/pagamentos-recorrentes/pix/:identificadorPagamento/substituir/:endToEndId**
     *
     * Este endpoint é uma ferramenta para substituição de parcelas para pagamentos recorrentes. Este endpoint deve receber um identificadorPagamento e um endToEndId válido como parâmetros. Também é possivel informar o campo valor no body da requisição para especificar um valor para a nova parcela, se não informado o sistema entende que a nova parcela terá o mesmo valor da pacela anterior.
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{
     *  identificadorPagamento: string
     *  endToEndId: string
     *  }} params
     * @param {{
     *  valor: string
     * }} body
     *
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  redirectURI: string,
     * }>}
     */
    ofReplaceRecurrencyPixParcel(params: {
        identificadorPagamento: string;
        endToEndId: string;
    }, body: {
        valor: string;
    }): Promise<{
        identificadorPagamento: string;
        redirectURI: string;
    }>;
    /**
     * **POST /v1/jsr/vinculos**
     *
     * Este endpoint permite a criação de um novo vínculo na jornada sem redirecionamento, possibilitando o registro de vínculos com diferentes detentoras de conta. Esses vínculos poderão ser utilizados posteriormente para a iniciação de pagamentos, promovendo maior flexibilidade no processo. O corpo da requisição deve incluir informações essenciais sobre o pagador: CPF ou CNPJ e o idParticipante da instituição detentora onde a conta do pagador está localizada.
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{}} params
     *
     * @param {{
     *  pagador: {
     *    idParticipante: string
     *    cpf: string
     *    cnpj?: string
     *  }
     * }} body
     *
     * @returns { Promise<{
     *  identificadorVinculo: string,
     *  redirectURI: string,
     * }>}
     */
    ofCreateBiometricEnrollment(params: {}, body: {
        pagador: {
            idParticipante: string;
            cpf: string;
            cnpj?: string;
        };
    }): Promise<{
        identificadorVinculo: string;
        redirectURI: string;
    }>;
    /**
     * **GET /v1/jsr/vinculos**
     *
     * Esse endpoint recupera todos os vínculos associados ao usuário informado. Este endpoint permite consultar os vínculos utilizando o CPF obrigatório e, opcionalmente, o CNPJ para filtrar resultados. A resposta contém uma lista de vínculos que podem ser utilizados para operações futuras, como a iniciação de pagamentos e gestão dos mesmos.
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{
     *  cpf: string,
     *  cnpj?: string
     * }} params
     * @param {{}} body
     *
     * @returns { Promise<{
     *  vinculos: Array<{
     *      identificador: string,
     *      dataAutorizacao: string,
     *      dataExpiracao: string,
     *      limiteDiario: string,
     *      limiteTransacao: string,
     *      conta: {
     *          numero: string,
     *          agencia: string,
     *          ispb: string,
     *          tipo: string
     *      },
     *      participante: {
     *          identificador: string,
     *          nome: string,
     *          descricao: string,
     *          logo: string
     *      }
     *  }>
     * }>}
     */
    ofListBiometricEnrollment(params: {
        cpf: string;
        cnpj?: string;
    }, body: {}): Promise<{
        vinculos: Array<{
            identificador: string;
            dataAutorizacao: string;
            dataExpiracao: string;
            limiteDiario: string;
            limiteTransacao: string;
            conta: {
                numero: string;
                agencia: string;
                ispb: string;
                tipo: string;
            };
            participante: {
                identificador: string;
                nome: string;
                descricao: string;
                logo: string;
            };
        }>;
    }>;
    /**
     * **POST /v1/jsr/pagamentos/pix**
     *
     * Este endpoint permite a criação de um novo pagamento na jornada sem redirecionamento.
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{}} params
     * @param {{
     *  identificadorVinculo: string,
     *  favorecido: {
     *      contaBanco?: {
     *          nome: string,
     *          documento: string,
     *          codigoBanco: string,
     *          agencia: string,
     *          conta: string,
     *          tipoConta: 'CACC' | 'SVGS' | 'TRAN'
     *      },
     *      chave?: string
     *  },
     *  pagamento: {
     *      valor: string,
     *      codigoBanco?: string,
     *      infoPagador?: string,
     *      idProprio?: string,
     *      qrCode?: string,
     *      identificadorTransacao?: string,
     *  }
     * }} body
     *
     * @returns { Promise<{
     *  identificadorPagamento: string,
     *  redirectURI: string,
     * }>}
     */
    ofCreateBiometricPixPayment(params: {}, body: {
        identificadorVinculo: string;
        favorecido: {
            contaBanco?: {
                nome: string;
                documento: string;
                codigoBanco: string;
                agencia: string;
                conta: string;
                tipoConta: 'CACC' | 'SVGS' | 'TRAN';
            };
            chave?: string;
        };
        pagamento: {
            valor: string;
            codigoBanco?: string;
            infoPagador?: string;
            idProprio?: string;
            qrCode?: string;
            identificadorTransacao?: string;
        };
    }): Promise<{
        identificadorPagamento: string;
        redirectURI: string;
    }>;
    /**
     * **GET /v1/jsr/pagamentos/pix**
     *
     * O endpoint em questão é uma ferramenta de pesquisa. Ele permite que o usuário busque por um pagamento específico, por pagamentos que possuem um status especifico ou por pagamentos que atendem ou não um critério dentro de um determinado período.
     *
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `nome` e `mensagem`.
     *
     * @param {{
     *  inicio: string,
     *  fim: string,
     *  status?: 'pendente' | 'rejeitado' | 'aceito' | 'expirado' | 'cancelado',
     *  identificador?: string
     * }} params
     * @param {{}} body
     *
     * @returns { Promise<{
     *  vinculos: Array<{
     *      identificadorPagamento: string,
     *      endToEndId: string,
     *      valor: string,
     *      status: 'pendente' | 'rejeitado' | 'aceito' | 'expirado',
     *      dataCriacao: string,
     *      idProprio: string,
     *      devolucoes?: Array<{
     *          identificadorDevolucao: string,
     *          valor: string,
     *          status: 'pendente' | 'rejeitado' | 'aceito',
     *          dataCriacao: string
     *      }>
     *  }>
     * }>}
     */
    ofListBiometricPixPayment(params: {
        inicio: string;
        fim: string;
        status?: 'pendente' | 'rejeitado' | 'aceito' | 'expirado' | 'cancelado';
        identificador?: string;
    }, body: {}): Promise<{
        vinculos: Array<{
            identificadorPagamento: string;
            endToEndId: string;
            valor: string;
            status: 'pendente' | 'rejeitado' | 'aceito' | 'expirado';
            dataCriacao: string;
            idProprio: string;
            devolucoes?: Array<{
                identificadorDevolucao: string;
                valor: string;
                status: 'pendente' | 'rejeitado' | 'aceito';
                dataCriacao: string;
            }>;
        }>;
    }>;
}
import { PixMethods } from "./pix";

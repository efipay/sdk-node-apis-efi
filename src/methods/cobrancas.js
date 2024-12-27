// @ts-nocheck
import { ExtratosMethods } from "./extratos";

export class CobrancasMethods extends ExtratosMethods {

    /**
     * **POST /v1/charge/one-step**
     * 
     * Criação de transação em One Step (Um passo)
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente contidos em juridical_person
     * 
     * Obs: Caso utilize o campo configurations interest, se optar por utilizar apenas o valor, o tipo será considerado como "daily"
     * 
     * @param { {} } params
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number,
     *     marketplace?: {
     *       mode?: string,
     *       repasses: Array<{
     *         payee_code: string,
     *         percentage?: number,
     *         fixed?: number
     *       }>
     *     }
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number,
     *     payee_code?: string
     *   }>,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   },
     *   payment: {
     *     banking_billet?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email?: string,
     *         phone_number?: string,
     *         birth?: string,
     *         address?: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       expire_at: string,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       conditional_discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number,
     *         until_date: string
     *       },
     *       configurations?: {
     *         days_to_write_off?: number,
     *         fine?: number,
     *         interest?: {
     *           value: number,
     *           type: 'monthly' | 'daily'
     *         } | number
     *       },
     *       message?: string
     *     },
     *     credit_card?: {
     *       customer: {
     *         name: string,
     *         cpf: string,
     *         email: string,
     *         phone_number?: string,
     *         birth?: string,
     *         address?: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       installments: number,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       billing_address?: {
     *         street: string,
     *         number: string,
     *         neighborhood: string,
     *         zipcode: string,
     *         city: string,
     *         complement?: string,
     *         state: string
     *       },
     *       payment_token: string,
     *       message?: string
     *     }
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     total: number,
     *     status: string,
     *     barcode?: string,
     *     pix?: {
     *          qrcode: string,
     *          qrcode_image: string
     *      }
     *     link?: string,
     *     billet_link?: string,
     *     pdf?: {
     *          charge: string
     *     },
     *     expire_at?: string,
     *     installments?: number,
     *     installment_value?: number,
     *     refusal?: {
     *          reason: string,
     *          retry: boolean
     *      }
     *     payment: string,
     *   }
     * }>} 
     */
    createOneStepCharge(params, body) { }

    /**
     * **POST /v1/charge**
     * 
     * Criar transação
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { {} } params
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number,
     *     marketplace?: {
     *       payee_code: string,
     *       percentage?: number
     *     }
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number,
     *     payee_code?: string
     *   }>,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     total: number,
     *     status: string,
     *     custom_id: string | null,
     *     created_at: string,
     *   }
     * }>} 
     */
    createCharge(params, body) { }

    /**
     * **POST /v1/charge/:id/pay**
     * 
     * Associar à forma de pagamento
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente contidos em juridical_person
     * 
     * Obs: Caso utilize o campo configurations interest, se optar por utilizar apenas o valor, o tipo será considerado como "daily"
     * 
     * @param { { id: number } } params 
     * @param { {
     *   payment: {
     *     banking_billet?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email: string,
     *         phone_number?: string,
     *         birth?: string,
     *         address: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       expire_at: string,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       conditional_discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number,
     *         until_date: string
     *       },
     *       configurations?: {
     *         days_to_write_off?: number,
     *         fine?: number,
     *         interest?: {
     *           value: number,
     *           type: 'monthly' | 'daily'
     *         } | number
     *       },
     *       message?: string
     *     },
     *     credit_card?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email: string,
     *         phone_number?: string,
     *         birth?: string,
     *         address: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       installments: number,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       billing_address: {
     *         street: string,
     *         number: string,
     *         neighborhood: string,
     *         zipcode: string,
     *         city: string,
     *         complement?: string,
     *         state: string
     *       },
     *       payment_token: string,
     *       message?: string
     *     }
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     total: number,
     *     status: string,
     *     reason?: string | null,
     *     payment: string
     *     barcode: string,
     *     pix?: {
     *       qrcode: string,
     *       qrcode_image: string
     *     },
     *     link?: string,
     *     pdf?: {
     *       charge: string
     *     },
     *     expire_at?: string,
     *     configurations?: {
     *       days_to_write_off: number,
     *       interest_type?: 'monthly'| 'daily',
     *       interest?: number,
     *       fine?: number
     *     }
     *     installments?: number,
     *     installment_value?: number
     *   }
     * }>} 
     */
    definePayMethod(params, body) { }

    /**
     * **GET /v1/charge/:id**
     * 
     * Retornar informações de transação existente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     total: number,
     *     status: string,
     *     reason?: string,
     *     custom_id: string | null,
     *     created_at: string,
     *     notification_url: string | null,
     *     items: Array<{
     *       name: string,
     *       value: number,
     *       amount: number
     *     }>,
     *     shippings?: Array<{
     *       name: string,
     *       value: number,
     *       payee_code: string
     *     }>,
     *     history: Array<{
     *       message: string,
     *       created_at: string
     *     }>,
     *     customer?: {
     *       name: string | null,
     *       cpf: string | null,
     *       birth?: string,
     *       email?: string,
     *       phone_number?: string,
     *       address?: {
     *         street: string,
     *         number: string,
     *         complement: string | null,
     *         neighborhood: string,
     *         city: string,
     *         state: string,
     *         zipcode: string
     *       }
     *     },
     *     payment?: {
     *       method: string,
     *       created_at: string,
     *       message: string | null,
     *       banking_billet?: {
     *         barcode: string,
     *         pix?: {
     *           qrcode: string,
     *           qrcode_image: string
     *         },
     *         link: string,
     *         pdf: {
     *           charge: string
     *         },
     *         expire_at: string
     *       },
     *       credit_card?: {
     *         mask: string,
     *         installments: number,
     *         installment_value: number,
     *         address: {
     *           street: string,
     *           number: string,
     *           complement: string | null,
     *           neighborhood: string,
     *           city: string,
     *           state: string,
     *           zipcode: string
     *         }
     *       },
     *       carnet?: {
     *         parcel: number,
     *         barcode: string,
     *         pix?: {
     *           qrcode: string,
     *           qrcode_image: string
     *         },
     *         url: string,
     *         parcel_link: string,
     *         pdf: {
     *           charge: string
     *         },
     *         expire_at: string,
     *         configurations?: {
     *           days_to_write_off?: number,
     *           interest_type?: 'monthly' | 'daily',
     *           interest?: number,
     *           fine?: number
     *         }
     *       }
     *     },
     *     link?: {
     *       billet_discount: number | null,
     *       card_discount: number | null,
     *       conditional_discount_value: number | null,
     *       conditional_discount_type: string | null,
     *       conditional_discount_date: string | null,
     *       message: string | null,
     *       expire_at: string,
     *       request_delivery_address: boolean,
     *       payment_method: string,
     *       payment_url: string
     *     }
     *   }
     * }>} 
     */
    detailCharge(params) { }

    /**
     * **GET /v1/charges**
     * 
     * Retornar lista de cobranças
     * 
     * Este endpoint possui filtros para afunilar os resultados da busca, tais como CPF/CNPJ e status. 
     * Dentre todos os filtros disponíveis, os filtros charge_type, begin_date e end_date são obrigatórios e representam o tipo da transação e o intervalo de datas em que as cobranças consultadas devem estar compreendidas.
     * 
     * @param {{
     *  begin_date: string,
     *  end_date: string,
     *  charge_type: 'billet' | 'card' | 'carnet' | 'subscription',
     *  status?: 'new' | 'waiting' | 'link' | 'paid' | 'unpaid' | 'canceled' | 'identified' | 'settled'
     *  date_of?: 'creation' | 'payment' | 'expired',
     *  customer_document?: string,
     *  custom_id?: string,
     *  value?: number,
     *  limit?: number,
     *  page?: number,
     *  offset?: number
     * }} params 
     * 
     * @returns {Promise<{
     *  code: number,
     *  data: Array<{
     *     id: number,
     *     total: number,
     *     status: string,
     *     custom_id: string | null,
     *     created_at: string,
     *     customer: {
     *       phone_number: string | null,
     *       cnpj?: string,  
     *       cpf?: string
     *       name?: string
     *       corporate_name?: string
     *     },
     *     payment?: {
     *       payment_method: string,
     *       paid_at: string | null,
     *       pix?: {
     *         qrcode: string,
     *         qrcode_image: string 
     *      }
     *      banking_billet?: {
     *         barcode: string,
     *         link: string,
     *         expire_at: string
     *         pdf: {
     *           charge: string
     *         }
     *       },
     *       carnet?: {
     *         parcel: number,
     *         barcode: string,
     *         expire_at: string,
     *         link: string,
     *         configurations: {
     *           days_to_write_off: number,
     *           interest_type?: 'monthly' | 'daily',
     *           interest: number,
     *           fine: number
     *         }
     *         pdf: {
     *           charge: string
     *         },
     *       }
     *     },
     *     link?: {
     *       billet_discount: number | null,
     *       card_discount: number | null,
     *       conditional_discount_value: number | null,
     *       conditional_discount_type: 'percentage' | 'currency' | null,
     *       conditional_discount_date: string | null,
     *       message: string | null,
     *       expire_at: string,
     *       request_delivery_address: boolean,
     *       payment_method: 'banking_billet' | 'credit_card' | 'all',
     *       payment_url: string
     *     }
     *   }>
     * >}
     */
    listCharges(params) { }

    /**
     * **PUT /v1/charge/:id/metadata**
     * 
     * Incluir "notification_url" e "custom_id" em uma transação existente
     * 
     * - O atributo `resend` diz se será realizado o reenvio da notificação após a alteração ser aplicada.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     * 		notification_url?: string,
     * 		custom_id?: string,
     * 		resend?: boolean
     * 	} } body
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    updateChargeMetadata(params, body) { }

    /**
     * **PUT /v1/charge/:id/billet** 
     * 
     * Altera a data de vencimento de uma transação existente.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: A nova data de vencimento deve ser pelo menos maior que a data atual.
     * 
     * @param { { id: number } } params 
     * @param { { expire_at: string }} body
     * 
     * @returns {Promise<{
     *  code: number,
     * }>}
     */
    updateBillet(params, body) { }

    /**
     * **PUT /v1/charge/:id/cancel**
     * 
     * Cancela uma transação existente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *  code: number,
     * }>}
     */
    cancelCharge(params) { }

    /**
     * **POST /v1/charge/:id/billet/resend**
     * 
     * Reenvio do boleto bancário para o email desejado
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { { email: string }} body 
     * 
     * @returns {Promise<{
     *  code: number,
     * }>}
     */
    sendBilletEmail(params, body) { }

    /**
     * **POST /v1/charge/:id/history**
     * 
     * Acrescentar descrição ao histórico de uma transação
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { { description: string }} body 
     * 
     * @returns {Promise<{
     *  code: number,
     * }>}
     */
    createChargeHistory(params, body) { }

    /**
     * **POST /v1/charge/:id/balance-sheet**
     * 
     * Define que a transação será do tipo boleto balancete.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *   title: string,
     *   body: Array<{
     *     header: string,
     *     tables: Array<{
     *       rows: Array<Array<{
     *         align: string,
     *         color: string,
     *         style: string,
     *         text: string,
     *         colspan: number
     *       }>>
     *     }>
     *   }>
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     * }>} 
     */
    defineBalanceSheetBillet(params, body) { }

    /**
     * **PUT /v1/charge/:id/settle**
     * 
     * Marcar como pago (baixa manual) uma determinada transação
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   code: number,
     * }>} 
     */
    settleCharge(params) { }

    /**
     * **POST /v1/charge/:id/retry**
     * 
     * Retentativa de pagamento via cartão de crédito
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente contidos em juridical_person
     * 
     * @param { { id: number } } params 
     * @param { {
     *   payment: {
     *     credit_card: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email: string,
     *         birth: string,
     *         phone_number?: string,
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       billing_address: {
     *         street: string,
     *         number: string,
     *         neighborhood: string,
     *         zipcode: string,
     *         city: string,
     *         complement: string,
     *         state: string
     *       },
     *       payment_token: string
     *     }
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     installments: number,
     *     installment_value: number,
     *     charge_id: number,
     *     status: string,
     *     total: number,
     *     payment: string
     *   }
     * }>} 
     */
    cardPaymentRetry(params, body) { }

    /**
     * **POST /v1/charge/card/:id/refund**
     * 
     * Estorno de pagamento via cartão de crédito
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { { amount?: number } } body 
     * 
     * @returns {Promise<{
     *   code: number,
     *   message: string,
     * }>}
     */
    refundCard(params, body) { }

    /**
     * **GET /v1/installments**
     * 
     * Listar parcelas de acordo com a bandeira do cartão
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { {
     *  total: number,
     *  brand: 'visa' | 'mastercard' | 'amex' | 'elo' | 'hipercard'
     *  } } params 
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     rate: number,
     *     name: string,
     *     installments: Array<{
     *       installment: number,
     *       has_interest: boolean,
     *       value: number,
     *       currency: string,
     *       interest_percentage: number
     *     }>
     *   }
     * }>}
     */
    getInstallments(params) { }

    /**
     * **POST /v1/carnet**
     * 
     * Cria um novo carnê.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente contidos em juridical_person
     * 
     * @param { {} } params 
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number
     *   }>,
     *   customer: {
     *     name?: string,
     *     cpf?: string,
     *     email?: string,
     *     phone_number?: string,
     *     birth?: string,
     *     address?: {
     *       street: string,
     *       number: string,
     *       neighborhood: string,
     *       zipcode: string,
     *       city: string,
     *       complement?: string,
     *       state: string
     *     },
     *     juridical_person?: {
     *       corporate_name: string,
     *       cnpj: string
     *     }
     *   },
     *   expire_at: string,
     *   repeats: number,
     *   split_items?: boolean,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   },
     *   configurations?: {
     *     fine?: number,
     *     interest?: {
     *           value: number,
     *           type: 'monthly' | 'daily'
     *     } | number
     *   },
     *   message?: string,
     *   discount?: {
     *     type: 'percentage' | 'currency',
     *     value: number
     *   },
     *   conditional_discount?: {
     *     type: 'percentage' | 'currency',
     *     value: number,
     *     until_date: string
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     carnet_id: number,
     *     status: string,
     *     cover: string,
     *     link: string,
     *     carnet_link: string,
     *     pdf: {
     *       carnet: string,
     *       cover: string
     *     },
     *     charges: Array<{
     *       charge_id: number,
     *       parcel: string,
     *       status: string,
     *       value: number,
     *       expire_at: string,
     *       url: string,
     *       parcel_link: string,
     *       pdf: {
     *         charge: string
     *       },
     *       barcode: string,
     *       pix?: {
     *         qrcode: string,
     *         qrcode_image: string
     *       }
     *     }>
     *   }
     * }>} 
     */
    createCarnet(params, body) { }

    /**
     * **GET /v1/carnet/:id**
     * 
     * Obtém os detalhes de um carnê específico.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     carnet_id: number,
     *     status: string,
     *     repeats: number,
     *     cover: string,
     *     link: string,
     *     pdf: {
     *       carnet: string,
     *       cover: string
     *     },
     *     value: number,
     *     custom_id: string | null,
     *     notification_url: string | null,
     *     split_items: boolean,
     *     charges: Array<{
     *       charge_id: number,
     *       status: string,
     *       url: string,
     *       pdf: {
     *         charge: string
     *       },
     *       barcode: string,
     *       pix: {
     *         qrcode: string,
     *         qrcode_image: string
     *       },
     *       parcel: number,
     *       expire_at: string,
     *       configurations?: {
     *           days_to_write_off?: number,
     *           interest_type?: 'monthly' | 'daily',
     *           interest?: number,
     *           fine?: number
     *       }
     *     }>,
     *     created_at: string,
     *     history: Array<{
     *       message: string,
     *       created_at: string
     *     }>
     *   }
     * }>} 
     */
    detailCarnet(params) { }

    /**
     * **PUT /v1/carnet/:id/metadata**
     * 
     * Incluir "notification_url" e "custom_id" em um carnê existente
     * 
     * - O atributo `resend` diz se será realizado o reenvio da notificação após a alteração ser aplicada.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     * 		notification_url?: string,
     * 		custom_id?: string,
     * 		resend?: boolean
     * 	} } body
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    updateCarnetMetadata(params, body) { }

    /**
     * **PUT /v1/carnet/:id/parcel/:parcel**
     * 
     * Alterar vencimento de parcela específica do carnê
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { 
     *  id: number,
     *  parcel: number,
     * } } params 
     * @param {{
     *  expire_at: string
     * }} body 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    updateCarnetParcel(params, body) { }

    /**
     * **PUT /v1/carnet/:id/parcels**
     * 
     * Alterar vencimento de parcelas de um carnê
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param {{
     *  expire_at: string
     * }} body 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    updateCarnetParcels(params, body) { }

    /**
     * **PUT /v1/carnet/:id/cancel**
     * 
     * Cancelar um carnê
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    cancelCarnet(params) { }

    /**
     * **PUT /v1/carnet/:id/parcel/:parcel/cancel**
     * 
     * Cancelar parcela específica de carnê
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { {
     *  id: number,
     *  parcel: number
     *  } } params 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    cancelCarnetParcel(params) { }

    /**
     * **POST /v1/carnet/:id/resend**
     * 
     * Reenvio do carnê para o email desejado
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { { email: string } } body 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    sendCarnetEmail(params, body) { }

    /**
     * **POST /v1/carnet/:id/parcel/:parcel/resend**
     * 
     * Reenvio de uma parcela específica de carnê por e-mail
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { {
     *  id: number,
     *  parcel: number
     * } } params 
     * @param { { email: string } } body 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    sendCarnetParcelEmail(params, body) { }

    /**
     * **POST /v1/carnet/:id/history**
     * 
     * Acrescentar descrição ao histórico de uma transação
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { { 
     *  description: string
     * } } body 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    createCarnetHistory(params, body) { }

    /**
     * **PUT /v1/carnet/:id/settle**
     * 
     * Marcar como pago (baixa manual) um determinado carnê
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    settleCarnet(params) { }

    /**
     * **PUT /v1/carnet/:id/parcel/:parcel/settle**
     * 
     * Marcar como pago determinada parcela de carnê
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { {
     *  id: number,
     *  parcel: number
     * } } params 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    settleCarnetParcel(params) { }

    /**
     * **POST /v1/plan**
     * 
     * Crie o plano de assinatura
     * 
     * - `name` - Nome do plano de assinatura;
     * - `interval` (em meses) - Periodicidade da cobrança (por exemplo, 1 para mensal);
     * - `repeats` - Quantas cobranças devem ser geradas para esse plano. Se nada for enviado, a cobrança é gerada por tempo indeterminado ou até que o plano seja cancelado.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { {} } params 
     * @param { {
     *  name: string,
     *  interval: number,
     *  repeats?: number
     * } } body 
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     plan_id: number,
     *     name: string,
     *     interval: number,
     *     repeats: number | null,
     *     created_at: string
     *   }
     * }>}
     */
    createPlan(params, body) { }

    /**
     * **GET /v1/plans**
     * 
     * Obtém a lista de planos de assinatura.
     * 
     * - `name`: retorna resultados a partir da procura pelo nome do plano cadastrado previamente;
     * - `limit`: limite máximo de registros de resposta;
     * - `offset`: determina a partir de qual registro a busca será realizada.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { name?: string, limit?: number, offset?: number } } params
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: Array<{
     *     plan_id: number,
     *     name: string,
     *     interval: number,
     *     repeats: number | null,
     *     created_at: string
     *   }>
     * }>}
     */
    listPlans(params) { }

    /**
     * **PUT /v1/plan/:id**
     * 
     * Permitir a edição do nome do plano de assinatura
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *  name: string
     *  } } body 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>}  
     */
    updatePlan(params, body) { }

    /**
     * **DELETE /v1/plan/:id**
     * 
     * Cancelar um plano de assinatura
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    deletePlan(params) { }

    /**
     * **POST /v1/plan/:id/subscription/one-step**
     * 
     * Crie inscrições (assinaturas) para vincular ao plano em One Step
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente contidos em juridical_person
     * 
     * @param { { id: number } } params 
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number,
     *     payee_code?: string
     *   }>,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   },
     *   payment: {
     *     banking_billet?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email?: string,
     *         phone_number?: string,
     *         birth?: string,
     *         address?: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       expire_at: string,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       conditional_discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number,
     *         until_date: string
     *       },
     *       configurations?: {
     *         fine?: number,
     *         interest?: {
     *           value: number,
     *           type: 'monthly' | 'daily'
     *         } | number
     *       },
     *       message?: string
     *     },
     *     credit_card?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email: string,
     *         phone_number: string,
     *         birth: string,
     *         address?: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       billing_address: {
     *         street: string,
     *         number: string,
     *         neighborhood: string,
     *         zipcode: string,
     *         city: string,
     *         complement?: string,
     *         state: string
     *       },
     *       payment_token: string,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       message?: string,
     *       trial_days?: number
     *     }
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     subscription_id: number,
     *     status: string,
     *     barcode?: string,
     *     link?: string,
     *     billet_link?: string,
     *     pdf?: {
     *       charge: string
     *     },
     *     expire_at?: string,
     *     plan: {
     *       id: number,
     *       interval: number,
     *       repeats: number | null
     *     },
     *     charge: {
     *       id: number,
     *       status: string,
     *       parcel: number,
     *       total: number
     *     },
     *     first_execution: string,
     *     total: number,
     *     payment: string
     *   }
     * }>} 
     */
    createOneStepSubscription(params, body) { }

    /**
     * **POST /v1/plan/:id/subscription**
     * 
     * Crie inscrições (assinaturas) para vincular ao plano
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number,
     *     payee_code?: string
     *   }>,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     subscription_id: number,
     *     status: string,
     *     custom_id: string | null,
     *     charges: Array<{
     *       charge_id: number,
     *       status: string,
     *       total: number,
     *       parcel: number
     *     }>,
     *     created_at: string
     *   }
     * }>} 
     */
    createSubscription(params, body) { }

    /**
     * **POST /v1/subscription/:id/pay**
     * 
     * Defina a forma de pagamento da assinatura e os dados do cliente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * Obs: Para Pessoa Jurídica não serão obrigatórios o nome e CPF, apenas os demais dados do cliente contidos em juridical_person
     * 
     * @param { { id: number } } params 
     * @param { {
     *   payment: {
     *     banking_billet?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email?: string,
     *         phone_number?: string,
     *         birth?: string,
     *         address?: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       expire_at: string,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       conditional_discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number,
     *         until_date: string
     *       },
     *       configurations?: {
     *         fine?: number,
     *         interest?: {
     *           value: number,
     *           type: 'monthly' | 'daily'
     *         } | number
     *       },
     *       message?: string
     *     },
     *     credit_card?: {
     *       customer: {
     *         name?: string,
     *         cpf?: string,
     *         email: string,
     *         phone_number: string,
     *         birth: string,
     *         address?: {
     *           street: string,
     *           number: string,
     *           neighborhood: string,
     *           zipcode: string,
     *           city: string,
     *           complement?: string,
     *           state: string
     *         },
     *         juridical_person?: {
     *           corporate_name: string,
     *           cnpj: string
     *         }
     *       },
     *       billing_address: {
     *         street: string,
     *         number: string,
     *         neighborhood: string,
     *         zipcode: string,
     *         city: string,
     *         complement?: string,
     *         state: string
     *       },
     *       payment_token: string,
     *       discount?: {
     *         type: 'percentage' | 'currency',
     *         value: number
     *       },
     *       message?: string,
     *       trial_days?: number
     *     }
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     subscription_id: number,
     *     status: string,
     *     barcode?: string,
     *     link?: string,
     *     billet_link?: string,
     *     pdf?: {
     *       charge: string
     *     },
     *     expire_at?: string,
     *     plan: {
     *       id: number,
     *       interval: number,
     *       repeats: number | null
     *     },
     *     charge: {
     *       id: number,
     *       status: string,
     *       parcel: number,
     *       total: number
     *     },
     *     first_execution: string,
     *     total: number,
     *     payment: string
     *   }
     * }>} 
     */
    defineSubscriptionPayMethod(params, body) { }

    /**
     * **GET /v1/subscription/:id**
     * 
     * Obtém detalhes de uma assinatura específica.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     subscription_id: number,
     *     value: number,
     *     status: string,
     *     custom_id: string | null,
     *     notification_url: string | null,
     *     payment_method: string | null,
     *     next_execution: string | null,
     *     next_expire_at: string | null,
     *     plan: {
     *       plan_id: number,
     *       name: string,
     *       interval: number,
     *       repeats: number | null
     *     },
     *     occurrences: number,
     *     created_at: string,
     *     history: Array<{
     *       charge_id: number,
     *       status: string,
     *       created_at: string
     *     }>
     *   }
     * }>} 
     */
    detailSubscription(params) { }

    /**
     * **POST /v1/plan/:id/subscription/one-step/link**
     * 
     * Associar plano ao link de pagamento
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number,
     *     marketplace?: {
     *       payee_code: string,
     *       percentage: number
     *     }
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number,
     *     payee_code?: string
     *   }>,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   },
     *   settings: {
     *     billet_discount?: number,
     *     card_discount?: number,
     *     conditional_discount?: {
     *       type: 'percentage' | 'currency',
     *       value: number,
     *       until_date: string
     *     },
     *     message?: string,
     *     expire_at: string,
     *     request_delivery_address: boolean,
     *     payment_method: 'banking_billet' | 'credit_card' | 'all'
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     subscription_id: number,
     *     status: string,
     *     custom_id: string | null,
     *     charge: {
     *       id: number,
     *       status: string,
     *       total: number,
     *       parcel: number
     *     },
     *     payment_url: string,
     *     payment_method: string,
     *     conditional_discount_date: string | null,
     *     request_delivery_address: boolean,
     *     expire_at: string,
     *     created_at: string
     *   }
     * }>} 
     */
    createOneStepSubscriptionLink(params, body) { }

    /**
     * **PUT /v1/subscription/:id/metadata**
     * 
     * Incluir "notification_url" e "custom_id" em uma assinatura existente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     * 		notification_url?: string,
     * 		custom_id?: string,
     * 		resend?: boolean
     * 	} } body
     * 
     * @returns {Promise<{
     * 	code: number,
     * }>} 
     */
    updateSubscriptionMetadata(params, body) { }

    /**
     * **PUT /v1/subscription/:id**
     * 
     * Alterar dados de uma assinatura
     * 
     * Somente assinaturas do tipo Cartão de Crédito podem ser alteradas.
     * Para alterar os dados de uma assinatura existente, é necessário que o método de pagamento definido seja cartão de crédito.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *   plan_id?: number,
     *   customer?: {
     *     email?: string,
     *     phone_number?: string
     *   },
     *   items?: Array<{
     *     name: string,
     *     value: number,
     *     amount: number
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number
     *   }>
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     subscription_id: number,
     *     status: string,
     *     value: number,
     *     custom_id: string | null,
     *     notification_url: string | null,
     *     payment_method: string,
     *     next_execution: string,
     *     next_expire_at: string,
     *     plan: {
     *       plan_id: number,
     *       name: string,
     *       interval: number,
     *       repeats: number | null
     *     },
     *     customer: {
     *       email: string,
     *       phone_number: string
     *     },
     *     occurrences: number,
     *     created_at: string
     *   }
     * }>} 
     */
    updateSubscription(params, body) { }

    /**
     * **PUT /v1/subscription/:id/cancel**
     * 
     * Cancelar uma assinatura
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * 
     * @returns {Promise<{
     *  code: number
     * }>}
     */
    cancelSubscription(params) { }

    /**
     * **POST/v1/subscription/:id/history**
     * 
     * Acrescentar descrição ao histórico de uma assinatura
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *  description: string
     * } } body 
     * 
     * @returns {Promise<{
     *  code: number
     * }>}
     */
    createSubscriptionHistory(params, body) { }

    /**
     * **POST /v1/charge/:id/subscription/resend**
     * 
     * Reenvio do link associado ao plano para o email desejado
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *  email: string
     * } } body 
     * 
     * @returns {Promise<{
     *  code: number
     * }>}
     */
    sendSubscriptionLinkEmail(params, body) { }

    /**
     * **POST /v1/charge/one-step/link**
     * 
     * Criando o link de pagamento em One Step
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { } } params 
     * @param { {
     *   items: Array<{
     *     name: string,
     *     value: number,
     *     amount: number,
     *     marketplace?: {
     *       payee_code?: string,
     *       percentage?: number
     *     }
     *   }>,
     *   shippings?: Array<{
     *     name: string,
     *     value: number,
     *     payee_code?: string
     *   }>,
     *   metadata?: {
     *     custom_id?: string,
     *     notification_url?: string
     *   },
     *   customer?: {
     *     email: string
     *   },
     *   settings: {
     *     billet_discount?: number,
     *     card_discount?: number,
     *     conditional_discount?: {
     *       type: 'percentage' | 'currency',
     *       value: number,
     *       until_date: string
     *     },
     *     message?: string,
     *     expire_at: string,
     *     request_delivery_address: boolean,
     *     payment_method: 'banking_billet' | 'credit_card' | 'all'
     *   }
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     status: string,
     *     total: number,
     *     custom_id: string | null,
     *     payment_url: string,
     *     payment_method: string,
     *     billet_discount: number | null,
     *     card_discount: number | null,
     *     conditional_discount_value: number | null,
     *     conditional_discount_type: string | null,
     *     conditional_discount_date: string | null,
     *     request_delivery_address: boolean,
     *     message: string | null,
     *     expire_at: string,
     *     created_at: string
     *   }
     * }>} 
     */
    createOneStepLink(params, body) { }

    /**
     * **POST /v1/charge/:id/link**
     * 
     * Cria um link de pagamento para uma cobrança existente.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *   billet_discount?: number,
     *   card_discount?: number,
     *   conditional_discount?: {
     *     type: 'percentage' | 'currency',
     *     value: number,
     *     until_date: string
     *   },
     *   message?: string,
     *   expire_at: string,
     *   request_delivery_address: boolean,
     *   payment_method: 'banking_billet' | 'credit_card' | 'all'
     * } } body
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     status: string,
     *     total: number,
     *     custom_id: string | null,
     *     payment_url: string,
     *     payment_method: string,
     *     conditional_discount_date: string | null,
     *     conditional_discount_value?: number,
     *     conditional_discount_type?: 'percentage' | 'currency',
     *     billet_discount?: number,
     *     card_discount?: number,
     *     created_at: string
     *   }
     * }>} 
     */
    defineLinkPayMethod(params, body) { }

    /**
     * **PUT /v1/charge/:id/link**
     * 
     * Alterar determinados parâmetros/atributos de um link de pagamento existente
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *  billet_discount?: number,
     *  card_discount?: number
     *  conditional_discount?: {
     *     type: 'percentage' | 'currency',
     *     value: number,
     *     until_date: string
     *  },
     *  message?: string,
     *  expire_at: string,
     *  request_delivery_address: boolean,
     *  payment_method: 'banking_billet' | 'credit_card' | 'all'
     * }} body 
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: {
     *     charge_id: number,
     *     status: string,
     *     total: number,
     *     custom_id: string | null,
     *     payment_url: string,
     *     payment_method: string,
     *     conditional_discount_date: string | null,
     *     conditional_discount_value?: number,
     *     conditional_discount_type?: 'percentage' | 'currency',
     *     billet_discount?: number,
     *     card_discount?: number,
     *     created_at: string
     *   }
     * }>} 
     */
    updateChargeLink(params, body) { }

    /**
     * **POST /v1/charge/:id/link/resend**
     * 
     * Reenviar link de pagamento por e-mail
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     * 
     * @param { { id: number } } params 
     * @param { {
     *  email: string
     * }} body 
     * 
     * @returns {Promise<{
     *  code: number
     * }>}
     */
    sendLinkEmail(params, body) { }

    /**
     * **GET /v1/notification/:token**
     * 
     * Obtém as notificações de alterações de status para um token de notificação específico.
     * 
     * Para capturar uma falha utilize o `catch`, os campos disponíveis no objeto serão `code`, `error` e `error_description`.
     *  
     * @param { { token: string } } params
     * 
     * @returns {Promise<{
     *   code: number,
     *   data: Array<{
     *     created_at: string,
     *     custom_id: string | null,
     *     id: number,
     *     identifiers: {
     *       charge_id?: number,
     *       subscription_id?: number,
     *       carnet_id?: number
     *     },
     *     status: {
     *       current: string,
     *       previous: string | null
     *     },
     *     type: string,
     *     value?: number,
     *     received_by_bank_at?: string
     *   }>
     * }>}
     * 
     * 
     */
    getNotification(params) { }

}
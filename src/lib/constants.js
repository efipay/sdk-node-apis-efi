export default {
	APIS: {
		DEFAULT: {
			URL: {
				PRODUCTION: 'https://cobrancas.api.efipay.com.br/v1',
				SANDBOX: 'https://cobrancas-h.api.efipay.com.br/v1',
			},
			ENDPOINTS: {
				authorize: {
					route: '/authorize',
					method: 'post',
				},
				sendSubscriptionLinkEmail: {
					route: '/charge/:id/subscription/resend',
					method: 'post',
				},
				oneStepSubscription: {
					route: '/plan/:id/subscription/one-step',
					method: 'post',
				},
				settleCarnet: {
					route: '/carnet/:id/settle',
					method: 'put',
				},
				oneStepSubscriptionLink: {
					route: '/plan/:id/subscription/one-step/link',
					method: 'post',
				},
				sendLinkEmail: {
					route: '/charge/:id/link/resend',
					method: 'post',
				},
				createOneStepLink: {
					route: '/charge/one-step/link',
					method: 'post',
				},
				createCharge: {
					route: '/charge',
					method: 'post',
				},
				detailCharge: {
					route: '/charge/:id',
					method: 'get',
				},
				updateChargeMetadata: {
					route: '/charge/:id/metadata',
					method: 'put',
				},
				updateBillet: {
					route: '/charge/:id/billet',
					method: 'put',
				},
				definePayMethod: {
					route: '/charge/:id/pay',
					method: 'post',
				},
				cancelCharge: {
					route: '/charge/:id/cancel',
					method: 'put',
				},
				createCarnet: {
					route: '/carnet',
					method: 'post',
				},
				detailCarnet: {
					route: '/carnet/:id',
					method: 'get',
				},
				updateCarnetParcel: {
					route: '/carnet/:id/parcel/:parcel',
					method: 'put',
				},
				updateCarnetParcels: {
					route: '/carnet/:id/parcels',
					method: 'put',
				},
				updateCarnetMetadata: {
					route: '/carnet/:id/metadata',
					method: 'put',
				},
				getNotification: {
					route: '/notification/:token',
					method: 'get',
				},
				listPlans: {
					route: '/plans',
					method: 'get',
				},
				createPlan: {
					route: '/plan',
					method: 'post',
				},
				deletePlan: {
					route: '/plan/:id',
					method: 'delete',
				},
				createSubscription: {
					route: '/plan/:id/subscription',
					method: 'post',
				},
				createOneStepSubscription: {
					route: '/plan/:id/subscription/one-step',
					method: 'post',
				},
				createOneStepSubscriptionLink: {
					route: '/plan/:id/subscription/one-step/link',
					method: 'post'
				},
				detailSubscription: {
					route: '/subscription/:id',
					method: 'get',
				},
				defineSubscriptionPayMethod: {
					route: '/subscription/:id/pay',
					method: 'post',
				},
				cancelSubscription: {
					route: '/subscription/:id/cancel',
					method: 'put',
				},
				updateSubscriptionMetadata: {
					route: '/subscription/:id/metadata',
					method: 'put',
				},
				getInstallments: {
					route: '/installments',
					method: 'get',
				},
				sendBilletEmail: {
					route: '/charge/:id/billet/resend',
					method: 'post',
				},
				createChargeHistory: {
					route: '/charge/:id/history',
					method: 'post',
				},
				sendCarnetEmail: {
					route: '/carnet/:id/resend',
					method: 'post',
				},
				sendCarnetParcelEmail: {
					route: '/carnet/:id/parcel/:parcel/resend',
					method: 'post',
				},
				createCarnetHistory: {
					route: '/carnet/:id/history',
					method: 'post',
				},
				cancelCarnet: {
					route: '/carnet/:id/cancel',
					method: 'put',
				},
				cancelCarnetParcel: {
					route: '/carnet/:id/parcel/:parcel/cancel',
					method: 'put',
				},
				linkCharge: {
					route: '/charge/:id/link',
					method: 'post',
				},
				defineLinkPayMethod: {
					route: '/charge/:id/link',
					method: 'post',
				},
				updateChargeLink: {
					route: '/charge/:id/link',
					method: 'put',
				},
				updatePlan: {
					route: '/plan/:id',
					method: 'put',
				},
				updateSubscription: {
					route: '/subscription/:id',
					method: 'put'
				},
				createSubscriptionHistory: {
					route: '/subscription/:id/history',
					method: 'post',
				},
				defineBalanceSheetBillet: {
					route: '/charge/:id/balance-sheet',
					method: 'post',
				},
				settleCharge: {
					route: '/charge/:id/settle',
					method: 'put',
				},
				settleCarnetParcel: {
					route: '/carnet/:id/parcel/:parcel/settle',
					method: 'put',
				},
				createOneStepCharge: {
					route: '/charge/one-step',
					method: 'post',
				},
				cardPaymentRetry: {
					route: '/charge/:id/retry',
					method: 'post'
				},
				refundCard: {
					route: '/charge/card/:id/refund',
					method: 'post'
				},
				listCharges: {
					route: '/charges',
					method: 'get'
				},
			},
		},
		PIX: {
			URL: {
				PRODUCTION: 'https://pix.api.efipay.com.br',
				SANDBOX: 'https://pix-h.api.efipay.com.br',
			},
			ENDPOINTS: {
				authorize: {
					route: '/oauth/token',
					method: 'post',
				},
				pixCreateDueCharge: {
					route: '/v2/cobv/:txid',
					method: 'put',
				},
				pixUpdateDueCharge: {
					route: '/v2/cobv/:txid',
					method: 'patch',
				},
				pixDetailDueCharge: {
					route: '/v2/cobv/:txid',
					method: 'get',
				},
				pixListDueCharges: {
					route: '/v2/cobv/',
					method: 'get',
				},
				createReport: {
					route: '/v2/gn/relatorios/extrato-conciliacao',
					method: 'post',
				},
				detailReport: {
					route: '/v2/gn/relatorios/:id',
					method: 'get',
				},
				pixCreateCharge: {
					route: '/v2/cob/:txid',
					method: 'put',
				},
				pixUpdateCharge: {
					route: '/v2/cob/:txid',
					method: 'patch',
				},
				pixCreateImmediateCharge: {
					route: '/v2/cob',
					method: 'post',
				},
				pixDetailCharge: {
					route: '/v2/cob/:txid',
					method: 'get',
				},
				pixListCharges: {
					route: '/v2/cob',
					method: 'get',
				},
				pixDetailReceived: {
					route: '/v2/pix/:e2eId',
					method: 'get',
				},
				pixReceivedList: {
					route: '/v2/pix',
					method: 'get',
				},
				pixSend: {
					route: '/v3/gn/pix/:idEnvio',
					method: 'put',
				},
				pixSendDetail: {
					route: '/v2/gn/pix/enviados/:e2eid',
					method: 'get',
				},
				pixSendList: {
					route: '/v2/gn/pix/enviados',
					method: 'get',
				},
				pixDevolution: {
					route: '/v2/pix/:e2eId/devolucao/:id',
					method: 'put',
				},
				pixDetailDevolution: {
					route: '/v2/pix/:e2eId/devolucao/:id',
					method: 'get',
				},
				pixConfigWebhook: {
					route: '/v2/webhook/:chave',
					method: 'put',
				},
				pixDetailWebhook: {
					route: '/v2/webhook/:chave',
					method: 'get',
				},
				pixListWebhook: {
					route: '/v2/webhook',
					method: 'get',
				},
				pixDeleteWebhook: {
					route: '/v2/webhook/:chave',
					method: 'delete',
				},
				pixCreateLocation: {
					route: '/v2/loc',
					method: 'post',
				},
				pixLocationList: {
					route: '/v2/loc',
					method: 'get',
				},
				pixDetailLocation: {
					route: '/v2/loc/:id',
					method: 'get',
				},
				pixGenerateQRCode: {
					route: '/v2/loc/:id/qrcode',
					method: 'get',
				},
				pixUnlinkTxidLocation: {
					route: '/v2/loc/:id/txid',
					method: 'delete',
				},
				pixCreateEvp: {
					route: '/v2/gn/evp',
					method: 'post',
				},
				pixListEvp: {
					route: '/v2/gn/evp',
					method: 'get',
				},
				pixDeleteEvp: {
					route: '/v2/gn/evp/:chave',
					method: 'delete',
				},
				getAccountBalance: {
					route: '/v2/gn/saldo',
					method: 'get',
				},
				updateAccountConfig: {
					route: '/v2/gn/config',
					method: 'put',
				},
				listAccountConfig: {
					route: '/v2/gn/config',
					method: 'get',
				},
				pixSplitDetailCharge: {
					route: '/v2/gn/split/cob/:txid',
					method: 'get',
				},
				pixSplitLinkCharge: {
					route: '/v2/gn/split/cob/:txid/vinculo/:splitConfigId',
					method: 'put',
				},
				pixSplitUnlinkCharge: {
					route: '/v2/gn/split/cob/:txid/vinculo/:splitConfigId',
					method: 'delete',
				},
				pixSplitDetailDueCharge: {
					route: '/v2/gn/split/cobv/:txid',
					method: 'get',
				},
				pixSplitLinkDueCharge: {
					route: '/v2/gn/split/cobv/:txid/vinculo/:splitConfigId',
					method: 'put',
				},
				pixSplitUnlinkDueCharge: {
					route: '/v2/gn/split/cobv/:txid/vinculo/:splitConfigId',
					method: 'delete',
				},
				pixSplitConfig: {
					route: '/v2/gn/split/config',
					method: 'post',
				},
				pixSplitConfigId: {
					route: '/v2/gn/split/config/:id',
					method: 'put',
				},
				pixSplitDetailConfig: {
					route: '/v2/gn/split/config/:id',
					method: 'get',
				},
				pixSendDetailId: {
					route: '/v2/gn/pix/enviados/id-envio/:idEnvio',
					method: 'get',
				},
				pixCreateDueChargeBatch: {
					route: '/v2/lotecobv/:id',
					method: 'put',
				},
				pixUpdateDueChargeBatch: {
					route: '/v2/lotecobv/:id',
					method: 'patch',
				},
				pixDetailDueChargeBatch: {
					route: '/v2/lotecobv/:id',
					method: 'get',
				},
				pixListDueChargeBatch: {
					route: '/v2/lotecobv',
					method: 'get',
				},
				medDefense: {
					route: '/v2/gn/infracoes/:idInfracao/defesa',
					method: 'post',
				},
				medList: {
					route: '/v2/gn/infracoes',
					method: 'get',
				},
				pixQrCodeDetail: {
					route: '/v2/gn/qrcodes/detalhar',
					method: 'post'
				},
				pixQrCodePay: {
					route: '/v2/gn/pix/:idEnvio/qrcode',
					method: 'put'
				},
				pixResendWebhook: {
					route: '/v2/gn/webhook/reenviar',
					method: 'post'
				},
				pixGetReceipt: {
					route: '/v2/gn/pix/comprovantes',
					method: 'get'
				},
				pixDetailRecurrenceAutomatic: {
					route: '/v2/rec/:idRec',
					method: 'get'
				},
				pixUpdateRecurrenceAutomatic: {
					route: '/v2/rec/:idRec',
					method: 'patch'
				},
				pixListRecurrenceAutomatic: {
					route: '/v2/rec',
					method: 'get'
				},
				pixCreateRecurrenceAutomatic: {
					route: '/v2/rec',
					method: 'post'
				},
				pixCreateRequestRecurrenceAutomatic: {
					route: '/v2/solicrec',
					method: 'post'
				},
				pixDetailRequestRecurrenceAutomatic: {
					route: '/v2/solicrec/:idSolicRec',
					method: 'get'
				},
				pixUpdateRequestRecurrenceAutomatic: {
					route: '/v2/solicrec/:idSolicRec',
					method: 'patch'
				},
				pixCreateAutomaticChargeTxid: {
					route: '/v2/cobr/:txid',
					method: 'put'
				},
				pixUpdateAutomaticCharge: {
					route: '/v2/cobr/:txid',
					method: 'patch'
				},
				pixDetailAutomaticCharge: {
					route: '/v2/cobr/:txid',
					method: 'get'
				},
				pixCreateAutomaticCharge: {
					route: '/v2/cobr',
					method: 'post'
				},
				pixListAutomaticCharge: {
					route: '/v2/cobr',
					method: 'get'
				},
				pixRetryRequestAutomaticCharge: {
					route: '/v2/cobr/:txid/retentativa/:data',
					method: 'post'
				},
				pixCreateLocationRecurrenceAutomatic: {
					route: '/v2/locrec',
					method: 'post'
				},
				pixListLocationRecurrenceAutomatic: {
					route: '/v2/locrec',
					method: 'get'
				},
				pixDetailLocationRecurrenceAutomatic: {
					route: '/v2/locrec/:id',
					method: 'get'
				},
				pixUnlinkLocationRecurrenceAutomatic: {
					route: '/v2/locrec/:id/idRec',
					method: 'delete'
				},
				pixConfigWebhookRecurrenceAutomatic: {
					route: '/v2/webhookrec',
					method: 'put'
				},
				pixListWebhookRecurrenceAutomatic: {
					route: '/v2/webhookrec',
					method: 'get'
				},
				pixDeleteWebhookRecurrenceAutomatic: {
					route: '/v2/webhookrec',
					method: 'delete'
				},
				pixConfigWebhookAutomaticCharge: {
					route: '/v2/webhookcobr',
					method: 'put'
				},
				pixListWebhookAutomaticCharge: {
					route: '/v2/webhookcobr',
					method: 'get'
				},
				pixDeleteWebhookAutomaticCharge: {
					route: '/v2/webhookcobr',
					method: 'delete'
				}



			},
		},
		OPENFINANCE: {
			URL: {
				PRODUCTION: 'https://openfinance.api.efipay.com.br/v1',
				SANDBOX: 'https://openfinance-h.api.efipay.com.br/v1',
			},
			ENDPOINTS: {
				authorize: {
					route: '/oauth/token',
					method: 'post',
				},
				ofListParticipants: {
					route: '/participantes/',
					method: 'get',
				},
				ofStartPixPayment: {
					route: '/pagamentos/pix',
					method: 'post',
				},
				ofListPixPayment: {
					route: '/pagamentos/pix',
					method: 'get',
				},
				ofConfigUpdate: {
					route: '/config',
					method: 'put',
				},
				ofConfigDetail: {
					route: '/config',
					method: 'get',
				},
				ofDevolutionPix: {
					route: '/pagamentos/pix/:identificadorPagamento/devolver',
					method: 'post',
				},
				ofCancelSchedulePix: {
					route: '/pagamentos-agendados/pix/:identificadorPagamento/cancelar',
					method: 'patch',
				},
				ofListSchedulePixPayment: {
					route: '/pagamentos-agendados/pix',
					method: 'get',
				},
				ofStartSchedulePixPayment: {
					route: '/pagamentos-agendados/pix',
					method: 'post'
				},
				ofDevolutionSchedulePix: {
					route: '/pagamentos-agendados/pix/:identificadorPagamento/devolver',
					method: 'post',
				},
				ofStartRecurrencyPixPayment: {
					route: '/pagamentos-recorrentes/pix',
					method: 'post',
				},
				ofListRecurrencyPixPayment: {
					route: '/pagamentos-recorrentes/pix',
					method: 'get',
				},
				ofCancelRecurrencyPix: {
					route: '/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar',
					method: 'patch',
				},
				ofDevolutionRecurrencyPix: {
					route: '/pagamentos-recorrentes/pix/:identificadorPagamento/devolver',
					method: 'post',
				},
				ofReplaceRecurrencyPixParcel: {
					route: '/pagamentos-recorrentes/pix/:identificadorPagamento/substituir/:endToEndId',
					method: 'patch'
				},
				ofCreateBiometricEnrollment: {
					route: '/pagamentos-biometria/vinculos',
					method: 'post'
				},
				ofListBiometricEnrollment: {
					route: '/pagamentos-biometria/vinculos',
					method: 'get'
				},
				ofCreateBiometricPixPayment: {
					route: '/pagamentos-biometria/pix',
					method: 'post'
				},
				ofListBiometricPixPayment: {
					route: '/pagamentos-biometria/pix',
					method: 'get'
				},
				ofRevokeBiometricEnrollment: {
				    route: '/pagamentos-biometria/vinculos',
					method: 'patch'	
				},
				ofCreateAutomaticEnrollment: {
					route: '/pagamentos-automaticos/adesao',
					method: 'post'
				},
				ofListAutomaticEnrollment: {
					route: '/pagamentos-automaticos/adesao',
					method: 'get'
				},
				ofUpdateAutomaticEnrollment: {
					route: '/pagamentos-automaticos/adesao',
					method: 'patch'
				},
				ofCreateAutomaticPixPayment: {
					route: '/pagamentos-automaticos/pix',
					method: 'post'
				},
				ofListAutomaticPixPayment: {
					route: '/pagamentos-automaticos/pix',
					method: 'get'
				},
				ofCancelAutomaticPixPayment: {
					route: '/pagamentos-automaticos/pix',
					method: 'patch'
				}
			},
		},
		PAGAMENTOS: {
			URL: {
				PRODUCTION: 'https://pagarcontas.api.efipay.com.br/v1',
				SANDBOX: 'https://pagarcontas-h.api.efipay.com.br/v1',
			},
			ENDPOINTS: {
				authorize: {
					route: '/oauth/token',
					method: 'post',
				},
				payDetailBarCode: {
					route: '/codBarras/:codBarras',
					method: 'get',
				},
				payRequestBarCode: {
					route: '/codBarras/:codBarras',
					method: 'post',
				},
				payDetailPayment: {
					route: '/:idPagamento',
					method: 'get',
				},
				payListPayments: {
					route: '/resumo',
					method: 'get',
				},
			},
		},
		CONTAS: {
			URL: {
				PRODUCTION: 'https://abrircontas.api.efipay.com.br/v1',
				SANDBOX: 'https://abrircontas-h.api.efipay.com.br/v1',
			},
			ENDPOINTS: {
				authorize: {
					route: '/oauth/token',
					method: 'post',
				},
				createAccount: {
					route: '/conta-simplificada',
					method: 'post',
				},
				getAccountCertificate: {
					route: '/conta-simplificada/:identificador/certificado',
					method: 'post',
				},
				getAccountCredentials: {
					route: '/conta-simplificada/:identificador/credenciais',
					method: 'get',
				},
				accountConfigWebhook: {
					route: '/webhook',
					method: 'post',
				},
				accountDeleteWebhook: {
					route: '/webhook/:identificadorWebhook',
					method: 'delete',
				},
				accountDetailWebhook: {
					route: '/webhook/:identificadorWebhook',
					method: 'get',
				},
				accountListWebhook: {
					route: '/webhooks',
					method: 'get',
				},
			},
		},
		EXTRATOS: {
			URL: {
				PRODUCTION: 'https://extratos.api.efipay.com.br/v1',
				SANDBOX: 'https://extratos-h.api.efipay.com.br/v1',
			},
			ENDPOINTS: {
				authorize: {
					route: '/oauth/token',
					method: 'post',
				},
				listStatementFiles: {
					route: '/extrato-cnab/arquivos',
					method: 'get',
				},
				getStatementFile: {
					route: '/extrato-cnab/download/:nome_arquivo',
					method: 'get',
				},
				listStatementRecurrences: {
					route: '/extrato-cnab/agendamentos',
					method: 'get',
				},
				createStatementRecurrency: {
					route: '/extrato-cnab/agendar',
					method: 'post',
				},
				updateStatementRecurrency: {
					route: '/extrato-cnab/agendar/:identificador',
					method: 'patch',
				},
				createSftpKey: {
					route: '/extrato-cnab/gerar-chaves',
					method: 'post',
				}
			}
		}
	},
}

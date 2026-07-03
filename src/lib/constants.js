export default {
	APIS: {
		DEFAULT: {
			URL: {
				PRODUCTION: 'https://cobrancas.api.efipay.com.br',
				SANDBOX: 'https://cobrancas-h.api.efipay.com.br',
			},
			ENDPOINTS: {
				authorize: {
					route: '/v1/authorize',
					method: 'post',
				},
				sendSubscriptionLinkEmail: {
					route: '/v1/charge/:id/subscription/resend',
					method: 'post',
				},
				settleCarnet: {
					route: '/v1/carnet/:id/settle',
					method: 'put',
				},
				sendLinkEmail: {
					route: '/v1/charge/:id/link/resend',
					method: 'post',
				},
				createOneStepLink: {
					route: '/v1/charge/one-step/link',
					method: 'post',
				},
				createCharge: {
					route: '/v1/charge',
					method: 'post',
				},
				detailCharge: {
					route: '/v1/charge/:id',
					method: 'get',
				},
				updateChargeMetadata: {
					route: '/v1/charge/:id/metadata',
					method: 'put',
				},
				updateBillet: {
					route: '/v1/charge/:id/billet',
					method: 'put',
				},
				definePayMethod: {
					route: '/v1/charge/:id/pay',
					method: 'post',
				},
				cancelCharge: {
					route: '/v1/charge/:id/cancel',
					method: 'put',
				},
				createCarnet: {
					route: '/v1/carnet',
					method: 'post',
				},
				detailCarnet: {
					route: '/v1/carnet/:id',
					method: 'get',
				},
				updateCarnetParcel: {
					route: '/v1/carnet/:id/parcel/:parcel',
					method: 'put',
				},
				updateCarnetParcels: {
					route: '/v1/carnet/:id/parcels',
					method: 'put',
				},
				updateCarnetMetadata: {
					route: '/v1/carnet/:id/metadata',
					method: 'put',
				},
				getNotification: {
					route: '/v1/notification/:token',
					method: 'get',
				},
				listPlans: {
					route: '/v1/plans',
					method: 'get',
				},
				createPlan: {
					route: '/v1/plan',
					method: 'post',
				},
				deletePlan: {
					route: '/v1/plan/:id',
					method: 'delete',
				},
				createSubscription: {
					route: '/v1/plan/:id/subscription',
					method: 'post',
				},
				createOneStepSubscription: {
					route: '/v1/plan/:id/subscription/one-step',
					method: 'post',
				},
				createOneStepSubscriptionLink: {
					route: '/v1/plan/:id/subscription/one-step/link',
					method: 'post'
				},
				detailSubscription: {
					route: '/v1/subscription/:id',
					method: 'get',
				},
				defineSubscriptionPayMethod: {
					route: '/v1/subscription/:id/pay',
					method: 'post',
				},
				cancelSubscription: {
					route: '/v1/subscription/:id/cancel',
					method: 'put',
				},
				updateSubscriptionMetadata: {
					route: '/v1/subscription/:id/metadata',
					method: 'put',
				},
				getInstallments: {
					route: '/v1/installments',
					method: 'get',
				},
				sendBilletEmail: {
					route: '/v1/charge/:id/billet/resend',
					method: 'post',
				},
				createChargeHistory: {
					route: '/v1/charge/:id/history',
					method: 'post',
				},
				sendCarnetEmail: {
					route: '/v1/carnet/:id/resend',
					method: 'post',
				},
				sendCarnetParcelEmail: {
					route: '/v1/carnet/:id/parcel/:parcel/resend',
					method: 'post',
				},
				createCarnetHistory: {
					route: '/v1/carnet/:id/history',
					method: 'post',
				},
				cancelCarnet: {
					route: '/v1/carnet/:id/cancel',
					method: 'put',
				},
				cancelCarnetParcel: {
					route: '/v1/carnet/:id/parcel/:parcel/cancel',
					method: 'put',
				},
				defineLinkPayMethod: {
					route: '/v1/charge/:id/link',
					method: 'post',
				},
				updateChargeLink: {
					route: '/v1/charge/:id/link',
					method: 'put',
				},
				updatePlan: {
					route: '/v1/plan/:id',
					method: 'put',
				},
				updateSubscription: {
					route: '/v1/subscription/:id',
					method: 'put'
				},
				createSubscriptionHistory: {
					route: '/v1/subscription/:id/history',
					method: 'post',
				},
				defineBalanceSheetBillet: {
					route: '/v1/charge/:id/balance-sheet',
					method: 'post',
				},
				settleCharge: {
					route: '/v1/charge/:id/settle',
					method: 'put',
				},
				settleCarnetParcel: {
					route: '/v1/carnet/:id/parcel/:parcel/settle',
					method: 'put',
				},
				createOneStepCharge: {
					route: '/v1/charge/one-step',
					method: 'post',
				},
				cardPaymentRetry: {
					route: '/v1/charge/:id/retry',
					method: 'post'
				},
				refundCard: {
					route: '/v1/charge/card/:id/refund',
					method: 'post'
				},
				listCharges: {
					route: '/v1/charges',
					method: 'get'
				},
				createChargeCard: {
					route: '/v2/charge/card',
					method: 'post'
				}
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
					route: '/v2/gn/split/cob/:txid/vinculo',
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
					route: '/v2/gn/split/cobv/:txid/vinculo',
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
				pixSendSameOwnership: {
					route: '/v2/gn/pix/:idEnvio/mesma-titularidade',
					method: 'put'
				},
				pixKeysBucket: {
					route: '/v2/gn/chaves/balde',
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
				},
				pixSplitDevolution: {
					route: '/v2/gn/split/pix/:e2eid/devolucao/:id',
					method: 'put'
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
				payConfigWebhook: {
					route: '/webhook',
					method: 'put',
				},
				payListWebhook: {
					route: '/webhook',
					method: 'get',
				},
				payDeleteWebhook: {
					route: '/webhook',
					method: 'delete',
				}
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
				getAccountCredentials: {
					route: '/conta-simplificada/:idContaSimplificada/credenciais',
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
				createAccountCertificate: {
					route: '/conta-simplificada/:idContaSimplificada/certificado',
					method: 'post',
				}
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

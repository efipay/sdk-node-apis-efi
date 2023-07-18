module.exports = {
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
			},
		},
		PIX: {
			URL: {
				PRODUCTION: 'https://pix.api.efipay.com.br/v2',
				SANDBOX: 'https://pix-h.api.efipay.com.br/v2',
			},
			ENDPOINTS: {
				authorize: {
					route: '/oauth/token',
					method: 'post',
				},
				pixCreateDueCharge: {
					route: '/cobv/:txid',
					method: 'put',
				},
				pixUpdateDueCharge: {
					route: '/cobv/:txid',
					method: 'patch',
				},
				pixDetailDueCharge: {
					route: '/cobv/:txid',
					method: 'get',
				},
				pixListDueCharges: {
					route: '/cobv/',
					method: 'get',
				},
				createReport: {
					route: '/gn/relatorios/extrato-conciliacao',
					method: 'post',
				},
				detailReport: {
					route: '/gn/relatorios/:id',
					method: 'get',
				},
				pixCreateCharge: {
					route: '/cob/:txid',
					method: 'put',
				},
				pixUpdateCharge: {
					route: '/cob/:txid',
					method: 'patch',
				},
				pixCreateImmediateCharge: {
					route: '/cob',
					method: 'post',
				},
				pixDetailCharge: {
					route: '/cob/:txid',
					method: 'get',
				},
				pixListCharges: {
					route: '/cob',
					method: 'get',
				},
				pixDetailReceived: {
					route: '/pix/:e2eId',
					method: 'get',
				},
				pixReceivedList: {
					route: '/pix',
					method: 'get',
				},
				pixSend: {
					route: '/gn/pix/:idEnvio',
					method: 'put',
				},
				pixSendDetail: {
					route: '/gn/pix/enviados/:e2eid',
					method: 'get',
				},
				pixSendList: {
					route: '/gn/pix/enviados',
					method: 'get',
				},
				pixDevolution: {
					route: '/pix/:e2eId/devolucao/:id',
					method: 'put',
				},
				pixDetailDevolution: {
					route: '/pix/:e2eId/devolucao/:id',
					method: 'get',
				},
				pixConfigWebhook: {
					route: '/webhook/:chave',
					method: 'put',
				},
				pixDetailWebhook: {
					route: '/webhook/:chave',
					method: 'get',
				},
				pixListWebhook: {
					route: '/webhook',
					method: 'get',
				},
				pixDeleteWebhook: {
					route: '/webhook/:chave',
					method: 'delete',
				},
				pixCreateLocation: {
					route: '/loc',
					method: 'post',
				},
				pixLocationList: {
					route: '/loc',
					method: 'get',
				},
				pixDetailLocation: {
					route: '/loc/:id',
					method: 'get',
				},
				pixGenerateQRCode: {
					route: '/loc/:id/qrcode',
					method: 'get',
				},
				pixUnlinkTxidLocation: {
					route: '/loc/:id/txid',
					method: 'delete',
				},
				pixCreateEvp: {
					route: '/gn/evp',
					method: 'post',
				},
				pixListEvp: {
					route: '/gn/evp',
					method: 'get',
				},
				pixDeleteEvp: {
					route: '/gn/evp/:chave',
					method: 'delete',
				},
				getAccountBalance: {
					route: '/gn/saldo',
					method: 'get',
				},
				updateAccountConfig: {
					route: '/gn/config',
					method: 'put',
				},
				listAccountConfig: {
					route: '/gn/config',
					method: 'get',
				},
				pixSplitDetailCharge: {
					route: '/gn/split/cob/:txid',
					method: 'get',
				},
				pixSplitLinkCharge: {
					route: '/gn/split/cob/:txid/vinculo/:splitConfigId',
					method: 'put',
				},
				pixSplitUnlinkCharge: {
					route: '/gn/split/cob/:txid/vinculo/:splitConfigId',
					method: 'delete',
				},
				pixSplitDetailDueCharge: {
					route: '/gn/split/cobv/:txid',
					method: 'get',
				},
				pixSplitLinkDueCharge: {
					route: '/gn/split/cobv/:txid/vinculo/:splitConfigId',
					method: 'put',
				},
				pixSplitUnlinkDueCharge: {
					route: '/gn/split/cobv/:txid/vinculo/:splitConfigId',
					method: 'delete',
				},
				pixSplitConfig: {
					route: '/gn/split/config',
					method: 'post',
				},
				pixSplitConfigId: {
					route: '/gn/split/config/:id',
					method: 'put',
				},
				pixSplitDetailConfig: {
					route: '/gn/split/config/:id',
					method: 'get',
				},
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
					method: 'GET',
				},
				ofStartPixPayment: {
					route: '/pagamentos/pix',
					method: 'POST',
				},
				ofListPixPayment: {
					route: '/pagamentos/pix',
					method: 'GET',
				},
				ofConfigUpdate: {
					route: '/config',
					method: 'PUT',
				},
				ofConfigDetail: {
					route: '/config',
					method: 'GET',
				},
				ofDevolutionPix: {
					route: '/pagamentos/pix/:identificadorPagamento/devolver',
					method: 'post',
				},
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
					method: 'GET',
				},
				payRequestBarCode: {
					route: '/codBarras/:codBarras',
					method: 'POST',
				},
				payDetailPayment: {
					route: '/:idPagamento',
					method: 'GET',
				},
				payListPayments: {
					route: '/resumo',
					method: 'GET',
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
					method: 'get',
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
	},
}

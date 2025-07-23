import fs from 'fs';
import https from 'https';
import axios from 'axios';
import randomstring from 'randomstring';

var constants = {
  APIS: {
    DEFAULT: {
      URL: {
        PRODUCTION: 'https://cobrancas.api.efipay.com.br/v1',
        SANDBOX: 'https://cobrancas-h.api.efipay.com.br/v1'
      },
      ENDPOINTS: {
        authorize: {
          route: '/authorize',
          method: 'post'
        },
        sendSubscriptionLinkEmail: {
          route: '/charge/:id/subscription/resend',
          method: 'post'
        },
        oneStepSubscription: {
          route: '/plan/:id/subscription/one-step',
          method: 'post'
        },
        settleCarnet: {
          route: '/carnet/:id/settle',
          method: 'put'
        },
        oneStepSubscriptionLink: {
          route: '/plan/:id/subscription/one-step/link',
          method: 'post'
        },
        sendLinkEmail: {
          route: '/charge/:id/link/resend',
          method: 'post'
        },
        createOneStepLink: {
          route: '/charge/one-step/link',
          method: 'post'
        },
        createCharge: {
          route: '/charge',
          method: 'post'
        },
        detailCharge: {
          route: '/charge/:id',
          method: 'get'
        },
        updateChargeMetadata: {
          route: '/charge/:id/metadata',
          method: 'put'
        },
        updateBillet: {
          route: '/charge/:id/billet',
          method: 'put'
        },
        definePayMethod: {
          route: '/charge/:id/pay',
          method: 'post'
        },
        cancelCharge: {
          route: '/charge/:id/cancel',
          method: 'put'
        },
        createCarnet: {
          route: '/carnet',
          method: 'post'
        },
        detailCarnet: {
          route: '/carnet/:id',
          method: 'get'
        },
        updateCarnetParcel: {
          route: '/carnet/:id/parcel/:parcel',
          method: 'put'
        },
        updateCarnetParcels: {
          route: '/carnet/:id/parcels',
          method: 'put'
        },
        updateCarnetMetadata: {
          route: '/carnet/:id/metadata',
          method: 'put'
        },
        getNotification: {
          route: '/notification/:token',
          method: 'get'
        },
        listPlans: {
          route: '/plans',
          method: 'get'
        },
        createPlan: {
          route: '/plan',
          method: 'post'
        },
        deletePlan: {
          route: '/plan/:id',
          method: 'delete'
        },
        createSubscription: {
          route: '/plan/:id/subscription',
          method: 'post'
        },
        createOneStepSubscription: {
          route: '/plan/:id/subscription/one-step',
          method: 'post'
        },
        createOneStepSubscriptionLink: {
          route: '/plan/:id/subscription/one-step/link',
          method: 'post'
        },
        detailSubscription: {
          route: '/subscription/:id',
          method: 'get'
        },
        defineSubscriptionPayMethod: {
          route: '/subscription/:id/pay',
          method: 'post'
        },
        cancelSubscription: {
          route: '/subscription/:id/cancel',
          method: 'put'
        },
        updateSubscriptionMetadata: {
          route: '/subscription/:id/metadata',
          method: 'put'
        },
        getInstallments: {
          route: '/installments',
          method: 'get'
        },
        sendBilletEmail: {
          route: '/charge/:id/billet/resend',
          method: 'post'
        },
        createChargeHistory: {
          route: '/charge/:id/history',
          method: 'post'
        },
        sendCarnetEmail: {
          route: '/carnet/:id/resend',
          method: 'post'
        },
        sendCarnetParcelEmail: {
          route: '/carnet/:id/parcel/:parcel/resend',
          method: 'post'
        },
        createCarnetHistory: {
          route: '/carnet/:id/history',
          method: 'post'
        },
        cancelCarnet: {
          route: '/carnet/:id/cancel',
          method: 'put'
        },
        cancelCarnetParcel: {
          route: '/carnet/:id/parcel/:parcel/cancel',
          method: 'put'
        },
        linkCharge: {
          route: '/charge/:id/link',
          method: 'post'
        },
        defineLinkPayMethod: {
          route: '/charge/:id/link',
          method: 'post'
        },
        updateChargeLink: {
          route: '/charge/:id/link',
          method: 'put'
        },
        updatePlan: {
          route: '/plan/:id',
          method: 'put'
        },
        updateSubscription: {
          route: '/subscription/:id',
          method: 'put'
        },
        createSubscriptionHistory: {
          route: '/subscription/:id/history',
          method: 'post'
        },
        defineBalanceSheetBillet: {
          route: '/charge/:id/balance-sheet',
          method: 'post'
        },
        settleCharge: {
          route: '/charge/:id/settle',
          method: 'put'
        },
        settleCarnetParcel: {
          route: '/carnet/:id/parcel/:parcel/settle',
          method: 'put'
        },
        createOneStepCharge: {
          route: '/charge/one-step',
          method: 'post'
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
        }
      }
    },
    PIX: {
      URL: {
        PRODUCTION: 'https://pix.api.efipay.com.br',
        SANDBOX: 'https://pix-h.api.efipay.com.br'
      },
      ENDPOINTS: {
        authorize: {
          route: '/oauth/token',
          method: 'post'
        },
        pixCreateDueCharge: {
          route: '/v2/cobv/:txid',
          method: 'put'
        },
        pixUpdateDueCharge: {
          route: '/v2/cobv/:txid',
          method: 'patch'
        },
        pixDetailDueCharge: {
          route: '/v2/cobv/:txid',
          method: 'get'
        },
        pixListDueCharges: {
          route: '/v2/cobv/',
          method: 'get'
        },
        createReport: {
          route: '/v2/gn/relatorios/extrato-conciliacao',
          method: 'post'
        },
        detailReport: {
          route: '/v2/gn/relatorios/:id',
          method: 'get'
        },
        pixCreateCharge: {
          route: '/v2/cob/:txid',
          method: 'put'
        },
        pixUpdateCharge: {
          route: '/v2/cob/:txid',
          method: 'patch'
        },
        pixCreateImmediateCharge: {
          route: '/v2/cob',
          method: 'post'
        },
        pixDetailCharge: {
          route: '/v2/cob/:txid',
          method: 'get'
        },
        pixListCharges: {
          route: '/v2/cob',
          method: 'get'
        },
        pixDetailReceived: {
          route: '/v2/pix/:e2eId',
          method: 'get'
        },
        pixReceivedList: {
          route: '/v2/pix',
          method: 'get'
        },
        pixSend: {
          route: '/v3/gn/pix/:idEnvio',
          method: 'put'
        },
        pixSendDetail: {
          route: '/v2/gn/pix/enviados/:e2eid',
          method: 'get'
        },
        pixSendList: {
          route: '/v2/gn/pix/enviados',
          method: 'get'
        },
        pixDevolution: {
          route: '/v2/pix/:e2eId/devolucao/:id',
          method: 'put'
        },
        pixDetailDevolution: {
          route: '/v2/pix/:e2eId/devolucao/:id',
          method: 'get'
        },
        pixConfigWebhook: {
          route: '/v2/webhook/:chave',
          method: 'put'
        },
        pixDetailWebhook: {
          route: '/v2/webhook/:chave',
          method: 'get'
        },
        pixListWebhook: {
          route: '/v2/webhook',
          method: 'get'
        },
        pixDeleteWebhook: {
          route: '/v2/webhook/:chave',
          method: 'delete'
        },
        pixCreateLocation: {
          route: '/v2/loc',
          method: 'post'
        },
        pixLocationList: {
          route: '/v2/loc',
          method: 'get'
        },
        pixDetailLocation: {
          route: '/v2/loc/:id',
          method: 'get'
        },
        pixGenerateQRCode: {
          route: '/v2/loc/:id/qrcode',
          method: 'get'
        },
        pixUnlinkTxidLocation: {
          route: '/v2/loc/:id/txid',
          method: 'delete'
        },
        pixCreateEvp: {
          route: '/v2/gn/evp',
          method: 'post'
        },
        pixListEvp: {
          route: '/v2/gn/evp',
          method: 'get'
        },
        pixDeleteEvp: {
          route: '/v2/gn/evp/:chave',
          method: 'delete'
        },
        getAccountBalance: {
          route: '/v2/gn/saldo',
          method: 'get'
        },
        updateAccountConfig: {
          route: '/v2/gn/config',
          method: 'put'
        },
        listAccountConfig: {
          route: '/v2/gn/config',
          method: 'get'
        },
        pixSplitDetailCharge: {
          route: '/v2/gn/split/cob/:txid',
          method: 'get'
        },
        pixSplitLinkCharge: {
          route: '/v2/gn/split/cob/:txid/vinculo/:splitConfigId',
          method: 'put'
        },
        pixSplitUnlinkCharge: {
          route: '/v2/gn/split/cob/:txid/vinculo/:splitConfigId',
          method: 'delete'
        },
        pixSplitDetailDueCharge: {
          route: '/v2/gn/split/cobv/:txid',
          method: 'get'
        },
        pixSplitLinkDueCharge: {
          route: '/v2/gn/split/cobv/:txid/vinculo/:splitConfigId',
          method: 'put'
        },
        pixSplitUnlinkDueCharge: {
          route: '/v2/gn/split/cobv/:txid/vinculo/:splitConfigId',
          method: 'delete'
        },
        pixSplitConfig: {
          route: '/v2/gn/split/config',
          method: 'post'
        },
        pixSplitConfigId: {
          route: '/v2/gn/split/config/:id',
          method: 'put'
        },
        pixSplitDetailConfig: {
          route: '/v2/gn/split/config/:id',
          method: 'get'
        },
        pixSendDetailId: {
          route: '/v2/gn/pix/enviados/id-envio/:idEnvio',
          method: 'get'
        },
        pixCreateDueChargeBatch: {
          route: '/v2/lotecobv/:id',
          method: 'put'
        },
        pixUpdateDueChargeBatch: {
          route: '/v2/lotecobv/:id',
          method: 'patch'
        },
        pixDetailDueChargeBatch: {
          route: '/v2/lotecobv/:id',
          method: 'get'
        },
        pixListDueChargeBatch: {
          route: '/v2/lotecobv',
          method: 'get'
        },
        medDefense: {
          route: '/v2/gn/infracoes/:idInfracao/defesa',
          method: 'post'
        },
        medList: {
          route: '/v2/gn/infracoes',
          method: 'get'
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
      }
    },
    OPENFINANCE: {
      URL: {
        PRODUCTION: 'https://openfinance.api.efipay.com.br/v1',
        SANDBOX: 'https://openfinance-h.api.efipay.com.br/v1'
      },
      ENDPOINTS: {
        authorize: {
          route: '/oauth/token',
          method: 'post'
        },
        ofListParticipants: {
          route: '/participantes/',
          method: 'get'
        },
        ofStartPixPayment: {
          route: '/pagamentos/pix',
          method: 'post'
        },
        ofListPixPayment: {
          route: '/pagamentos/pix',
          method: 'get'
        },
        ofConfigUpdate: {
          route: '/config',
          method: 'put'
        },
        ofConfigDetail: {
          route: '/config',
          method: 'get'
        },
        ofDevolutionPix: {
          route: '/pagamentos/pix/:identificadorPagamento/devolver',
          method: 'post'
        },
        ofCancelSchedulePix: {
          route: '/pagamentos-agendados/pix/:identificadorPagamento/cancelar',
          method: 'patch'
        },
        ofListSchedulePixPayment: {
          route: '/pagamentos-agendados/pix',
          method: 'get'
        },
        ofStartSchedulePixPayment: {
          route: '/pagamentos-agendados/pix',
          method: 'post'
        },
        ofDevolutionSchedulePix: {
          route: '/pagamentos-agendados/pix/:identificadorPagamento/devolver',
          method: 'post'
        },
        ofStartRecurrencyPixPayment: {
          route: '/pagamentos-recorrentes/pix',
          method: 'post'
        },
        ofListRecurrencyPixPayment: {
          route: '/pagamentos-recorrentes/pix',
          method: 'get'
        },
        ofCancelRecurrencyPix: {
          route: '/pagamentos-recorrentes/pix/:identificadorPagamento/cancelar',
          method: 'patch'
        },
        ofDevolutionRecurrencyPix: {
          route: '/pagamentos-recorrentes/pix/:identificadorPagamento/devolver',
          method: 'post'
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
      }
    },
    PAGAMENTOS: {
      URL: {
        PRODUCTION: 'https://pagarcontas.api.efipay.com.br/v1',
        SANDBOX: 'https://pagarcontas-h.api.efipay.com.br/v1'
      },
      ENDPOINTS: {
        authorize: {
          route: '/oauth/token',
          method: 'post'
        },
        payDetailBarCode: {
          route: '/codBarras/:codBarras',
          method: 'get'
        },
        payRequestBarCode: {
          route: '/codBarras/:codBarras',
          method: 'post'
        },
        payDetailPayment: {
          route: '/:idPagamento',
          method: 'get'
        },
        payListPayments: {
          route: '/resumo',
          method: 'get'
        }
      }
    },
    CONTAS: {
      URL: {
        PRODUCTION: 'https://abrircontas.api.efipay.com.br/v1',
        SANDBOX: 'https://abrircontas-h.api.efipay.com.br/v1'
      },
      ENDPOINTS: {
        authorize: {
          route: '/oauth/token',
          method: 'post'
        },
        createAccount: {
          route: '/conta-simplificada',
          method: 'post'
        },
        getAccountCertificate: {
          route: '/conta-simplificada/:identificador/certificado',
          method: 'post'
        },
        getAccountCredentials: {
          route: '/conta-simplificada/:identificador/credenciais',
          method: 'get'
        },
        accountConfigWebhook: {
          route: '/webhook',
          method: 'post'
        },
        accountDeleteWebhook: {
          route: '/webhook/:identificadorWebhook',
          method: 'delete'
        },
        accountDetailWebhook: {
          route: '/webhook/:identificadorWebhook',
          method: 'get'
        },
        accountListWebhook: {
          route: '/webhooks',
          method: 'get'
        }
      }
    },
    EXTRATOS: {
      URL: {
        PRODUCTION: 'https://extratos.api.efipay.com.br/v1',
        SANDBOX: 'https://extratos-h.api.efipay.com.br/v1'
      },
      ENDPOINTS: {
        authorize: {
          route: '/oauth/token',
          method: 'post'
        },
        listStatementFiles: {
          route: '/extrato-cnab/arquivos',
          method: 'get'
        },
        getStatementFile: {
          route: '/extrato-cnab/download/:nome_arquivo',
          method: 'get'
        },
        listStatementRecurrences: {
          route: '/extrato-cnab/agendamentos',
          method: 'get'
        },
        createStatementRecurrency: {
          route: '/extrato-cnab/agendar',
          method: 'post'
        },
        updateStatementRecurrency: {
          route: '/extrato-cnab/agendar/:identificador',
          method: 'patch'
        },
        createSftpKey: {
          route: '/extrato-cnab/gerar-chaves',
          method: 'post'
        }
      }
    }
  }
};

var name = "sdk-node-apis-efi";
var main = "dist/cjs/index.cjs";
var types = "dist/types/index.d.ts";
var exports = {
	".": {
		require: "./dist/cjs/index.cjs",
		"import": "./dist/cjs/index.cjs",
		types: "./dist/types/index.d.ts"
	}
};
var description = "Module for integration with Efi Bank API";
var version = "1.2.25";
var author = "Efi Bank - Consultoria Técnica | João Vitor Oliveira | João Lucas";
var license = "MIT";
var repository = "efipay/sdk-node-apis-efi";
var homepage = "https://github.com/efipay/sdk-node-apis-efi";
var keywords = [
	"efi",
	"efi pay",
	"efi bank",
	"pagamentos",
	"payment",
	"sdk",
	"integração",
	"integration",
	"api",
	"bank slip",
	"boleto bancario",
	"credit card",
	"cartao de credito",
	"pix",
	"Open Finance"
];
var dependencies = {
	axios: "^1.2.2",
	randomstring: "^1.2.2"
};
var scripts = {
	start: "node app.js",
	build: "rollup -c && tsc --project tsconfig.json",
	test: "./node_modules/.bin/jest",
	"test-cov": "./node_modules/.bin/jest --coverage"
};
var devDependencies = {
	"@babel/core": "^7.14.6",
	"@babel/preset-env": "^7.14.5",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-json": "^6.1.0",
	prettier: "^3.0.3",
	rollup: "^2.52.3",
	typescript: "^4.3.5",
	undici: "^6.19.2"
};
var sdkPackage = {
	name: name,
	main: main,
	types: types,
	exports: exports,
	description: description,
	version: version,
	author: author,
	license: license,
	repository: repository,
	homepage: homepage,
	keywords: keywords,
	dependencies: dependencies,
	scripts: scripts,
	devDependencies: devDependencies
};

// @ts-nocheck
class Endpoints {
  constructor(options, constants) {
    this.options = options;
    this.auth = null;
    this.constants = constants;
    this.authError = null;
    this.axiosInstance = axios.create();
  }
  run(name, params, body) {
    let endpoint;
    if (this.constants.APIS.DEFAULT.ENDPOINTS.hasOwnProperty(name)) {
      endpoint = this.constants.APIS.DEFAULT.ENDPOINTS[name];
      this.baseUrl = this.options.sandbox ? this.constants.APIS.DEFAULT.URL.SANDBOX : this.constants.APIS.DEFAULT.URL.PRODUCTION;
      this.authRoute = this.constants.APIS.DEFAULT.ENDPOINTS.authorize;
    } else {
      Object.keys(this.constants.APIS).forEach(key => {
        if (this.constants.APIS[key].ENDPOINTS.hasOwnProperty(name)) {
          endpoint = this.constants.APIS[key].ENDPOINTS[name];
          this.baseUrl = this.options.sandbox ? this.constants.APIS[key].URL.SANDBOX : this.constants.APIS[key].URL.PRODUCTION;
          this.authRoute = this.constants.APIS[key].ENDPOINTS.authorize;
          return;
        }
      });
      try {
        if (this.options.cert_base64 === undefined || this.options.cert_base64 === false) {
          if (this.options.pemKey) {
            this.agent = new https.Agent({
              cert: fs.readFileSync(this.options.certificate),
              key: fs.readFileSync(this.options.pemKey),
              passphrase: ''
            });
          } else {
            this.agent = new https.Agent({
              pfx: fs.readFileSync(this.options.certificate),
              passphrase: ''
            });
          }
        } else if (this.options.cert_base64 === true) {
          if (this.options.pemKey) {
            this.agent = new https.Agent({
              cert: Buffer.from(this.options.certificate, 'base64'),
              key: Buffer.from(this.options.pemKey, 'base64'),
              passphrase: ''
            });
          } else {
            this.agent = new https.Agent({
              pfx: Buffer.from(this.options.certificate, 'base64'),
              passphrase: ''
            });
          }
        }
      } catch (error) {
        if (this.options.pemKey && (this.options.cert_base64 === undefined || this.options.cert_base64 === false)) {
          console.error(`Falha ao ler o certificado ou a chave, verifique o caminho informado:\nCaminho do certificado: ${this.options.certificate}\nCaminho da chave: ${this.options.pemKey}`);
        } else if (this.options.cert_base64 === undefined || this.options.cert_base64 === false) {
          console.error(`Falha ao ler o certificado, verifique o caminho informado: ${this.options.certificate}`);
        }
        if (this.options.pemKey && this.options.cert_base64 === true) {
          console.error(`Falha ao ler o certificado ou a chave, verifique o conteúdo informado do certificado e da chave`);
        } else if (this.options.cert_base64 === true) {
          console.error(`Falha ao ler o certificado, verifique o conteúdo informado`);
        }
      }
    }
    this.params = params;
    return this.req(endpoint, body);
  }
  async req(endpoint, body) {
    let req = await this.createRequest(endpoint, body);

    // Request interceptor
    this.axiosInstance.interceptors.request.use(async config => {
      if (!this.auth || this.isExpired()) {
        this.authError = await this.authenticate();
      }
      config.headers = {
        Authorization: `Bearer ${this.auth.access_token}`,
        'x-skip-mtls-checking': !this.options.validateMtls
      };
      if (this.options.partner_token) {
        config.headers['partner-token'] = this.options.partner_token;
      }
      if (this.baseUrl == this.constants.APIS.OPENFINANCE.URL.PRODUCTION || this.baseUrl == this.constants.APIS.OPENFINANCE.URL.SANDBOX) {
        config.headers['x-idempotency-key'] = randomstring.generate({
          length: 72,
          charset: 'alphanumeric'
        });
      }
      return config;
    }, error => {
      Promise.reject(error);
    });
    return this.axiosInstance(req).then(res => {
      // Para a rota de comprovantes, retornar os dados diretamente (arraybuffer)
      if (req.url.includes('/v2/gn/pix/comprovantes')) {
        return res.data;
      }
      return res.data;
    }).catch(error => {
      if (this.authError) {
        const error = this.authError?.response?.data || this.authError?.cause || this.authError;
        switch (error.message) {
          case 'socket hang up':
            throw 'Verifique o atributo sandbox e certificate, e garanta que eles estejam corretamente atribuidos para o ambiente desejado';
          case 'header too long':
            throw 'Verifique se o certificado foi enviado no formato correto';
          case 'wrong tag':
          case 'error:0909006C:PEM routines:get_name:no start line':
            throw 'Foi enviando um certificado .pem porém não foi enviado o atributo pemKey corretamente, tente enviar o mesmo valor para ambos';
          default:
            throw error;
        }
      } else {
        // Para erros na rota de comprovantes, tratar normalmente (não como arraybuffer)
        let errorData = error.response?.data;
        const errorUrl = error.request.res.responseUrl || '';

        // Se for um arraybuffer (rota de comprovantes), converter para string/JSON
        if (errorUrl.includes('/v2/gn/pix/comprovantes')) {
          try {
            const decoder = new TextDecoder('utf-8');
            const errorText = decoder.decode(errorData);
            errorData = JSON.parse(errorText);
          } catch (parseError) {
            // Se não conseguir parsear, manter o erro original
            errorData = error.response?.data;
          }
        }
        switch (this.baseUrl) {
          case this.constants.APIS.DEFAULT.URL.PRODUCTION:
          case this.constants.APIS.DEFAULT.URL.SANDBOX:
            throw errorData;
          case this.constants.APIS.PIX.URL.PRODUCTION:
          case this.constants.APIS.PIX.URL.SANDBOX:
            throw errorData;
          case this.constants.APIS.OPENFINANCE.URL.PRODUCTION:
          case this.constants.APIS.OPENFINANCE.URL.SANDBOX:
            throw errorData;
          case this.constants.APIS.PAGAMENTOS.URL.PRODUCTION:
          case this.constants.APIS.PAGAMENTOS.URL.SANDBOX:
            throw errorData;
          case this.constants.APIS.CONTAS.URL.PRODUCTION:
          case this.constants.APIS.CONTAS.URL.SANDBOX:
            throw errorData;
          default:
            throw errorData;
        }
      }
    });
  }
  isExpired() {
    if (!this.options.cache) {
      return true;
    }
    let current_time = new Date().getTime() / 1000;
    if (current_time > this.auth.authDate + this.auth.expires_in) {
      return true;
    }
    return false;
  }
  async authenticate() {
    let authParams = {
      method: 'POST',
      url: this.baseUrl + this.authRoute.route,
      headers: {
        'api-sdk': 'efi-node-' + sdkPackage.version
      },
      data: {
        grant_type: 'client_credentials'
      }
    };
    if (this.constants.APIS.DEFAULT.URL.PRODUCTION == this.baseUrl || this.constants.APIS.DEFAULT.URL.SANDBOX == this.baseUrl) {
      authParams.auth = {
        username: this.options.client_id,
        password: this.options.client_secret
      };
    } else {
      let token = Buffer.from(this.options.client_id + ':' + this.options.client_secret).toString('base64');
      authParams.headers['Authorization'] = 'Basic ' + token;
      authParams.headers['Content-Type'] = 'application/json';
      authParams.httpsAgent = this.agent;
    }
    return axios(authParams).then(res => {
      this.auth = res.data;
      this.auth.authDate = new Date().getTime() / 1000;
    }).catch(error => {
      return error;
    });
  }
  async createRequest(endpoint, body) {
    let {
      route,
      method
    } = endpoint;
    let regex = /\:(\w+)/g;
    let query = '';
    let placeholders = route.match(regex) || [];
    let params = {};
    for (let prop in this.params) {
      params[prop] = this.params[prop];
    }
    let getVariables = function () {
      return placeholders.map(function (item) {
        return item.replace(':', '');
      });
    };
    let updateRoute = function () {
      let variables = getVariables();
      variables.forEach(function (value, index) {
        if (params[value]) {
          route = route.replace(placeholders[index], params[value]);
          delete params[value];
        }
      });
    };
    let getQueryString = function () {
      let keys = Object.keys(params);
      let initial = keys.length >= 1 ? '?' : '';
      return keys.reduce(function (previous, current, index, array) {
        let next = index === array.length - 1 ? '' : '&';
        return [previous, current, '=', params[current], next].join('');
      }, initial);
    };
    updateRoute();
    query = getQueryString();
    let headers = new Object();
    if (endpoint.route === this.constants.APIS.PIX.ENDPOINTS.pixConfigWebhook.route && endpoint.method === this.constants.APIS.PIX.ENDPOINTS.pixConfigWebhook.method) {
      this.options.validateMtls = this.options.validateMtls || this.options.validate_mtls;
      headers['x-skip-mtls-checking'] = !this.options.validateMtls;
    }
    if (this.options.partner_token) {
      headers['partner-token'] = this.options.partner_token;
    }
    if (this.baseUrl == this.constants.APIS.OPENFINANCE.URL.PRODUCTION || this.baseUrl == this.constants.APIS.OPENFINANCE.URL.SANDBOX) {
      headers['x-idempotency-key'] = randomstring.generate({
        length: 72,
        charset: 'alphanumeric'
      });
    }
    let req = {
      method,
      url: String([this.baseUrl, route, query].join('')),
      headers,
      data: body
    };

    // Configurar responseType como arraybuffer para a rota de comprovantes
    if (route.includes('/v2/gn/pix/comprovantes')) {
      req['responseType'] = 'arraybuffer';
    }
    if (this.baseUrl != this.constants.APIS.DEFAULT.URL.PRODUCTION && this.baseUrl != this.constants.APIS.DEFAULT.URL.SANDBOX) {
      req['httpsAgent'] = this.agent;
    }
    return req;
  }
}

// @ts-nocheck
class ExtratosMethods {
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
  listStatementFiles() {}

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
  getStatementFile(params) {}

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
  listStatementRecurrences() {}

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
  createStatementRecurrency(params, body) {}

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
  updateStatementRecurrency(params, body) {}

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
  createSftpKey() {}
}

// @ts-nocheck
class CobrancasMethods extends ExtratosMethods {
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
  createOneStepCharge(params, body) {}

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
  createCharge(params, body) {}

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
  definePayMethod(params, body) {}

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
  detailCharge(params) {}

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
  listCharges(params) {}

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
  updateChargeMetadata(params, body) {}

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
  updateBillet(params, body) {}

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
  cancelCharge(params) {}

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
  sendBilletEmail(params, body) {}

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
  createChargeHistory(params, body) {}

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
  defineBalanceSheetBillet(params, body) {}

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
  settleCharge(params) {}

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
  cardPaymentRetry(params, body) {}

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
  refundCard(params, body) {}

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
  getInstallments(params) {}

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
  createCarnet(params, body) {}

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
  detailCarnet(params) {}

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
  updateCarnetMetadata(params, body) {}

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
  updateCarnetParcel(params, body) {}

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
  updateCarnetParcels(params, body) {}

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
  cancelCarnet(params) {}

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
  cancelCarnetParcel(params) {}

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
  sendCarnetEmail(params, body) {}

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
  sendCarnetParcelEmail(params, body) {}

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
  createCarnetHistory(params, body) {}

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
  settleCarnet(params) {}

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
  settleCarnetParcel(params) {}

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
  createPlan(params, body) {}

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
  listPlans(params) {}

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
  updatePlan(params, body) {}

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
  deletePlan(params) {}

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
  createOneStepSubscription(params, body) {}

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
  createSubscription(params, body) {}

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
  defineSubscriptionPayMethod(params, body) {}

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
  detailSubscription(params) {}

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
  createOneStepSubscriptionLink(params, body) {}

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
  updateSubscriptionMetadata(params, body) {}

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
  updateSubscription(params, body) {}

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
  cancelSubscription(params) {}

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
  createSubscriptionHistory(params, body) {}

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
  sendSubscriptionLinkEmail(params, body) {}

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
  createOneStepLink(params, body) {}

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
  defineLinkPayMethod(params, body) {}

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
  updateChargeLink(params, body) {}

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
  sendLinkEmail(params, body) {}

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
  getNotification(params) {}
}

// @ts-nocheck
class PixMethods extends CobrancasMethods {
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
  pixCreateImmediateCharge(params, body) {}

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
  pixCreateCharge(params, body) {}

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
  pixUpdateCharge(params, body) {}

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
  pixDetailCharge(params) {}

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
  pixListCharges(params) {}

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
  pixCreateDueCharge(params, body) {}

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
  pixUpdateDueCharge(params, body) {}

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
  pixDetailDueCharge(params) {}

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
  pixListDueCharges(params) {}

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
  pixSend(params, body) {}

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
  pixSendDetail(params) {}

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
  pixSendDetailId(params) {}
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
  pixSendList(params) {}
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
  pixQrCodeDetail(params, body) {}
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
  pixQrCodePay(params, body) {}
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
  pixDetailReceived(params) {}
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
  pixReceivedList(params) {}
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
  pixDevolution(params, body) {}

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
  pixDetailDevolution(params) {}

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
  pixCreateLocation(params, body) {}

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
  pixLocationList(params) {}

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
  pixDetailLocation(params) {}

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
  pixGenerateQRCode(params) {}

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
  pixUnlinkTxidLocation(params) {}

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
  pixCreateDueChargeBatch(params, body) {}

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
  pixUpdateDueChargeBatch(params, body) {}

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
  pixDetailDueChargeBatch(params) {}

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
  pixListDueChargeBatch(params) {}

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
  pixSplitConfig(params, body) {}

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
  pixSplitConfigId(params, body) {}

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
  pixSplitDetailConfig(params) {}

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
  pixSplitLinkCharge(params) {}

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
  pixSplitLinkDueCharge(params) {}

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
  pixSplitUnlinkCharge(params) {}

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
  pixSplitUnlinkDueCharge(params) {}

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
  pixSplitDetailCharge(params) {}

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

  pixSplitDetailDueCharge(params) {}

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
  pixConfigWebhook(params, body) {}

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
  pixDetailWebhook(params) {}

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
  pixListWebhook(params) {}

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
  pixDeleteWebhook(params) {}

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
  pixCreateEvp() {}

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
  pixListEvp() {}

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
  pixDeleteEvp(params) {}

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
  getAccountBalance() {}

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
  updateAccountConfig(params, body) {}

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
  listAccountConfig() {}

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
  medList(params) {}

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
  medDefense(params, body) {}

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
  createReport(params, body) {}

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
  detailReport(params) {}

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
  pixResendWebhook(params, body) {}

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
  pixGetReceipt(params) {}

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
  pixDetailRecurrenceAutomatic(params) {}

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
  pixUpdateRecurrenceAutomatic(params, body) {}

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
  pixListRecurrenceAutomatic(params) {}

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
  pixCreateRecurrenceAutomatic(params, body) {}

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
  pixCreateRequestRecurrenceAutomatic(params, body) {}

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
  pixDetailRequestRecurrenceAutomatic(params) {}

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
  pixUpdateRequestRecurrenceAutomatic(params, body) {}

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
  pixCreateAutomaticChargeTxid(params, body) {}

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
  pixUpdateAutomaticCharge(params, body) {}

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
  pixDetailAutomaticCharge(params) {}

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
  pixCreateAutomaticCharge(params, body) {}

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
  pixListAutomaticCharge(params) {}

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
  pixRetryRequestAutomaticCharge(params) {}

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
  pixCreateLocationRecurrenceAutomatic() {}

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
  pixListLocationRecurrenceAutomatic(params) {}

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
  pixDetailLocationRecurrenceAutomatic(params) {}

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
  pixUnlinkLocationRecurrenceAutomatic(params) {}

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
  pixConfigWebhookRecurrenceAutomatic(params, body) {}

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
  pixListWebhookRecurrenceAutomatic() {}

  /**
   * **DELETE /v2/webhookrec**
   * 
   * Cancelar o webhook de recorrência de Pix Automático
   * 
   * @returns {Promise<void>}
   * 
   */
  pixDeleteWebhookRecurrenceAutomatic() {}

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
  pixConfigWebhookAutomaticCharge(params, body) {}

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
  pixListWebhookAutomaticCharge() {}

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
  pixDeleteWebhookAutomaticCharge() {}
}

// @ts-nocheck
class OpenFinanceMethods extends PixMethods {
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
  ofConfigDetail() {}

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
  ofConfigUpdate(params, body) {}

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
  ofListParticipants(params) {}

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
  ofListPixPayment(params) {}

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
  ofStartPixPayment(params, body) {}

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
  ofDevolutionPix(params, body) {}

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
  ofStartSchedulePixPayment(params, body) {}

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
  ofListSchedulePixPayment(params) {}

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
  ofCancelSchedulePix(params) {}

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
  ofDevolutionSchedulePix(params, body) {}

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
  ofStartRecurrencyPixPayment(params, body) {}

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
  ofListRecurrencyPixPayment(params) {}

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
  ofCancelRecurrencyPix(params) {}

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
  ofDevolutionRecurrencyPix(params, body) {}

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
  ofReplaceRecurrencyPixParcel(params, body) {}

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
  ofCreateBiometricEnrollment(params, body) {}

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
  ofListBiometricEnrollment(params, body) {}

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
  ofCreateBiometricPixPayment(params, body) {}

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
  ofListBiometricPixPayment(params, body) {}
}

// @ts-nocheck
class PagamentoDeContasMethods extends OpenFinanceMethods {
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
  payDetailBarCode(params) {}

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
  payRequestBarCode(params, body) {}

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
  payDetailPayment(params) {}

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
  payListPayments(params) {}

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
  payConfigWebhook(params, body) {}

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
  payListWebhook(params) {}

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
  payDeleteWebhook(params, body) {}
}

// @ts-nocheck
class OpenAccountMethods extends PagamentoDeContasMethods {
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
  createAccount(params, body) {}

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
  getAccountCredentials(params) {}

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
  createAccountCertificate(params) {}

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
  accountConfigWebhook(params, body) {}

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
  accountDetailWebhook(params) {}

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
  accountListWebhook(params) {}

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
  accountDeleteWebhook(params) {}
}

class AllMethods extends OpenAccountMethods {}

// @ts-nocheck
class EfiPay extends AllMethods {
  /**
   * Construtor da classe EfiPay.
   * @param {Object} options - Objeto com opções de configuração e credenciais.
   * @param {boolean} options.sandbox - Indica o ambite deseja, true para homologação e false para produção.
   * @param {string} options.client_id - Client ID obtido em sua conta.
   * @param {string} options.client_secret - Client Secrect obtido em sua conta.
   * @param {string} [options.partner_token] - Token de parceiro caso tenha.
   * @param {string} [options.certificate] - Caminho para o certificado
   * @param {boolean} [options.cert_base64] - Indica se será enviado o certificado em base64
   * @param {boolean} [options.validate_mtls] - Indica se será utilizado mTLS ou não no webhook
   * @param {boolean} [options.validateMtls] - Indica se será utilizado mTLS ou não no webhook 
   * @param {boolean} [options.cache] - Inidica se você deseja usar cache no token de autenticação, por padrão `true`
   * 
   * @param {string} [options.pix_cert] - # PRETERIDO # Caminho para o certificado
   * @param {string} [options.pemKey] - Caminho para a chave privada, caso opte por enviar o certificado em PEM.
  */
  constructor(options) {
    super();
    if (options.cache === undefined) {
      options.cache = true;
    }
    if (options.pix_cert) {
      console.warn('⚠️  WARNING:\nO parâmetro "pix_cert" foi preterido, utilize "certificate" no lugar.');
      options.certificate = options.pix_cert;
    }
    let methods = {};
    Object.keys(constants.APIS).forEach(api => {
      Object.assign(methods, constants.APIS[api].ENDPOINTS);
    });
    let endpoints = new Endpoints(options, constants);
    Object.keys(methods).forEach(function (api) {
      EfiPay.prototype[api] = function (params, body) {
        return endpoints.run(api, params, body);
      };
    });
  }
}

export { EfiPay as default };

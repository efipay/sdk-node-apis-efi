/// <reference types="node" preserve="true" />

import * as z from "zod";
import type { Buffer } from "node:buffer";

export const StatusPixReceivedSchema = z.enum(['ATIVA', 'CONCLUIDA', 'REMOVIDA_PELO_USUARIO_RECEBEDOR', 'REMOVIDA_PELO_PSP'])

export const StatusPixDevolutionSchema = z.enum(['EM_PROCESSAMENTO', 'DEVOLVIDO', 'NAO_REALIZADO'])

export const StatusPixSendSchema = z.enum(['EM_PROCESSAMENTO', 'REALIZADO', 'NAO_REALIZADO'])

export const StatusPixRecSchema = z.enum(['CRIADA', 'APROVADA', 'REJEITADA', 'EXPIRADA', 'CANCELADA'])

export const StatusPixSolicRecSchema = z.enum(['CRIADA', 'ENVIADA', 'RECEBIDA', 'REJEITADA', 'ACEITA', 'EXPIRADA', 'CANCELADA'])

export const StatusPixCobRSchema = z.enum(['CRIADA', 'ATIVA', 'CONCLUIDA', 'EXPIRADA', 'REJEITADA', 'CANCELADA'])

export type StatusPixDevolution = z.infer<typeof StatusPixDevolutionSchema>

export type StatusPixReceived = z.infer<typeof StatusPixReceivedSchema>

export type StatusPixSend = z.infer<typeof StatusPixSendSchema>

export type StatusPixRec = z.infer<typeof StatusPixRecSchema>

export type StatusPixSolicRec = z.infer<typeof StatusPixSolicRecSchema>

export type StatusPixCobR = z.infer<typeof StatusPixCobRSchema>

export const PixCobCalendarioSchema = z
	.object({
		expiracao: z.number(),
	})
	.strict()

export type PixCobCalendario = z.infer<typeof PixCobCalendarioSchema>

export const PixCobVCalendarioSchema = z
	.object({
		dataDeVencimento: z.string(),
		validadeAposVencimento: z.number().optional(),
	})
	.strict()
export type PixCobVCalendario = z.infer<typeof PixCobVCalendarioSchema>

export const PixRecCalendarioSchema = z.object({
		dataFinal: z.string().optional(),
		dataInicial: z.string(),
		periodicidade: z.enum(['SEMANAL', 'MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL']),
	}).strict()

export type PixRecCalendario = z.infer<typeof PixRecCalendarioSchema>

export const PixCobDevedorSchema = z
	.union([
		z
			.object({
				cpf: z.string().describe('CPF do devedor (somente números)'),
				nome: z.string().describe('Nome do devedor'),
			})
			.strict(),
		z
			.object({
				cnpj: z.string().describe('CNPJ do devedor (somente números)'),
				nome: z.string().describe('Nome do devedor'),
			})
			.strict(),
	])
	.optional()
export type PixCobDevedor = z.infer<typeof PixCobDevedorSchema>

export const PixCobVDevedorSchema = z.union([
	z
		.object({
			cpf: z.string(),
			nome: z.string(),
			email: z.email().optional(),
			logradouro: z.string().optional(),
			cidade: z.string().optional(),
			uf: z.string().optional(),
			cep: z.string().optional(),
		})
		.strict(),
	z
		.object({
			cnpj: z.string(),
			nome: z.string(),
			email: z.email().optional(),
			logradouro: z.string().optional(),
			cidade: z.string().optional(),
			uf: z.string().optional(),
			cep: z.string().optional(),
		})
		.strict(),
])
export type PixCobVDevedor = z.infer<typeof PixCobVDevedorSchema>

export const PixAutomaticChargeDebtorSchema = z
	.object({
		email: z.email().optional(),
		logradouro: z.string().max(200).optional(),
		cidade: z.string().max(200).optional(),
		uf: z.string().max(2).optional(),
		cep: z.string().max(8).optional(),
	})
	.strict()

export type PixAutomaticChargeDebtor = z.infer<typeof PixAutomaticChargeDebtorSchema>

export const PixCobVRecebedorSchema = z.union([
	z
		.object({
			cpf: z.string(),
			nome: z.string(),
			email: z.email(),
			logradouro: z.string(),
			cidade: z.string(),
			uf: z.string(),
			cep: z.string(),
		})
		.strict(),
	z
		.object({
			cnpj: z.string(),
			nome: z.string(),
			email: z.email(),
			logradouro: z.string(),
			cidade: z.string(),
			uf: z.string(),
			cep: z.string(),
			nomeFantasia: z.string()
		})
		.strict(),
])
export type PixCobVRecebedor = z.infer<typeof PixCobVRecebedorSchema>

export const PixCobValorSchema = z
	.object({
		original: z.string(),
	})
	.strict()

export type PixCobValor = z.infer<typeof PixCobValorSchema>

export const PixCobVValorSchema = z
	.object({
		original: z.string(),
		multa: z
			.object({
				modalidade: z.number(),
				valorPerc: z.string(),
			})
			.strict()
			.optional(),
		juros: z
			.object({
				modalidade: z.number(),
				valorPerc: z.string(),
			})
			.strict()
			.optional(),
		abatimento: z
			.object({
				modalidade: z.number(),
				valorPerc: z.string(),
			})
			.strict()
			.optional(),
		desconto: z
			.union([
				z
					.object({
						modalidade: z.number(),
						valorPerc: z.string(),
					})
					.strict(),
				z
					.object({
						modalidade: z.number(),
						descontoDataFixa: z.array(
							z.object({
								data: z.string(),
								valorPerc: z.string(),
							}),
						),
					})
					.strict(),
			])
			.optional(),
	})
	.strict()
export type PixCobVValor = z.infer<typeof PixCobVValorSchema>

export const PixRecValorSchema = z.union([
	z.object({
		valorRec: z.string()
	}).strict(),
	z.object({
		valorMinimoRecebedor: z.string(),
	}).strict()
])

export type PixRecValor = z.infer<typeof PixRecValorSchema>

export const PixInfoAdicionalSchema = z
	.object({
		nome: z.string(),
		valor: z.string(),
	})
	.strict()

export type PixInfoAdicional = z.infer<typeof PixInfoAdicionalSchema>

// -------------------------------------------
// Criar cobrança imediata (sem txid)
// -------------------------------------------

export const PixCreateImmediateChargeBodySchema = z
	.object({
		calendario: PixCobCalendarioSchema,
		devedor: PixCobDevedorSchema,
		valor: PixCobValorSchema,
		chave: z.string(),
		solicitacaoPagador: z.string().optional(),
		loc: z.object({ id: z.number() }).optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
	})
	.strict()

export type PixCreateImmediateChargeBody = z.infer<typeof PixCreateImmediateChargeBodySchema>

export const PixCreateImmediateChargeResponseSchema = z
	.object({
		calendario: PixCobCalendarioSchema.extend({ criacao: z.string() }),
		txid: z.string(),
		revisao: z.number(),
		status: StatusPixReceivedSchema,
		valor: PixCobValorSchema,
		chave: z.string(),
		devedor: PixCobDevedorSchema,
		solicitacaoPagador: z.string().optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
		loc: z.object({
			id: z.number(),
			location: z.string(),
			tipoCob: z.literal('cob'),
			criacao: z.string(),
		}),
		location: z.string(),
		pixCopiaECola: z.string(),
	})
	.loose()

export type PixCreateImmediateChargeResponse = z.infer<typeof PixCreateImmediateChargeResponseSchema>

// -------------------------------------------
// Criar cobrança (com txid)
// -------------------------------------------

export const PixCreateChargeParamsSchema = z
	.object({
		txid: z.string(),
	})
	.strict()

export type PixCreateChargeParams = z.infer<typeof PixCreateChargeParamsSchema>

export const PixCreateChargeBodySchema = PixCreateImmediateChargeBodySchema

export type PixCreateChargeBody = z.infer<typeof PixCreateChargeBodySchema>

export const PixCreateChargeResponseSchema = PixCreateImmediateChargeResponseSchema

export type PixCreateChargeResponse = z.infer<typeof PixCreateChargeResponseSchema>

// -------------------------------------------
// Revisar cobrança
// -------------------------------------------

export const PixUpdateChargeParamsSchema = z
	.object({
		txid: z.string(),
	})
	.strict()

export type PixUpdateChargeParams = z.infer<typeof PixUpdateChargeParamsSchema>

export const PixUpdateChargeBodySchema = z
	.object({
		calendario: PixCobCalendarioSchema.optional(),

		devedor: PixCobDevedorSchema,

		valor: PixCobValorSchema.optional(),

		status: StatusPixReceivedSchema.optional(),

		chave: z.string().optional(),

		solicitacaoPagador: z.string().optional(),

		loc: z.object({ id: z.number() }).optional(),

		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
	})
	.strict()

export type PixUpdateChargeBody = z.infer<typeof PixUpdateChargeBodySchema>

export const PixUpdateChargeResponseSchema = z
	.object({
		calendario: PixCobCalendarioSchema.extend({
			criacao: z.string(),
		}),
		txid: z.string(),
		status: StatusPixReceivedSchema,
		revisao: z.number(),
		valor: PixCobValorSchema,
		chave: z.string(),
		devedor: PixCobDevedorSchema,
		solicitacaoPagador: z.string().optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
		loc: z.object({
			id: z.number(),
			location: z.string(),
			tipoCob: z.literal('cob'),
			criacao: z.string(),
		}),
		location: z.string(),
		pixCopiaECola: z.string(),
	})
	.loose()

export type PixUpdateChargeResponse = z.infer<typeof PixUpdateChargeResponseSchema>

// -------------------------------------------
// Consultar cobrança
// -------------------------------------------

export const PixDetailChargeParamsSchema = z
	.object({
		txid: z.string(),
		revisao: z.number().optional(),
	})
	.strict()

export type PixDetailChargeParams = z.infer<typeof PixDetailChargeParamsSchema>

export const PixDetailChargeResponseSchema = z
	.object({
		calendario: PixCobCalendarioSchema.extend({
			criacao: z.string(),
		}),
		txid: z.string(),
		revisao: z.number(),
		status: StatusPixReceivedSchema,
		valor: PixCobValorSchema,
		chave: z.string(),
		devedor: PixCobDevedorSchema,
		solicitacaoPagador: z.string().optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
		loc: z.object({
			id: z.number(),
			location: z.string(),
			tipoCob: z.literal('cob'),
			criacao: z.string(),
		}),
		location: z.string(),
		pixCopiaECola: z.string().optional(),
		pix: z
			.array(
				z
					.object({
						endToEndId: z.string(),
						txid: z.string(),
						valor: z.string(),
						horario: z.string(),
						infoPagador: z.string().optional(),
						devolucoes: z
							.array(
								z
									.object({
										id: z.string(),
										rtrId: z.string(),
										valor: z.string(),
										horario: z.object({
											solicitacao: z.string(),
										}),
										status: StatusPixDevolutionSchema,
									})
									.strict(),
							)
							.optional(),
					})
					.strict(),
			)
			.optional(),
	})
	.loose()

export type PixDetailChargeResponse = z.infer<typeof PixDetailChargeResponseSchema>

// -------------------------------------------
// Consultar lista de cobranças
// -------------------------------------------

export const PixListChargesParamsSchema = z
	.object({
		inicio: z.string(),
		fim: z.string(),
		cpf: z.string().optional(),
		cnpj: z.string().optional(),
		status: StatusPixReceivedSchema.optional(),
		'paginacao.paginaAtual': z.number().optional(),
		'paginacao.itensPorPagina': z.number().optional(),
	})
	.strict()

export type PixListChargesParams = z.infer<typeof PixListChargesParamsSchema>

export const PixListChargesResponseSchema = z
	.object({
		parametros: z
			.object({
				inicio: z.string(),
				fim: z.string(),
				paginacao: z
					.object({
						paginaAtual: z.number(),
						itensPorPagina: z.number(),
						quantidadeDePaginas: z.number(),
						quantidadeTotalDeItens: z.number(),
					})
					.strict(),
				cpf: z.string().optional(),
				cnpj: z.string().optional(),
				status: StatusPixReceivedSchema.optional(),
			})
			.strict(),

		cobs: z.array(
			z
				.object({
					calendario: PixCobCalendarioSchema.extend({
						criacao: z.string(),
					}),
					txid: z.string(),
					revisao: z.number(),
					status: StatusPixReceivedSchema,
					valor: PixCobValorSchema,
					chave: z.string(),
					devedor: PixCobDevedorSchema,
					solicitacaoPagador: z.string().optional(),
					infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
					loc: z.object({
						id: z.number(),
						location: z.string(),
						tipoCob: z.literal('cob'),
						criacao: z.string(),
					}),
					location: z.string(),
					pixCopiaECola: z.string().optional(),
					pix: z
						.array(
							z
								.object({
									endToEndId: z.string(),
									txid: z.string(),
									valor: z.string(),
									chave: z.string(),
									horario: z.string(),
									infoPagador: z.string().optional(),
									devolucoes: z
										.array(
											z
												.object({
													id: z.string(),
													rtrId: z.string(),
													valor: z.string(),
													horario: z.object({
														solicitacao: z.string(),
														liquidacao: z.string().optional(),
													}),
													status: StatusPixDevolutionSchema,
												})
												.strict(),
										)
										.optional(),
								})
								.strict(),
						)
						.optional(),
				})
				.strict(),
		),
	})
	.loose()

export type PixListChargesResponse = z.infer<typeof PixListChargesResponseSchema>

// -------------------------------------------
// Criar cobrança com vencimento
// -------------------------------------------

export const PixCreateDueChargeParamsSchema = z
	.object({
		txid: z.string(),
	})
	.strict()

export type PixCreateDueChargeParams = z.infer<typeof PixCreateDueChargeParamsSchema>

export const PixCreateDueChargeBodySchema = z
	.object({
		calendario: PixCobVCalendarioSchema,
		devedor: PixCobVDevedorSchema,
		valor: PixCobVValorSchema,
		chave: z.string(),
		solicitacaoPagador: z.string().optional(),
		loc: z.object({ id: z.number() }).optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
	})
	.strict()

export type PixCreateDueChargeBody = z.infer<typeof PixCreateDueChargeBodySchema>

export const PixCreateDueChargeResponseSchema = z
	.object({
		calendario: PixCobVCalendarioSchema.extend({ 
			criacao: z.string(),
			validadeAposVencimento: z.number()
		}),
		txid: z.string(),
		revisao: z.number(),
		status: StatusPixReceivedSchema,
		devedor: PixCobVDevedorSchema,
		recebedor: PixCobVRecebedorSchema,
		valor: PixCobVValorSchema,
		chave: z.string(),
		solicitacaoPagador: z.string().optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
		loc: z.object({
			id: z.number(),
			location: z.string(),
			tipoCob: z.literal('cobv'),
			criacao: z.string(),
		}),
		pixCopiaECola: z.string(),
	})
	.loose()

export type PixCreateDueChargeResponse = z.infer<typeof PixCreateDueChargeResponseSchema>

// -------------------------------------------
// Revisar cobrança com vencimento
// -------------------------------------------

export const PixUpdateDueChargeParamsSchema = z
	.object({
		txid: z.string(),
	})
	.strict()

export type PixUpdateDueChargeParams = z.infer<typeof PixUpdateDueChargeParamsSchema>

export const PixUpdateDueChargeBodySchema = z
	.object({
		calendario: PixCobVCalendarioSchema.partial().strict().optional(),

		devedor: z
			.object({
				cpf: z.string().optional(),
				cnpj: z.string().optional(),
				nome: z.string().optional(),
				email: z.email().optional(),
				logradouro: z.string().optional(),
				cidade: z.string().optional(),
				uf: z.string().optional(),
				cep: z.string().optional(),
			})
			.strict()
			.optional(),

		valor: z
			.object({
				original: z.string().optional(),
				multa: z.object({ modalidade: z.number().optional(), valorPerc: z.string().optional() }).strict().optional(),
				juros: z.object({ modalidade: z.number().optional(), valorPerc: z.string().optional() }).strict().optional(),
				abatimento: z.object({ modalidade: z.number().optional(), valorPerc: z.string().optional() }).strict().optional(),
				desconto: z
					.object({
						modalidade: z.number().optional(),
						valorPerc: z.string().optional(),
						descontoDataFixa: z
							.array(z.object({ data: z.string().optional(), valorPerc: z.string().optional() }).strict())
							.optional(),
					})
					.strict()
					.optional(),
			})
			.strict()
			.optional(),

		status: StatusPixReceivedSchema.optional(),

		chave: z.string().optional(),

		solicitacaoPagador: z.string().optional(),

		loc: z.object({ id: z.number() }).optional(),

		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
	})
	.strict()

export type PixUpdateDueChargeBody = z.infer<typeof PixUpdateDueChargeBodySchema>

export const PixUpdateDueChargeResponseSchema = z
	.object({
		calendario: PixCobVCalendarioSchema.extend({
			criacao: z.string(),
			validadeAposVencimento: z.number()
		}).strict(),
		txid: z.string(),
		revisao: z.number(),
		status: StatusPixReceivedSchema,
		devedor: PixCobVDevedorSchema,
		recebedor: PixCobVRecebedorSchema,
		valor: PixCobVValorSchema,	
		chave: z.string(),
		solicitacaoPagador: z.string().optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
		loc: z.object({
			id: z.number(),
			location: z.string(),
			tipoCob: z.literal('cobv'),
			criacao: z.string(),
		}).strict(),
		pixCopiaECola: z.string(),
	})
	.loose()

export type PixUpdateDueChargeResponse = z.infer<typeof PixUpdateDueChargeResponseSchema>

// -------------------------------------------
// Consultar cobrança com vencimento
// -------------------------------------------

export const PixDetailDueChargeParamsSchema = PixDetailChargeParamsSchema

export type PixDetailDueChargeParams = z.infer<typeof PixDetailDueChargeParamsSchema>

export const PixDetailDueChargeResponseSchema = z
	.object({
		calendario: PixCobVCalendarioSchema.extend({
			criacao: z.string(),
			validadeAposVencimento: z.number()
		}).strict(),
		txid: z.string(),
		revisao: z.number(),
		loc: z.object({
			id: z.number(),
			location: z.string(),
			tipoCob: z.literal('cobv')
		}).strict(),
		status: StatusPixReceivedSchema,
		devedor: PixCobVDevedorSchema,
		recebedor: PixCobVDevedorSchema,
		valor: PixCobVValorSchema,
		chave: z.string(),
		solicitacaoPagador: z.string().optional(),
		infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
		pixCopiaECola: z.string().optional(),
		pix: z
			.array(
				z
					.object({
						endToEndId: z.string(),
						txid: z.string(),
						valor: z.string(),
						chave: z.string(),
						horario: z.string(),
						infoPagador: z.string().optional(),
						devolucoes: z
							.array(
								z
									.object({
										id: z.string(),
										rtrId: z.string(),
										valor: z.string(),
										horario: z.object({
											solicitacao: z.string(),
											liquidacao: z.string().optional(),
										}),
										status: StatusPixDevolutionSchema,
									})
									.strict(),
							)
							.optional(),
					})
					.strict(),
			)
			.optional(),
	})
	.loose()

export type PixDetailDueChargeResponse = z.infer<typeof PixDetailDueChargeResponseSchema>

// -------------------------------------------
// Consultar lista de cobranças com vencimento
// -------------------------------------------

export const PixListDueChargesParamsSchema = z
	.object({
		inicio: z.string(),
		fim: z.string(),
		cpf: z.string().optional(),
		cnpj: z.string().optional(),
		locationPresente: z.boolean().optional(),
		status: StatusPixReceivedSchema.optional(),
		loteCobVId: z.string().optional(),
		'paginacao.paginaAtual': z.number().optional(),
		'paginacao.itensPorPagina': z.number().optional(),
	})
	.strict()
export type PixListDueChargesParams = z.infer<typeof PixListDueChargesParamsSchema>

export const PixListDueChargesResponseSchema = z
	.object({
		parametros: z
			.object({
				inicio: z.string(),
				fim: z.string(),
				paginacao: z
					.object({
						paginaAtual: z.number(),
						itensPorPagina: z.number(),
						quantidadeDePaginas: z.number(),
						quantidadeTotalDeItens: z.number(),
					})
					.strict(),
				cpf: z.string().optional(),
				cnpj: z.string().optional(),
				locationPresente: z.boolean().optional(),
				status: StatusPixReceivedSchema.optional(),
				loteCobVId: z.string().optional(),
			})
			.strict(),

		cobs: z.array(
			z
				.object({
					calendario: PixCobVCalendarioSchema.extend({
						criacao: z.string(),
						validadeAposVencimento: z.number()
					}),
					txid: z.string(),
					revisao: z.number(),
					status: StatusPixReceivedSchema,
					devedor: PixCobVDevedorSchema,
					recebedor: PixCobVRecebedorSchema,
					valor: PixCobVValorSchema,
					chave: z.string(),
					solicitacaoPagador: z.string().optional(),
					infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
					loc: z.object({
						id: z.number(),
						location: z.string(),
						tipoCob: z.literal('cobv'),
						criacao: z.string(),
					}),
					pixCopiaECola: z.string().optional(),
					pix: z
						.array(
							z
								.object({
									endToEndId: z.string(),
									txid: z.string(),
									valor: z.string(),
									chave: z.string(),
									horario: z.string(),
									infoPagador: z.string().optional(),
									devolucoes: z
										.array(
											z
												.object({
													id: z.string(),
													rtrId: z.string(),
													valor: z.string(),
													horario: z.object({
														solicitacao: z.string(),
														liquidacao: z.string().optional(),
													}),
													status: StatusPixDevolutionSchema,
												})
												.strict(),
										)
										.optional(),
								})
								.strict(),
						)
						.optional(),
				})
				.strict(),
		),
	})
	.loose()

export type PixListDueChargesResponse = z.infer<typeof PixListDueChargesResponseSchema>

// -------------------------------------------
// Criar recorrência de Pix Automático
// -------------------------------------------

export const PixCreateRecurrenceAutomaticBodySchema = z.object({
	vinculo: z.object({
		contrato: z.string(),
		devedor: PixCobDevedorSchema.nonoptional(),
		objeto: z.string().optional()
	}).strict(),
	calendario: PixRecCalendarioSchema,
	valor: PixRecValorSchema,
	politicaRetentativa: z.enum(['NAO_PERMITE', 'PERMITE_3R_7D']),
	loc: z.number().optional(),
	ativacao: z.object({
		dadosJornada: z.object({
			txid: z.string(),
		}).strict()
	}).strict().optional(),
}).strict()

export type PixCreateRecurrenceAutomaticBody = z.infer<typeof PixCreateRecurrenceAutomaticBodySchema>

export const PixCreateRecurrenceAutomaticResponseSchema = z.object({
	idRec: z.string(),
	status: StatusPixRecSchema,
	valor: PixRecValorSchema,
	vinculo: z.object({
		contrato: z.string(),
		devedor: PixCobDevedorSchema.nonoptional(),
		objeto: z.string().optional()
	}).strict(),
	calendario: PixRecCalendarioSchema,
	politicaRetentativa: z.enum(['NAO_PERMITE', 'PERMITE_3R_7D']),
	recebedor: z.object({
		cnpj: z.string(),
		nome: z.string(),
	}).strict(),
	loc: z.object({
		criacao: z.string(),
		id: z.number(),
		location: z.string(),
		idRec: z.string(),
	}).strict(),
	ativacao: z.object({
		tipoJornada: z.string(),
		dadosJornada: z.object({
			txid: z.string(),
		}).strict().optional()
	}).strict(),
	atualizacao: z.array(z.object({
		status: StatusPixRecSchema,
		data: z.string(),
	}).strict())
}).loose()

export type PixCreateRecurrenceAutomaticResponse = z.infer<typeof PixCreateRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Consultar recorrência de Pix Automático
// -------------------------------------------

export const PixDetailRecurrenceAutomaticParamsSchema = z.object({
	idRec: z.string(),
}).strict()

export type PixDetailRecurrenceAutomaticParams = z.infer<typeof PixDetailRecurrenceAutomaticParamsSchema>

export const PixDetailRecurrenceAutomaticResponseSchema = PixCreateRecurrenceAutomaticResponseSchema.extend({
	pagador: z.union([
		z.object({
			codMun: z.string(),
			cpf: z.string(),
			ispbParticipante: z.string(),
		}).strict(),
		z.object({
			codMun: z.string(),
			cnpj: z.string(),
			ispbParticipante: z.string(),
		}).strict()
	]).optional(),
	dadosQR: z.object({
		jornada: z.string(),
		pixCopiaECola: z.string(),
	}).strict(),
}).loose()

export type PixDetailRecurrenceAutomaticResponse = z.infer<typeof PixDetailRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Revisar recorrência de Pix Automático
// -------------------------------------------
             
export const PixUpdateRecurrenceAutomaticParamsSchema = PixDetailRecurrenceAutomaticParamsSchema

export type PixUpdateRecurrenceAutomaticParams = z.infer<typeof PixUpdateRecurrenceAutomaticParamsSchema>

export const PixUpdateRecurrenceAutomaticBodySchema = z.object({
	loc: z.number().optional(),
	status: z.literal('CANCELADA').optional(),
	vinculo: z.object({
		devedor: z.object({
			nome: z.string()
		}).strict()
	}).strict().optional(),
	calendario: z.object({
		dataInicial: z.string()
	}).strict().optional(),
	ativacao: z.object({
		dadosJornada: z.object({
			txid: z.string(),
		}).strict()
	}).strict().optional(),
}).strict()

export type PixUpdateRecurrenceAutomaticBody = z.infer<typeof PixUpdateRecurrenceAutomaticBodySchema>

export const PixUpdateRecurrenceAutomaticResponseSchema = PixCreateRecurrenceAutomaticResponseSchema

export type PixUpdateRecurrenceAutomaticResponse = z.infer<typeof PixUpdateRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Consultar lista de recorrências de Pix Automático
// -------------------------------------------

export const PixListRecurrenceAutomaticParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	cpf: z.string().optional(),
	cnpj: z.string().optional(),
	locationPresente: z.boolean().optional(),
	status: StatusPixRecSchema.optional(),
	convenio: z.string().optional(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()

export type PixListRecurrenceAutomaticParams = z.infer<typeof PixListRecurrenceAutomaticParamsSchema>

export const PixListRecurrenceAutomaticResponseSchema = z.object({
	parametros: z.object({
		inicio: z.string(),
		fim: z.string(),
		paginacao: z.object({
			paginaAtual: z.number(),
			itensPorPagina: z.number(),
			quantidadeDePaginas: z.number(),
			quantidadeTotalDeItens: z.number(),
		}).strict(),
		cpf: z.string().optional(),
		cnpj: z.string().optional(),
		locationPresente: z.boolean().optional(),
		status: StatusPixRecSchema.optional(),
		convenio: z.string().optional(),
	}).strict(),
	recs: z.array(PixDetailRecurrenceAutomaticResponseSchema)
}).loose() 

export type PixListRecurrenceAutomaticResponse = z.infer<typeof PixListRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Criar solicitação de confirmação de recorrência de Pix Automático
// -------------------------------------------

export const PixCreateRequestRecurrenceAutomaticBodySchema = z.object({
	idRec: z.string(),
	calendario: z.object({
		dataExpiracaoSolicitacao: z.string(),
	}).strict(),
	destinatario: z.union([
		z.object({
			agencia: z.string(),
			conta: z.string(),
			cpf: z.string(),
			ispbParticipante: z.string(),
		}).strict(),
		z.object({
			agencia: z.string(),
			conta: z.string(),
			cnpj: z.string(),
			ispbParticipante: z.string(),
		}).strict(),
	]),
}).strict()

export type PixCreateRequestRecurrenceAutomaticBody = z.infer<typeof PixCreateRequestRecurrenceAutomaticBodySchema>

export const PixCreateRequestRecurrenceAutomaticResponseSchema = z.object({
	idSolicRec: z.string(),
	idRec: z.string(),
	calendario: z.object({
		dataExpiracaoSolicitacao: z.string(),
	}).strict(),
    status: StatusPixSolicRecSchema,
	destinatario: z.union([
		z.object({
			agencia: z.string(),
			conta: z.string(),
			cpf: z.string(),
			ispbParticipante: z.string(),
		}).strict(),
		z.object({
			agencia: z.string(),
			conta: z.string(),
			cnpj: z.string(),
			ispbParticipante: z.string(),
		}).strict(),
	]),
	atualizacao: z.array(z.object({
		data: z.string(),
		status: StatusPixSolicRecSchema,
	}).strict()),
	recPayload: PixCreateRecurrenceAutomaticResponseSchema
}).loose()

export type PixCreateRequestRecurrenceAutomaticResponse = z.infer<typeof PixCreateRequestRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Consultar solicitação de confirmação de recorrência de Pix Automático
// -------------------------------------------

export const PixDetailRequestRecurrenceAutomaticParamsSchema = z.object({
	idSolicRec: z.string(),
}).strict()

export type PixDetailRequestRecurrenceAutomaticParams = z.infer<typeof PixDetailRequestRecurrenceAutomaticParamsSchema>

export const PixDetailRequestRecurrenceAutomaticResponseSchema = PixCreateRequestRecurrenceAutomaticResponseSchema

export type PixDetailRequestRecurrenceAutomaticResponse = z.infer<typeof PixDetailRequestRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Revisar solicitação de confirmação de recorrência de Pix Automático
// -------------------------------------------

export const PixUpdateRequestRecurrenceAutomaticParamsSchema = PixDetailRequestRecurrenceAutomaticParamsSchema

export type PixUpdateRequestRecurrenceAutomaticParams = z.infer<typeof PixUpdateRequestRecurrenceAutomaticParamsSchema>

export const PixUpdateRequestRecurrenceAutomaticBodySchema = z.object({
	status: z.literal('CANCELADA'),
}).strict()

export type PixUpdateRequestRecurrenceAutomaticBody = z.infer<typeof PixUpdateRequestRecurrenceAutomaticBodySchema>

export const PixUpdateRequestRecurrenceAutomaticResponseSchema = PixCreateRequestRecurrenceAutomaticResponseSchema

export type PixUpdateRequestRecurrenceAutomaticResponse = z.infer<typeof PixUpdateRequestRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Criar cobrança de Pix Automático (com txid)
// -------------------------------------------

export const PixCreateAutomaticChargeTxidParamsSchema = z.object({
	txid: z.string(),
}).strict()

export type PixCreateAutomaticChargeTxidParams = z.infer<typeof PixCreateAutomaticChargeTxidParamsSchema>

export const PixCreateAutomaticChargeTxidBodySchema = z.object({
	idRec: z.string(),
	infoAdicional: z.string().optional(),
	calendario: z.object({
		dataDeVencimento: z.string(),
	}).strict(),
	valor: PixCobValorSchema,
	ajusteDiaUtil: z.boolean(),
	devedor: PixAutomaticChargeDebtorSchema.optional(),
	recebedor: z.object({
		conta: z.string(),
		tipoConta: z.enum(['CORRENTE', 'POUPANCA', 'PAGAMENTO']),
		agencia: z.string(),
	}).strict()
}).strict()

export type PixCreateAutomaticChargeTxidBody = z.infer<typeof PixCreateAutomaticChargeTxidBodySchema>

export const PixCreateAutomaticChargeTxidResponseSchema = z.object({
	idRec: z.string(),
	txid: z.string(),
	infoAdicional: z.string().optional(),
	calendario: z.object({
		criacao: z.string(),
		dataDeVencimento: z.string(),
	}).strict(),
	valor: PixCobValorSchema,
	status: StatusPixCobRSchema,
	politicaRetentativa: z.enum(['NAO_PERMITE', 'PERMITE_3R_7D']),
	ajusteDiaUtil: z.boolean(),
	devedor: PixAutomaticChargeDebtorSchema.optional(),
	recebedor: z.object({
		conta: z.string(),
		tipoConta: z.enum(['CORRENTE', 'POUPANCA', 'PAGAMENTO']),
		agencia: z.string(),
		cnpj: z.string(),
		nome: z.string(),
	}).strict(),
	atualizacao: z.array(z.object({
		data: z.string(),
		status: StatusPixCobRSchema,
	}).strict())
}).loose()

export type PixCreateAutomaticChargeTxidResponse = z.infer<typeof PixCreateAutomaticChargeTxidResponseSchema>


// -------------------------------------------
// Revisar cobrança de Pix Automático
// -------------------------------------------

export const PixUpdateAutomaticChargeParamsSchema = PixCreateAutomaticChargeTxidParamsSchema

export type PixUpdateAutomaticChargeParams = z.infer<typeof PixUpdateAutomaticChargeParamsSchema>

export const PixUpdateAutomaticChargeBodySchema = z.object({
	status: z.literal('CANCELADA')
}).strict()

export type PixUpdateAutomaticChargeBody = z.infer<typeof PixUpdateAutomaticChargeBodySchema>

export const PixUpdateAutomaticChargeResponseSchema = PixCreateAutomaticChargeTxidResponseSchema

export type PixUpdateAutomaticChargeResponse = z.infer<typeof PixUpdateAutomaticChargeResponseSchema>

// -------------------------------------------
// Consultar cobrança de Pix Automático
// -------------------------------------------

export const PixDetailAutomaticChargeParamsSchema = PixCreateAutomaticChargeTxidParamsSchema

export type PixDetailAutomaticChargeParams = z.infer<typeof PixDetailAutomaticChargeParamsSchema>

export const PixDetailAutomaticChargeResponseSchema = PixCreateAutomaticChargeTxidResponseSchema.extend({
	pix: z.array(z.object({
		endToEndId: z.string(),
		txid: z.string(),
		valor: z.string(),
		horario: z.string(),
		devolucoes: z.array(
			z.object({
				id: z.string(),
				rtrId: z.string(),
				valor: z.string(),
				horario: z.object({
					solicitacao: z.string(),
					liquidacao: z.string().optional(),
				}),
				status: StatusPixDevolutionSchema,
			})
			.strict(),
		)
		.optional(),
	}).strict()).optional(),
	tentativas: z.array(z.object({
		dataLiquidacao: z.string(),
		tipo: z.string(),
		status: z.string(),
		endToEndId: z.string(),
		atualizacao: z.array(z.object({
			data: z.string(),
			status: z.string(),
		}).strict())
	}).strict()).optional(),
	encerramento: z
		.object({
			cancelamento: z
				.object({
					solicitante: z.string(),
					codigo: z.string(),
					descricao: z.string(),
				})
				.loose(),
		})
		.loose()
		.optional(),
}).loose()

export type PixDetailAutomaticChargeResponse = z.infer<typeof PixDetailAutomaticChargeResponseSchema>

// -------------------------------------------
// Criar cobrança de Pix Automático (sem txid)
// -------------------------------------------

export const PixCreateAutomaticChargeBodySchema = PixCreateAutomaticChargeTxidBodySchema

export type PixCreateAutomaticChargeBody = z.infer<typeof PixCreateAutomaticChargeBodySchema>

export const PixCreateAutomaticChargeResponseSchema = PixCreateAutomaticChargeTxidResponseSchema

export type PixCreateAutomaticChargeResponse = z.infer<typeof PixCreateAutomaticChargeResponseSchema>

// -------------------------------------------
// Consultar lista de cobranças de Pix Automático
// -------------------------------------------

// -------------------------------------------
// Requisitar envio de Pix
// -------------------------------------------

export const PixSendParamsSchema = z
	.object({
		idEnvio: z.string(),
	})
	.strict()

export type PixSendParams = z.infer<typeof PixSendParamsSchema>

export const PixSendBodySchema = z.object({
	valor: z.string(),
	pagador: z.object({
		chave: z.string(),
		infoPagador: z.string().optional(),
	}).strict(),
	favorecido: z.union([
		z.object({
			chave: z.string(),
			cpf: z.string().optional(),
		}).strict(),
		z.object({
			chave: z.string(),
			cnpj: z.string().optional(),
		}).strict(),
		z.object({
			contaBanco: z.object({
				nome: z.string(),
				cpf: z.string(),
				codigoBanco: z.string(),
				agencia: z.string(),
				conta: z.string(),
				tipoConta: z.enum(['cacc', 'svgs'])
			})
		}).strict(),
		z.object({
			contaBanco: z.object({
				nome: z.string(),
				cnpj: z.string(),
				codigoBanco: z.string(),
				agencia: z.string(),
				conta: z.string(),
				tipoConta: z.enum(['cacc', 'svgs'])
			})
		}).strict(),	
	])
})

export type PixSendBody = z.infer<typeof PixSendBodySchema>

export const PixSendResponseSchema = z
	.object({
		endToEndId: z.string(),
		idEnvio: z.string(),
		valor: z.string(),
		horario: z.object({
			solicitacao: z.string()
		}),
		status: z.literal('EM_PROCESSAMENTO')
	})
	.loose()

export type PixSendResponse = z.infer<typeof PixSendResponseSchema>

// -------------------------------------------
// Requisitar envio de Pix para contas de mesma titularidade
// -------------------------------------------

export const PixSendSameOwnershipParamsSchema = PixSendParamsSchema

export type PixSendSameOwnershipParams = z.infer<typeof PixSendSameOwnershipParamsSchema>

export const PixSendSameOwnershipBodySchema = PixSendBodySchema

export type PixSendSameOwnershipBody = z.infer<typeof PixSendSameOwnershipBodySchema>

export const PixSendSameOwnershipResponseSchema = PixSendResponseSchema

export type PixSendSameOwnershipResponse = z.infer<typeof PixSendSameOwnershipResponseSchema>

// -------------------------------------------
// Consultar Pix enviado através do endToEndId
// -------------------------------------------

export const PixSendDetailParamsSchema = z
	.object({
		e2eId: z.string(),
	})
	.strict()
export type PixSendDetailParams = z.infer<typeof PixSendDetailParamsSchema>

export const PixSendDetailResponseSchema = z.object({
	endToEndId: z.string(),
	idEnvio: z.string(),
	valor: z.string(),
	chave: z.string(),
	status: StatusPixSendSchema,
	infoPagador: z.string().optional(),
	horario: z.object({
		solicitacao: z.string(),
		liquidacao: z.string().optional(),
	}),
	favorecido: z.union([
		z.object({
			chave: z.string(),
		}).strict(),
		z.object({
			contaBanco: z.object({
				nome: z.string(),
				cpf: z.string(),
				agencia: z.string(),
				conta: z.string(),
				tipoConta: z.enum(['cacc', 'svgs'])
			})
		}).strict(),
		z.object({
			contaBanco: z.object({
				nome: z.string(),
				cnpj: z.string(),
				agencia: z.string(),
				conta: z.string(),
				tipoConta: z.enum(['cacc', 'svgs'])
			})
		}).strict(),
	]),
	devolucoes: z.array(z.object({
		rtrId: z.string(),
		valor: z.string(),
		horario: z.string()
	}).strict()).optional(),
}).loose()

export type PixSendDetailResponse = z.infer<typeof PixSendDetailResponseSchema>

// -------------------------------------------
// Consultar Pix enviado através do Identificador da transação
// -------------------------------------------
export const PixSendDetailIdParamsSchema = z
	.object({
		idEnvio: z.string(),
	})
	.strict()

export type PixSendDetailIdParams = z.infer<typeof PixSendDetailIdParamsSchema>

export const PixSendDetailIdResponseSchema = PixSendDetailResponseSchema

export type PixSendDetailIdResponse = z.infer<typeof PixSendDetailIdResponseSchema>

// -------------------------------------------
// Consultar lista de Pix enviados
// -------------------------------------------

export const PixSendListParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	status: StatusPixSendSchema.optional(),
	exibirCodigoBanco: z.boolean().optional(),
	cpf: z.string().optional(),
	cnpj: z.string().optional(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()

export type PixSendListParams = z.infer<typeof PixSendListParamsSchema>

export const PixSendListResponseSchema = z
	.object({
		parametros: z
			.object({
				inicio: z.string(),
				fim: z.string(),
				paginacao: z
					.object({
						paginaAtual: z.number(),
						itensPorPagina: z.number(),
						quantidadeDePaginas: z.number(),
						quantidadeTotalDeItens: z.number(),
					}),
				status: StatusPixSendSchema.optional(),
				exibirCodigoBanco: z.boolean().optional(),
				cpf: z.string().optional(),
				cnpj: z.string().optional(),
			})
			.strict(),
		pix: z.array(PixSendDetailResponseSchema)
		}).loose()

export type PixSendListResponse = z.infer<typeof PixSendListResponseSchema>

// -------------------------------------------
// Detalhar QR Code Pix
// -------------------------------------------

export const PixQrCodeDetailBodySchema = z
	.object({
		pixCopiaECola: z.string(),
	})
	.strict()

export type PixQrCodeDetailBody = z.infer<typeof PixQrCodeDetailBodySchema>

const PixQrCodeDetailCommonShape = {
	txid: z.string(),
	revisao: z.number(),
	status: StatusPixReceivedSchema,
	devedor: z.union([
		z.object({ cpf: z.string(), nome: z.string() }).loose(),
		z.object({ cnpj: z.string(), nome: z.string() }).loose(),
	]).optional(),
	recebedor: z.union([
		z.object({ cpf: z.string(), nome: z.string() }).loose(),
		z.object({ cnpj: z.string(), nome: z.string() }).loose(),
		z
			.object({
				logradouro: z.string(),
				cidade: z.string(),
				uf: z.string(),
				cep: z.string(),
				nome: z.string(),
				cnpj: z.string(),
			})
			.loose(),
		z
			.object({
				logradouro: z.string(),
				cidade: z.string(),
				uf: z.string(),
				cep: z.string(),
				nome: z.string(),
				cpf: z.string(),
			})
			.loose(),
	]),
	chave: z.string(),
	solicitacaoPagador: z.string().optional(),
	infoAdicionais: z.array(PixInfoAdicionalSchema).optional(),
};

export const PixQrCodeDetailResponseSchema = z.discriminatedUnion('tipoCob', [
	z
		.object({
			...PixQrCodeDetailCommonShape,
			tipoCob: z.literal('cob'),
			calendario: z
				.object({
					criacao: z.string(),
					apresentacao: z.string(),
					expiracao: z.number(),
				})
				.loose(),
			valor: PixCobValorSchema,
		})
		.loose(),
	z
		.object({
			...PixQrCodeDetailCommonShape,
			tipoCob: z.literal('cobv'),
			calendario: z
				.object({
					criacao: z.string(),
					apresentacao: z.string(),
					dataDeVencimento: z.string(),
					validadeAposVencimento: z.number(),
				})
				.loose(),
			valor: PixCobVValorSchema,
		})
		.loose(),
])

export type PixQrCodeDetailResponse = z.infer<typeof PixQrCodeDetailResponseSchema>

// -------------------------------------------
// Pagar QR Code Pix
// -------------------------------------------

export const PixQrCodePayParamsSchema = z
	.object({
		idEnvio: z.string(),
	})
	.strict()

export type PixQrCodePayParams = z.infer<typeof PixQrCodePayParamsSchema>

export const PixQrCodeBodySchema = z.object({
	pagador: z.object({
		chave: z.string(),
		infoPagador: z.string().optional(),
	}).strict(),
	pixCopiaECola: z.string(),
})

export type PixQrCodeBody = z.infer<typeof PixQrCodeBodySchema>

export const PixQrCodePayResponseSchema = PixSendResponseSchema

export type PixQrCodePayResponse = z.infer<typeof PixQrCodePayResponseSchema>

// -------------------------------------------
// Consultar Pix
// -------------------------------------------

export const PixDetailReceivedParamsSchema = z
	.object({
		e2eId: z.string(),
		exibirCodigoBanco: z.boolean().optional(),
	})
	.strict()

export type PixDetailReceivedParams = z.infer<typeof PixDetailReceivedParamsSchema>

export const PixDetailReceivedResponseSchema = z.object({
	endToEndId: z.string(),
	txid: z.string().optional(),
	valor: z.string(),
	chave: z.string(),
	horario: z.string(),
	pagador: z.object({
		contaBanco: z.object({
			codigoBanco: z.string(),
		})
	}).strict().optional(),
	devolucoes: z.array(z.object({
		id: z.string(),
		rtrId: z.string(),
		valor: z.string(),
		horario: z.object({
			solicitacao: z.string(),
			liquidacao: z.string().optional()
		}),
		status: StatusPixDevolutionSchema,
	}).strict()).optional(),
	infoPagador: z.string().optional(),
	}).loose()

export type PixDetailReceivedResponse = z.infer<typeof PixDetailReceivedResponseSchema>

// -------------------------------------------
// Consultar Pix recebidos
// -------------------------------------------

export const PixListReceivedParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	txid: z.string().optional(),
	txIdPresente: z.boolean().optional(),
	devolucaoPresente: z.boolean().optional(),
	cpf: z.string().optional(),
	cnpj: z.string().optional(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
	exibirCodigoBanco: z.boolean().optional(),
}).strict()

export type PixListReceivedParams = z.infer<typeof PixListReceivedParamsSchema>

export const PixListReceivedResponseSchema = z
	.object({
		parametros: z
			.object({
				inicio: z.string(),
				fim: z.string(),
				paginacao: z
					.object({
						paginaAtual: z.number(),
						itensPorPagina: z.number(),
						quantidadeDePaginas: z.number(),
						quantidadeTotalDeItens: z.number(),
					})
					.strict(),
				txid: z.string().optional(),
				txIdPresente: z.boolean().optional(),
				devolucaoPresente: z.boolean().optional(),
				cpf: z.string().optional(),
				cnpj: z.string().optional(),
				exibirCodigoBanco: z.boolean().optional(),
			})
			.strict(),
		pix: z.array(PixDetailReceivedResponseSchema),
	})
	.loose()

export type PixListReceivedResponse = z.infer<typeof PixListReceivedResponseSchema>

// -------------------------------------------
// Solicitar devolução
// -------------------------------------------

export const PixDevolutionParamsSchema = z
	.object({
		e2eId: z.string(),
		id: z.string(),
	})
	.strict()

export type PixDevolutionParams = z.infer<typeof PixDevolutionParamsSchema>

export const PixDevolutionBodySchema = z
	.object({
		valor: z.string(),
	})
	.strict()

export type PixDevolutionBody = z.infer<typeof PixDevolutionBodySchema>

export const PixDevolutionResponseSchema = z
	.object({
		id: z.string(),
		rtrId: z.string(),
		valor: z.string(),
		horario: z.object({
			solicitacao: z.string(),
		}),
		status: z.literal('EM_PROCESSAMENTO'),
	})
	.loose()

export type PixDevolutionResponse = z.infer<typeof PixDevolutionResponseSchema>

// -------------------------------------------
// Consultar devolução
// -------------------------------------------

export const PixDetailDevolutionParamsSchema = z
	.object({
		e2eId: z.string(),
		id: z.string(),
	})
	.strict()

export type PixDetailDevolutionParams = z.infer<typeof PixDetailDevolutionParamsSchema>

export const PixDetailDevolutionResponseSchema = z
	.object({
		id: z.string(),
		rtrId: z.string(),
		valor: z.string(),
		horario: z.object({
			solicitacao: z.string(),
			liquidacao: z.string().optional(),
		}),
		status: StatusPixDevolutionSchema,
		motivo: z.string().optional(),
	})
	.loose()

export type PixDetailDevolutionResponse = z.infer<typeof PixDetailDevolutionResponseSchema>

// -------------------------------------------
// Criar location do payload
// -------------------------------------------

export const PixCreateLocationBodySchema = z.object({
	tipoCob: z.enum(['cob', 'cobv']),
}).strict()

export type PixCreateLocationBody = z.infer<typeof PixCreateLocationBodySchema>

export const PixCreateLocationResponseSchema = z.object({
	id: z.number(),
	location: z.string(),
	tipoCob: z.enum(['cob', 'cobv']),
	criacao: z.string(),
}).loose()

export type PixCreateLocationResponse = z.infer<typeof PixCreateLocationResponseSchema>

// -------------------------------------------
// Consultar locations cadastradas
// -------------------------------------------

export const PixLocationListParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	txIdPresente: z.boolean().optional(),
	tipoCob: z.enum(['cob', 'cobv']).optional(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()

export type PixLocationListParams = z.infer<typeof PixLocationListParamsSchema>

export const PixLocationListResponseSchema = z.object({
	parametros: z.object({
		inicio: z.string(),
		fim: z.string(),
		paginacao: z.object({
			paginaAtual: z.number(),
			itensPorPagina: z.number(),
			quantidadeDePaginas: z.number(),
			quantidadeTotalDeItens: z.number(),
		}).strict(),
		txIdPresente: z.boolean().optional(),
		tipoCob: z.enum(['cob', 'cobv']).optional(),
	}).strict(),
	locs: z.array(PixCreateLocationResponseSchema.extend({
		txid: z.string().optional(),
	})),
}).loose()

export type PixLocationListResponse = z.infer<typeof PixLocationListResponseSchema>

// -------------------------------------------
// Recuperar location do payload
// -------------------------------------------

export const PixDetailLocationParamsSchema = z.object({
	id: z.number(),
}).strict()

export type PixDetailLocationParams = z.infer<typeof PixDetailLocationParamsSchema>

export const PixDetailLocationResponseSchema = PixCreateLocationResponseSchema.extend({
	txid: z.string().optional(),
}).loose()

export type PixDetailLocationResponse = z.infer<typeof PixDetailLocationResponseSchema>

// -------------------------------------------
// Desvincular location de txid
// -------------------------------------------

export const PixUnlinkTxidLocationParamsSchema = z.object({
	id: z.number(),
}).strict()

export type PixUnlinkTxidLocationParams = z.infer<typeof PixUnlinkTxidLocationParamsSchema>

export const PixUnlinkTxidLocationResponseSchema = PixCreateLocationResponseSchema

export type PixUnlinkTxidLocationResponse = z.infer<typeof PixUnlinkTxidLocationResponseSchema>

// -------------------------------------------
// Criar location do payload de recorrência de Pix Automático
// -------------------------------------------

export const PixCreateLocationRecurrenceAutomaticResponseSchema = z.object({
	id: z.number(),
	location: z.string(),
	criacao: z.string(),
}).loose()

export type PixCreateLocationRecurrenceAutomaticResponse = z.infer<typeof PixCreateLocationRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Consultar locations de recorrência de Pix Automático cadastradas
// -------------------------------------------

export const PixListLocationRecurrenceAutomaticParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	idRecPresente: z.boolean().optional(),
	convenio: z.string().optional(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()

export type PixListLocationRecurrenceAutomaticParams = z.infer<typeof PixListLocationRecurrenceAutomaticParamsSchema>

export const PixListLocationRecurrenceAutomaticResponseSchema = z.object({
	parametros: z.object({
		inicio: z.string(),
		fim: z.string(),
		paginacao: z.object({
			paginaAtual: z.number(),
			itensPorPagina: z.number(),
			quantidadeDePaginas: z.number(),
			quantidadeTotalDeItens: z.number(),
		}).strict(),
		idRecPresente: z.boolean().optional(),
		convenio: z.string().optional(),
	}).strict(),
	loc: z.array(PixCreateLocationRecurrenceAutomaticResponseSchema)
}).loose()

export type PixListLocationRecurrenceAutomaticResponse = z.infer<typeof PixListLocationRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Recuperar location do payload de recorrência de Pix Automático
// -------------------------------------------

export const PixDetailLocationRecurrenceAutomaticParamsSchema = z.object({
	id: z.number(),
}).strict()

export type PixDetailLocationRecurrenceAutomaticParams = z.infer<typeof PixDetailLocationRecurrenceAutomaticParamsSchema>

export const PixDetailLocationRecurrenceAutomaticResponseSchema = PixCreateLocationRecurrenceAutomaticResponseSchema.extend({
	idRec: z.string().optional(),
}).loose()

export type PixDetailLocationRecurrenceAutomaticResponse = z.infer<typeof PixDetailLocationRecurrenceAutomaticResponseSchema>


// -------------------------------------------
// Desvincular uma recorrência de Pix Automático de um location
// -------------------------------------------

export const PixUnlinkLocationRecurrenceAutomaticParamsSchema = z.object({
	id: z.number(),
}).strict()

export type PixUnlinkLocationRecurrenceAutomaticParams = z.infer<typeof PixUnlinkLocationRecurrenceAutomaticParamsSchema>

export const PixUnlinkLocationRecurrenceAutomaticResponseSchema = PixCreateLocationRecurrenceAutomaticResponseSchema

export type PixUnlinkLocationRecurrenceAutomaticResponse = z.infer<typeof PixUnlinkLocationRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Gerar QR Code de um location
// -------------------------------------------

export const PixGenerateQRCodeParamsSchema = z.object({
	id: z.number(),
}).strict()

export type PixGenerateQRCodeParams = z.infer<typeof PixGenerateQRCodeParamsSchema>

export const PixGenerateQRCodeResponseSchema = z.object({
	qrcode: z.string(),
	imagemQrcode: z.string(),
	linkVisualizacao: z.string()
}).loose()

export type PixGenerateQRCodeResponse = z.infer<typeof PixGenerateQRCodeResponseSchema>

// -------------------------------------------
// Configuração de um Split de pagamento (sem passar id)
// -------------------------------------------

export const PixSplitConfigBodySchema = z.object({
	descricao: z.string(),
	txid: z.string().optional(),
	lancamento: z.object({
		imediato: z.boolean()
	}).strict(),
	split: z.object({
		divisaoTarifa: z.enum(['assumir_total', 'proporcional']),
		minhaParte: z.object({
			tipo: z.enum(['porcentagem', 'fixo']),
			valor: z.string().describe('60 = 60.00')
		}).strict(),
		repasses: z.array(z.object({
			tipo: z.enum(['porcentagem', 'fixo']),
			valor: z.string(),
			favorecido: z.union([z.object({
				cpf: z.string(),
				conta: z.string()
			}).strict(), 
			z.object({
				cnpj: z.string(),
				conta: z.string()
			}).strict()])
		}).strict())
	}).strict()
}).strict()

export type PixSplitConfigBody = z.infer<typeof PixSplitConfigBodySchema>

export const PixSplitConfigResponseSchema = z.object({
	id: z.string(),
	status: z.string(),
	txid: z.string().optional(),
	descricao: z.string(),
	lancamento: z.object({
		imediato: z.boolean()
	}),
	split: z.object({
		divisaoTarifa: z.enum(['assumir_total', 'proporcional']),
		minhaParte: z.object({
			tipo: z.enum(['porcentagem', 'fixo']),
			valor: z.string().describe('60 = 60.00')
		}).strict(),
		repasses: z.array(z.object({
			tipo: z.enum(['porcentagem', 'fixo']),
			valor: z.string(),
			favorecido: z.union([z.object({
				cpf: z.string(),
				conta: z.string()
			}).strict(), 
			z.object({
				cnpj: z.string(),
				conta: z.string()
			}).strict()])
		}).strict())
	}).strict()
}).loose()

export type PixSplitConfigResponse = z.infer<typeof PixSplitConfigResponseSchema>

// -------------------------------------------
// Configuração de um Split de pagamento (com id)
// -------------------------------------------

export const PixSplitConfigIdParamsSchema = z.object({
	id: z.string(),
}).strict()

export type PixSplitConfigIdParams = z.infer<typeof PixSplitConfigIdParamsSchema>

export const PixSplitConfigIdBodySchema = PixSplitConfigBodySchema

export type PixSplitConfigIdBody = z.infer<typeof PixSplitConfigIdBodySchema>

export const PixSplitConfigIdResponseSchema = PixSplitConfigResponseSchema

export type PixSplitConfigIdResponse = z.infer<typeof PixSplitConfigIdResponseSchema>

// -------------------------------------------
// Consultar configuração do Split por id
// -------------------------------------------

export const PixSplitDetailConfigParamsSchema = z.object({
	id: z.string(),
	revisao: z.number().optional()
}).strict()

export type PixSplitDetailConfigParams = z.infer<typeof PixSplitDetailConfigParamsSchema>

export const PixSplitDetailConfigResponseSchema = PixSplitConfigResponseSchema.extend({
	revisao: z.number()
}).loose()

export type PixSplitDetailConfigResponse = z.infer<typeof PixSplitDetailConfigResponseSchema>

// -------------------------------------------
// Vincular uma cobrança a um Split de pagamento
// -------------------------------------------

export const PixSplitLinkChargeParamsSchema = z.object({
	txid: z.string(),
	splitConfigId: z.string()
}).strict()

export type PixSplitLinkChargeParams = z.infer<typeof PixSplitLinkChargeParamsSchema>

export type PixSplitLinkChargeResponse = void

// -------------------------------------------
// Consultar cobrança com Split de pagamento por txid - Desativado
// -------------------------------------------

export const PixSplitDetailChargeParamsSchema = z.object({
	txid: z.string()
}).strict()

export type PixSplitDetailChargeParams = z.infer<typeof PixSplitDetailChargeParamsSchema>

export const PixSplitDetailChargeResponseSchema = PixDetailChargeResponseSchema.extend({
	config: z.object({
		id: z.string(),
		status: z.string(),
		descricao: z.string()
	}).loose()
}).loose()

export type PixSplitDetailChargeResponse = z.infer<typeof PixSplitDetailChargeResponseSchema>

// -------------------------------------------
// Deletar o vínculo entre um Split de pagamento e uma cobrança
// -------------------------------------------

export const PixSplitUnlinkChargeParamsSchema = z.object({
	txid: z.string(),
}).strict()

export type PixSplitUnlinkChargeParams = z.infer<typeof PixSplitUnlinkChargeParamsSchema>

export type PixSplitUnlinkChargeResponse = void

// -------------------------------------------
// Vincular uma cobrança com vencimento a um Split de pagamento por txid
// -------------------------------------------

export const PixSplitLinkDueChargeParamsSchema = PixSplitLinkChargeParamsSchema

export type PixSplitLinkDueChargeParams = z.infer<typeof PixSplitLinkDueChargeParamsSchema>

export type PixSplitLinkDueChargeResponse = void

// -------------------------------------------
// Consultar cobrança com vencimento e com Split de pagamento por txid - Desativado
// -------------------------------------------

export const PixSplitDetailDueChargeParamsSchema = PixSplitDetailChargeParamsSchema

export type PixSplitDetailDueChargeParams = z.infer<typeof PixSplitDetailDueChargeParamsSchema>

export const PixSplitDetailDueChargeResponseSchema = PixSplitDetailChargeResponseSchema

export type PixSplitDetailDueChargeResponse = z.infer<typeof PixSplitDetailDueChargeResponseSchema>

// -------------------------------------------
// Deletar o vínculo entre um Split de pagamento e uma cobrança com vencimento
// -------------------------------------------

export const PixSplitUnlinkDueChargeParamsSchema = PixSplitUnlinkChargeParamsSchema

export type PixSplitUnlinkDueChargeParams = z.infer<typeof PixSplitUnlinkDueChargeParamsSchema>

export type PixSplitUnlinkDueChargeResponse = void

// -------------------------------------------
// Configurar o webhook Pix
// -------------------------------------------

export const PixConfigWebhookParamsSchema = z.object({
	chave: z.string()
}).strict()

export type PixConfigWebhookParams = z.infer<typeof PixConfigWebhookParamsSchema>

export const PixConfigWebhookBodySchema = z.object({
	webhookUrl: z.url()
}).strict()

export type PixConfigWebhookBody = z.infer<typeof PixConfigWebhookBodySchema>

export const PixConfigWebhookResponseSchema = z.object({
	webhookUrl: z.url()
}).loose()

export type PixConfigWebhookResponse = z.infer<typeof PixConfigWebhookResponseSchema>

// -------------------------------------------
// Exibir informações do webhook Pix
// -------------------------------------------

export const PixDetailWebhookParamsSchema = PixConfigWebhookParamsSchema

export type PixDetailWebhookParams = z.infer<typeof PixDetailWebhookParamsSchema>

export const PixDetailWebhookResponseSchema = z.object({
	webhookUrl: z.url(),
	chave: z.string(),
	criacao: z.string()
}).loose()

export type PixDetailWebhookResponse = z.infer<typeof PixDetailWebhookResponseSchema>

// -------------------------------------------
// Consultar lista de webhooks
// -------------------------------------------

export const PixListWebhookParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string()
}).strict()

export type PixListWebhookParams = z.infer<typeof PixListWebhookParamsSchema>

export const PixListWebhookResponseSchema = z.object({
	parametros: z.object({
		inicio: z.string(),
		fim: z.string(),
		paginacao: z.object({
			paginaAtual: z.number(),
			itensPorPagina: z.number(),
			quantidadeDePaginas: z.number(),
			quantidadeTotalDeItens: z.number(),
		}).strict(),
	}).strict(),
	webhooks: z.array(PixDetailWebhookResponseSchema)
}).loose()

export type PixListWebhookResponse = z.infer<typeof PixListWebhookResponseSchema>

// -------------------------------------------
// Cancelar webhook Pix
// -------------------------------------------

export const PixDeleteWebhookParamsSchema = PixConfigWebhookParamsSchema

export type PixDeleteWebhookParams = z.infer<typeof PixDeleteWebhookParamsSchema>

export type PixDeleteWebhookResponse = void

// -------------------------------------------
// Configurar o webhook de recorrência de Pix Automático
// -------------------------------------------

export const PixConfigWebhookRecurrenceAutomaticBodySchema = PixConfigWebhookBodySchema

export type PixConfigWebhookRecurrenceAutomaticBody = z.infer<typeof PixConfigWebhookRecurrenceAutomaticBodySchema>

export type PixConfigWebhookRecurrenceAutomaticResponse = void

// -------------------------------------------
// Exibir informações do webhook de recorrência de Pix Automático
// -------------------------------------------

export const PixListWebhookRecurrenceAutomaticResponseSchema = z.object({
	webhookUrl: z.url(),
	criacao: z.string()
}).loose()

export type PixListWebhookRecurrenceAutomaticResponse = z.infer<typeof PixListWebhookRecurrenceAutomaticResponseSchema>

// -------------------------------------------
// Cancelar o webhook de recorrência de Pix Automático
// -------------------------------------------

export type PixDeleteWebhookRecurrenceAutomaticResponse = void

// -------------------------------------------
// Configurar o webhook de cobrança de Pix Automático
// -------------------------------------------

export const PixConfigWebhookAutomaticChargeBodySchema = PixConfigWebhookBodySchema

export type PixConfigWebhookAutomaticChargeBody = z.infer<typeof PixConfigWebhookAutomaticChargeBodySchema>

export type PixConfigWebhookAutomaticChargeResponse = void

// -------------------------------------------
// Exibir informações do webhook de cobrança de Pix Automático
// -------------------------------------------

export const PixListWebhookAutomaticChargeResponseSchema = z.object({
	webhookUrl: z.url(),
	criacao: z.string()
}).loose()

export type PixListWebhookAutomaticChargeResponse = z.infer<typeof PixListWebhookAutomaticChargeResponseSchema>

// -------------------------------------------
// Cancelar o webhook de cobrança de Pix Automático
// -------------------------------------------

export type PixDeleteWebhookAutomaticChargeResponse = void

// -------------------------------------------
// Reenviar webhook Pix
// -------------------------------------------

export const PixResendWebhookBodySchema = z.object({
	tipo: z.enum(['PIX_RECEBIDO', 'PIX_ENVIADO', 'DEVOLUCAO_RECEBIDA', 'DEVOLUCAO_ENVIADA']),
	e2eids: z.array(z.string()).min(1).max(1000),
}).strict()

export type PixResendWebhookBody = z.infer<typeof PixResendWebhookBodySchema>

export type PixResendWebhookResponse = void

// -------------------------------------------
// Criar chave pix aleatória
// -------------------------------------------

export const PixCreateEvpResponseSchema = z.object({
	chave: z.string(),
}).loose()

export type PixCreateEvpResponse = z.infer<typeof PixCreateEvpResponseSchema>

// -------------------------------------------
// Listar chaves pix aleatórias
// -------------------------------------------

export const PixListEvpResponseSchema = z.object({
	chaves: z.array(z.string())
}).loose()

export type PixListEvpResponse = z.infer<typeof PixListEvpResponseSchema>

// -------------------------------------------
// Remover chave pix aleatória
// -------------------------------------------

export const PixDeleteEvpParamsSchema = z.object({
	chave: z.string(),
}).strict()

export type PixDeleteEvpParams = z.infer<typeof PixDeleteEvpParamsSchema>

export type PixDeleteEvpResponse = void

// -------------------------------------------
// Buscar o saldo da conta
// -------------------------------------------

export const GetAccountBalanceParamsSchema = z.object({
	bloqueios: z.boolean().optional(),
}).strict()

export type GetAccountBalanceParams = z.infer<typeof GetAccountBalanceParamsSchema>

export const GetAccountBalanceResponseSchema = z.object({
	saldo: z.string(),
	bloqueios: z.object({
		judicial: z.string(),
		med: z.string(),
		total: z.string(),
	}).strict().optional(),
}).loose()

export type GetAccountBalanceResponse = z.infer<typeof GetAccountBalanceResponseSchema>

// -------------------------------------------
// Criar/modificar configurações da conta
// -------------------------------------------

export const UpdateAccountConfigBodySchema = z.object({
	pix: z.object({
		receberSemChave: z.boolean(),
		chaves: z.record(z.string(), z.object({
			recebimento: z.object({
				txidObrigatorio: z.boolean(),
				recusarTipoPessoa: z.enum(['PF', 'PJ']).optional(),
				qrCodeEstatico: z.object({
					recusarTodos: z.boolean(),
				}).strict(),
				documentoPagadorIgualDevedor: z.boolean().optional(),
				webhook: z.object({
					notificacao: z.object({
						tarifa: z.boolean(),
						pagador: z.boolean(),
					}).strict().optional(),
					notificar: z.object({
						pixSemTxid: z.boolean(),
					}).strict().optional()
				}).strict().optional()
			}).strict(),
			envio: z.object({
				webhook: z.object({
					notificacao: z.object({
						tarifa: z.boolean(),
						favorecido: z.boolean(),
					}).strict()
				}).strict()
			}).strict().optional()
		}).strict()).optional()
	}).strict()
}).strict()

export type UpdateAccountConfigBody = z.infer<typeof UpdateAccountConfigBodySchema>

export type UpdateAccountConfigResponse = void

// -------------------------------------------
// Listar configurações da conta
// -------------------------------------------

export const ListAccountConfigResponseSchema = UpdateAccountConfigBodySchema.loose()

export type ListAccountConfigResponse = z.infer<typeof ListAccountConfigResponseSchema>


// -------------------------------------------
// Obter comprovantes
// -------------------------------------------

export const PixGetReceiptParamsSchema = z.union([
	z.object({
		txid: z.string(),
	}).strict(),
	z.object({
		e2eid: z.string(),
	}).strict(),
	z.object({
		idEnvio: z.string(),
	}),
	z.object({
		rtrId: z.string(),
	}).strict(),
])

export type PixGetReceiptParams = z.infer<typeof PixGetReceiptParamsSchema>

export type PixGetReceiptResponse = Buffer

// -------------------------------------------
// Consultar baldes de fichas
// -------------------------------------------

export const PixKeysBucketResponseSchema = z.object({
	baldeA: z.object({
		tiposChave: z.tuple([z.literal("cpf"), z.literal("cnpj"), z.literal("evp")]),
		capacidade: z.number(),
		fichasDisponiveis: z.number(),
		taxaDeReposicaoFichas: z.number(),
		periodoReposicaoEmSegundos: z.number(),
	}).strict(),
	baldeB: z.object({
		tiposChave: z.tuple([z.literal("telefone"), z.literal("email")]),
		capacidade: z.number(),
		fichasDisponiveis: z.number(),
		taxaDeReposicaoFichas: z.number(),
		periodoReposicaoEmSegundos: z.number(),
	}).strict(),
}).loose()

export type PixKeysBucketResponse = z.infer<typeof PixKeysBucketResponseSchema>

// -------------------------------------------
// Listar infrações MED da conta
// -------------------------------------------

export const MedListParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()

export type MedListParams = z.infer<typeof MedListParamsSchema>

export const MedListResponseSchema = z.object({
	parametros: z.object({
		inicio: z.string(),
		fim: z.string(),
		paginacao: z.object({
			paginaAtual: z.number(),
			itensPorPagina: z.number(),
			quantidadeDePaginas: z.number(),
			quantidadeTotalDeItens: z.number(),
		}).strict(),
	}).strict(),
	infracoes: z.array(z.object({
		idInfracao: z.string(),
		endToEndId: z.string(),
		protocolo: z.number(),
		dataTransacao: z.string(),
		valor: z.number(),
		chave: z.string().optional(),
		status: z.enum(["ABERTA", "ACEITA", "CANCELADA_EFI", "CANCELADA_EFI", "EM_DEFESA", "REJEITADA"]),
		razao: z.string(),
		tipoSituacao: z.enum(["golpe", "aquisição da conta", "coerção", "acesso fraudulento", "outro", "desconhecido"]).optional(),
		tipoFraude: z.string().optional(),
		comentario: z.string().optional(),
		defesa: z.string().optional(),
		justificativaAnalista: z.string().optional(),
		identificadorTicket: z.array(z.number()),
		dadosAnalise: z.object({
			abertura: z.string(),
			prazoFinalizacao: z.string(),
			recebimentoDefesa: z.string().optional(),
			finalizacao: z.string().optional()
		}).strict(),
		origem: z.object({
			nomeParticipante: z.string(),
			conta: z.number(),
			nome: z.string(),
			documento: z.string(),
		}).strict(),
		destino: z.object({
			nomeParticipante: z.string(),
			conta: z.number(),
			nome: z.string(),
			documento: z.string(),
		}).strict(),
		criadoEm: z.string(),
		atualizadoEm: z.string()
	}).strict())
}).loose()

export type MedListResponse = z.infer<typeof MedListResponseSchema>

// -------------------------------------------
// Submeter defesa de infração MED
// -------------------------------------------

export const MedSubmitDefenseParamsSchema = z.object({
	idInfracao: z.string(),
}).strict()

export type MedSubmitDefenseParams = z.infer<typeof MedSubmitDefenseParamsSchema>

export const MedSubmitDefenseBodySchema = z.object({
	analise: z.literal('rejeitado'),
	justificativa: z.string(),
}).strict()

export type MedSubmitDefenseBody = z.infer<typeof MedSubmitDefenseBodySchema>

export type MedSubmitDefenseResponse = void

// -------------------------------------------
// Requisitar Extrato Conciliação
// -------------------------------------------

export const CreateReportBodySchema = z.object({
	dataMovimento: z.string(),
	tipoRegistros: z.object({
		pixRecebido: z.boolean().optional(),
		pixEnviadoChave: z.boolean().optional(),
		pixEnviadoDadosBancarios: z.boolean().optional(),
		estornoPixEnviado: z.boolean().optional(),
		pixDevolucaoEnviada: z.boolean().optional(),
		pixDevolucaoRecebida: z.boolean().optional(),
		tarifaPixEnviado: z.boolean().optional(),
		tarifaPixRecebido: z.boolean().optional(),
		estornoTarifaPixEnviado: z.boolean().optional(),
		saldoDiaAnterior: z.boolean().optional(),
		saldoDia: z.boolean().optional(),
		transferenciaEnviada: z.boolean().optional(),
		transferenciaRecebida: z.boolean().optional(),
		estornoTransferenciaEnviada: z.boolean().optional(),
		tarifaTransferenciaEnviada: z.boolean().optional(),
		estornoTarifaTransferenciaEnviada: z.boolean().optional(),
		estornoTarifaPixRecebido: z.boolean().optional(),
	}).strict()
}).strict()

export type CreateReportBody = z.infer<typeof CreateReportBodySchema>

export const CreateReportResponseSchema = z.object({
	id: z.string(),
	dataSolicitacao: z.string(),
	status: z.enum(['AGUARDANDO_PROCESSAMENTO', 'EM_PROCESSAMENTO', 'CONCLUIDO']),
}).loose()

export type CreateReportResponse = z.infer<typeof CreateReportResponseSchema>

// -------------------------------------------
// Solicitar Download Extrato Conciliação
// -------------------------------------------

export const DetailReportParamsSchema = z.object({
	id: z.string()
}).strict()

export type DetailReportParams = z.infer<typeof DetailReportParamsSchema>

export const DetailReportResponseSchema = z.union([CreateReportResponseSchema, z.string()])

export type DetailReportResponse = z.infer<typeof DetailReportResponseSchema>

export const PixCreateDueChargeBatchParamsSchema = z.object({
	id: z.number(),
}).strict()
export type PixCreateDueChargeBatchParams = z.infer<typeof PixCreateDueChargeBatchParamsSchema>

export const PixDueChargeBatchItemSchema = PixCreateDueChargeBodySchema.extend({
	txid: z.string(),
}).strict()
export type PixDueChargeBatchItem = z.infer<typeof PixDueChargeBatchItemSchema>

export const PixCreateDueChargeBatchBodySchema = z.object({
	descricao: z.string().optional(),
	cobsv: z.array(PixDueChargeBatchItemSchema),
}).strict()
export type PixCreateDueChargeBatchBody = z.infer<typeof PixCreateDueChargeBatchBodySchema>

export const PixUpdateDueChargeBatchParamsSchema = PixCreateDueChargeBatchParamsSchema
export type PixUpdateDueChargeBatchParams = z.infer<typeof PixUpdateDueChargeBatchParamsSchema>
export const PixUpdateDueChargeBatchBodySchema = z
	.object({
		descricao: z.string().optional(),
		cobsv: z.array(PixUpdateDueChargeBodySchema.extend({ txid: z.string() }).strict()),
	})
	.strict()
export type PixUpdateDueChargeBatchBody = z.infer<typeof PixUpdateDueChargeBatchBodySchema>

const PixDueChargeBatchProblemResponseSchema = z
	.object({
		type: z.string(),
		title: z.string(),
		status: z.number(),
		detail: z.string(),
		violacoes: z.array(
			z
				.object({
					razao: z.string(),
					propriedade: z.string(),
				})
				.loose(),
		),
	})
	.loose()

const PixDueChargeBatchItemResponseSchema = z
	.object({
		criacao: z.string().optional(),
		txid: z.string(),
		status: z.string(),
		problema: PixDueChargeBatchProblemResponseSchema.optional(),
	})
	.loose()

export const PixDueChargeBatchResponseSchema = z
	.object({
		descricao: z.string(),
		criacao: z.string(),
		cobsv: z.array(PixDueChargeBatchItemResponseSchema),
	})
	.loose()
export type PixDueChargeBatchResponse = z.infer<typeof PixDueChargeBatchResponseSchema>

export const PixCreateDueChargeBatchResponseSchema = z.void()
export type PixCreateDueChargeBatchResponse = z.infer<typeof PixCreateDueChargeBatchResponseSchema>

export const PixUpdateDueChargeBatchResponseSchema = z.void()
export type PixUpdateDueChargeBatchResponse = z.infer<typeof PixUpdateDueChargeBatchResponseSchema>

export const PixDetailDueChargeBatchParamsSchema = PixCreateDueChargeBatchParamsSchema
export type PixDetailDueChargeBatchParams = z.infer<typeof PixDetailDueChargeBatchParamsSchema>
export const PixDetailDueChargeBatchResponseSchema = PixDueChargeBatchResponseSchema
export type PixDetailDueChargeBatchResponse = z.infer<typeof PixDetailDueChargeBatchResponseSchema>

export const PixListDueChargeBatchParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()
export type PixListDueChargeBatchParams = z.infer<typeof PixListDueChargeBatchParamsSchema>

export const PixListDueChargeBatchResponseSchema = z.object({
	parametros: z
		.object({
			inicio: z.string(),
			fim: z.string(),
			paginacao: z
				.object({
					paginaAtual: z.number(),
					itensPorPagina: z.number(),
					quantidadeDePaginas: z.number(),
					quantidadeTotalDeItens: z.number(),
				})
				.loose(),
		})
		.loose(),
	lotes: z.array(
		PixDueChargeBatchResponseSchema.extend({
			id: z.number(),
			descricao: z.string().optional(),
		}).loose(),
	),
}).loose()
export type PixListDueChargeBatchResponse = z.infer<typeof PixListDueChargeBatchResponseSchema>

export const PixListAutomaticChargeParamsSchema = z.object({
	inicio: z.string(),
	fim: z.string(),
	idRec: z.string().optional(),
	cpf: z.string().optional(),
	cnpj: z.string().optional(),
	status: StatusPixCobRSchema.optional(),
	convenio: z.string().optional(),
	'paginacao.paginaAtual': z.number().optional(),
	'paginacao.itensPorPagina': z.number().optional(),
}).strict()
export type PixListAutomaticChargeParams = z.infer<typeof PixListAutomaticChargeParamsSchema>

export const PixListAutomaticChargeResponseSchema = z.object({
	parametros: z
		.object({
			inicio: z.string(),
			fim: z.string(),
			paginacao: z
				.object({
					paginaAtual: z.number(),
					itensPorPagina: z.number(),
					quantidadeDePaginas: z.number(),
					quantidadeTotalDeItens: z.number(),
				})
				.loose(),
			idRec: z.string().optional(),
			cpf: z.string().optional(),
			cnpj: z.string().optional(),
			status: StatusPixCobRSchema.optional(),
			convenio: z.string().optional(),
		})
		.loose(),
	cobsr: z.array(PixDetailAutomaticChargeResponseSchema),
}).loose()
export type PixListAutomaticChargeResponse = z.infer<typeof PixListAutomaticChargeResponseSchema>

export const PixRetryRequestAutomaticParamsSchema = z.object({
	txid: z.string(),
	data: z.string(),
}).strict()
export type PixRetryRequestAutomaticParams = z.infer<typeof PixRetryRequestAutomaticParamsSchema>
export const PixRetryRequestAutomaticResponseSchema = PixDetailAutomaticChargeResponseSchema
export type PixRetryRequestAutomaticResponse = z.infer<typeof PixRetryRequestAutomaticResponseSchema>

export const PixSplitDevolutionParamsSchema = z.object({
	e2eid: z.string(),
	id: z.string(),
}).strict()
export type PixSplitDevolutionParams = z.infer<typeof PixSplitDevolutionParamsSchema>
export const PixSplitDevolutionBodySchema = PixDevolutionBodySchema
export type PixSplitDevolutionBody = z.infer<typeof PixSplitDevolutionBodySchema>
export const PixSplitDevolutionResponseSchema = PixDevolutionResponseSchema
export type PixSplitDevolutionResponse = z.infer<typeof PixSplitDevolutionResponseSchema>

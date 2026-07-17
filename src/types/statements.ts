import * as z from "zod";

export const GetStatementFileParamsSchema = z.object({ nome_arquivo: z.string() }).strict();
export type GetStatementFileParams = z.infer<typeof GetStatementFileParamsSchema>;

export const CreateStatementRecurrencyBodySchema = z
  .object({
    periodicidade: z.enum(['diario', 'semanal', 'mensal']),
    envia_email: z.boolean(),
    comprimir_arquivos: z.boolean(),
  })
  .strict();
export type CreateStatementRecurrencyBody = z.infer<typeof CreateStatementRecurrencyBodySchema>;

export const UpdateStatementRecurrencyParamsSchema = z.object({ identificador: z.string() }).strict();
export type UpdateStatementRecurrencyParams = z.infer<typeof UpdateStatementRecurrencyParamsSchema>;

export const UpdateStatementRecurrencyBodySchema = z
  .object({
    periodicidade: z.enum(['diario', 'semanal', 'mensal']).optional(),
    status: z.enum(['ativo', 'inativo']).optional(),
    envia_email: z.boolean().optional(),
    comprimir_arquivos: z.boolean().optional(),
  })
  .strict();
export type UpdateStatementRecurrencyBody = z.infer<typeof UpdateStatementRecurrencyBodySchema>;

export const StatementFileSchema = z
  .object({
    nome: z.string(),
    data_geracao: z.string(),
    periodo_inicio: z.string(),
    periodo_fim: z.string(),
  })
  .loose();
export const ListStatementFilesResponseSchema = z.array(StatementFileSchema);
export type ListStatementFilesResponse = z.infer<typeof ListStatementFilesResponseSchema>;

export const GetStatementFileResponseSchema = z.string();
export type GetStatementFileResponse = z.infer<typeof GetStatementFileResponseSchema>;

export const StatementRecurrenceSchema = z
  .object({
    status: z.enum(['ativo', 'inativo']),
    periodicidade: z.enum(['diario', 'semanal', 'mensal']),
    envia_email: z.boolean(),
    comprimir_arquivos: z.boolean(),
    data_criacao: z.string(),
  })
  .loose();
export const ListStatementRecurrencesResponseSchema = z.array(StatementRecurrenceSchema);
export type ListStatementRecurrencesResponse = z.infer<typeof ListStatementRecurrencesResponseSchema>;

export const CreateStatementRecurrencyResponseSchema = z.string();
export type CreateStatementRecurrencyResponse = z.infer<typeof CreateStatementRecurrencyResponseSchema>;
export const UpdateStatementRecurrencyResponseSchema = z.string();
export type UpdateStatementRecurrencyResponse = z.infer<typeof UpdateStatementRecurrencyResponseSchema>;

export const CreateSftpKeyResponseSchema = z.object({ privateKey: z.string() }).loose();
export type CreateSftpKeyResponse = z.infer<typeof CreateSftpKeyResponseSchema>;

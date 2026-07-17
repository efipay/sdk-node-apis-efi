import * as z from "zod";

export type AnyObject = Record<string, unknown>;
export type EmptyParams = Record<string, never>;
export type RequestHeaders = Record<string, string | number | boolean>;

export type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type EfiResponse<TData = JsonObject> = {
  code?: number;
  data?: TData;
  [key: string]: JsonValue | TData | undefined;
};

export type Uf =
  | 'AC'
  | 'AL'
  | 'AP'
  | 'AM'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MT'
  | 'MS'
  | 'MG'
  | 'PA'
  | 'PB'
  | 'PR'
  | 'PE'
  | 'PI'
  | 'RJ'
  | 'RN'
  | 'RS'
  | 'RO'
  | 'RR'
  | 'SC'
  | 'SP'
  | 'SE'
  | 'TO';

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

export const EfiResponseSchema = z
  .object({
    code: z.number().optional(),
    data: z.json().optional(),
  })
  .loose();

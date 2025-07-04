import { z } from 'zod';
export declare const createPreventivaSchema: z.ZodObject<{
    nome: z.ZodString;
    kilometragem_percorrida: z.ZodNumber;
    irregularidades_encontradas: z.ZodNumber;
    irregularidades_corrigidas: z.ZodNumber;
    descricao: z.ZodString;
}, "strip", z.ZodTypeAny, {
    nome: string;
    kilometragem_percorrida: number;
    irregularidades_encontradas: number;
    irregularidades_corrigidas: number;
    descricao: string;
}, {
    nome: string;
    kilometragem_percorrida: number;
    irregularidades_encontradas: number;
    irregularidades_corrigidas: number;
    descricao: string;
}>;
export declare const updatePreventivaSchema: z.ZodObject<{
    nome: z.ZodOptional<z.ZodString>;
    kilometragem_percorrida: z.ZodOptional<z.ZodNumber>;
    irregularidades_encontradas: z.ZodOptional<z.ZodNumber>;
    irregularidades_corrigidas: z.ZodOptional<z.ZodNumber>;
    descricao: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nome?: string | undefined;
    kilometragem_percorrida?: number | undefined;
    irregularidades_encontradas?: number | undefined;
    irregularidades_corrigidas?: number | undefined;
    descricao?: string | undefined;
}, {
    nome?: string | undefined;
    kilometragem_percorrida?: number | undefined;
    irregularidades_encontradas?: number | undefined;
    irregularidades_corrigidas?: number | undefined;
    descricao?: string | undefined;
}>;
export declare const preventivaIdSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string;
}>;
export declare const preventivaQuerySchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>;
    limit: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>;
    user_id: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>, number | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    user_id?: number | undefined;
}, {
    user_id?: string | undefined;
    page?: string | undefined;
    limit?: string | undefined;
}>;
export declare const validateIrregularidades: (data: any) => boolean;
//# sourceMappingURL=PreventivaSchemas.d.ts.map
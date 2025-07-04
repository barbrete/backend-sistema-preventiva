import { z } from 'zod';
export declare const criarFotoSchema: z.ZodObject<{
    url: z.ZodString;
    tipo: z.ZodEnum<["ANTES", "DEPOIS"]>;
    preventiva_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    tipo: "ANTES" | "DEPOIS";
    url: string;
    preventiva_id: number;
}, {
    tipo: "ANTES" | "DEPOIS";
    url: string;
    preventiva_id: number;
}>;
export declare const atualizarFotoSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    tipo: z.ZodOptional<z.ZodEnum<["ANTES", "DEPOIS"]>>;
    preventiva_id: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    preventiva_id: string;
    userId: string;
    tipo?: "ANTES" | "DEPOIS" | undefined;
    url?: string | undefined;
}, {
    preventiva_id: string;
    userId: string;
    tipo?: "ANTES" | "DEPOIS" | undefined;
    url?: string | undefined;
}>;
export declare const fotoIdSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodEffects<z.ZodString, number, string>, number, string>;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: string;
}>;
export declare const fotoUserIdSchema: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
export declare const fotoQuerySchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>;
    limit: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>, number, string | undefined>;
    tipo: z.ZodOptional<z.ZodEnum<["ANTES", "DEPOIS"]>>;
    preventiva_id: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>, number | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    tipo?: "ANTES" | "DEPOIS" | undefined;
    preventiva_id?: number | undefined;
}, {
    tipo?: "ANTES" | "DEPOIS" | undefined;
    page?: string | undefined;
    limit?: string | undefined;
    preventiva_id?: string | undefined;
}>;
//# sourceMappingURL=FotoSchemas.d.ts.map
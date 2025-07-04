import { z } from 'zod';
export declare const usuarioSchema: z.ZodObject<{
    nome: z.ZodString;
    email: z.ZodString;
    senha: z.ZodString;
    tipo: z.ZodDefault<z.ZodEnum<["ADMIN", "TECNICO"]>>;
    ativo: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    nome: string;
    email: string;
    senha: string;
    tipo: "ADMIN" | "TECNICO";
    ativo: boolean;
}, {
    nome: string;
    email: string;
    senha: string;
    tipo?: "ADMIN" | "TECNICO" | undefined;
    ativo?: boolean | undefined;
}>;
//# sourceMappingURL=UserSchemas.d.ts.map
import { z } from 'zod';

// Schema para criar foto
export const criarFotoSchema = z.object({
    url: z.string().url("URL inválida").min(1, "URL é obrigatória"),
    tipo: z.enum(['ANTES', 'DEPOIS'], {
        errorMap: () => ({ message: "Tipo deve ser 'ANTES' ou 'DEPOIS'" })
    }),
    preventiva_id: z.number().int().min(1, "ID da preventiva é obrigatório"),
    descricao: z.string().max(1000, "Descrição muito longa").optional(),
});

// Schema para atualizar foto
export const atualizarFotoSchema = z.object({
    url: z.string().url("URL inválida").optional(),
    tipo: z.enum(['ANTES', 'DEPOIS'], {
        errorMap: () => ({ message: "Tipo deve ser 'ANTES' ou 'DEPOIS'" })
    }).optional(),
    preventiva_id: z.string().min(1, "ID da preventiva é obrigatório"),
    userId: z.string().min(1, "ID do usuário é obrigatório"),
    descricao: z.string().max(200, "Descrição muito longa").optional(),
});

// Schema para validar ID nos parâmetros
export const fotoIdSchema = z.object({
    id: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, {
        message: "ID deve ser um número positivo"
    }),
});

export const fotoUserIdSchema = z.object({
    userId: z.string().min(1, "ID do usuário é obrigatório")
});

// Schema para query parameters
export const fotoQuerySchema = z.object({
    page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1).refine((val) => val > 0, {
        message: "Página deve ser maior que 0"
    }),
    limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10).refine((val) => val > 0 && val <= 100, {
        message: "Limit deve ser entre 1 e 100"
    }),
    tipo: z.enum(['ANTES', 'DEPOIS']).optional(),
    preventiva_id: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => !val || val > 0, {
        message: "Preventiva ID deve ser positivo"
    })
});

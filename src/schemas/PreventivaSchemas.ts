import { z } from 'zod';

// Schema para criar preventiva
export const createPreventivaSchema = z.object({
    nome: z.string().min(6, "Nome é obrigatório").max(255, "Nome muito longo"),
    kilometragem_percorrida: z.number().int().min(0, "Kilometragem deve ser positiva"),
    irregularidades_encontradas: z.number().int().min(0, "Número deve ser positivo"),
    irregularidades_corrigidas: z.number().int().min(0, "Número deve ser positivo"),
    descricao: z.string().min(1, "Descrição é obrigatória").max(1000, "Descrição muito longa")
});

// Schema para atualizar preventiva (todos os campos opcionais)
export const updatePreventivaSchema = z.object({
    nome: z.string().min(6, "Nome não pode estar vazio").max(255, "Nome muito longo").optional(),
    kilometragem_percorrida: z.number().int().min(0, "Kilometragem deve ser positiva").optional(),
    irregularidades_encontradas: z.number().int().min(0, "Número deve ser positivo").optional(),
    irregularidades_corrigidas: z.number().int().min(0, "Número deve ser positivo").optional(),
    descricao: z.string().min(1, "Descrição não pode estar vazia").max(1000, "Descrição muito longa").optional()
});

// Schema para validar ID nos parâmetros
export const preventivaIdSchema = z.object({
    id: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, {
        message: "ID deve ser um número positivo"
    })
});

// Schema para query parameters (paginação, filtros)
export const preventivaQuerySchema = z.object({
    page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1).refine((val) => val > 0, {
        message: "Página deve ser maior que 0"
    }),
    limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10).refine((val) => val > 0 && val <= 100, {
        message: "Limit deve ser entre 1 e 100"
    }),
    user_id: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => !val || val > 0, {
        message: "User ID deve ser positivo"
    })
});

// Validação customizada para verificar se irregularidades corrigidas não é maior que encontradas
export const validateIrregularidades = (data: any) => {
    if (data.irregularidades_corrigidas > data.irregularidades_encontradas) {
        throw new Error("Irregularidades corrigidas não pode ser maior que as encontradas");
    }
    return true;
};
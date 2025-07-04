"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIrregularidades = exports.preventivaQuerySchema = exports.preventivaIdSchema = exports.updatePreventivaSchema = exports.createPreventivaSchema = void 0;
const zod_1 = require("zod");
// Schema para criar preventiva
exports.createPreventivaSchema = zod_1.z.object({
    nome: zod_1.z.string().min(6, "Nome é obrigatório").max(255, "Nome muito longo"),
    kilometragem_percorrida: zod_1.z.number().int().min(0, "Kilometragem deve ser positiva"),
    irregularidades_encontradas: zod_1.z.number().int().min(0, "Número deve ser positivo"),
    irregularidades_corrigidas: zod_1.z.number().int().min(0, "Número deve ser positivo"),
    descricao: zod_1.z.string().min(1, "Descrição é obrigatória").max(1000, "Descrição muito longa")
});
// Schema para atualizar preventiva (todos os campos opcionais)
exports.updatePreventivaSchema = zod_1.z.object({
    nome: zod_1.z.string().min(6, "Nome não pode estar vazio").max(255, "Nome muito longo").optional(),
    kilometragem_percorrida: zod_1.z.number().int().min(0, "Kilometragem deve ser positiva").optional(),
    irregularidades_encontradas: zod_1.z.number().int().min(0, "Número deve ser positivo").optional(),
    irregularidades_corrigidas: zod_1.z.number().int().min(0, "Número deve ser positivo").optional(),
    descricao: zod_1.z.string().min(1, "Descrição não pode estar vazia").max(1000, "Descrição muito longa").optional()
});
// Schema para validar ID nos parâmetros
exports.preventivaIdSchema = zod_1.z.object({
    id: zod_1.z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, {
        message: "ID deve ser um número positivo"
    })
});
// Schema para query parameters (paginação, filtros)
exports.preventivaQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform((val) => val ? parseInt(val, 10) : 1).refine((val) => val > 0, {
        message: "Página deve ser maior que 0"
    }),
    limit: zod_1.z.string().optional().transform((val) => val ? parseInt(val, 10) : 10).refine((val) => val > 0 && val <= 100, {
        message: "Limit deve ser entre 1 e 100"
    }),
    user_id: zod_1.z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => !val || val > 0, {
        message: "User ID deve ser positivo"
    })
});
// Validação customizada para verificar se irregularidades corrigidas não é maior que encontradas
const validateIrregularidades = (data) => {
    if (data.irregularidades_corrigidas > data.irregularidades_encontradas) {
        throw new Error("Irregularidades corrigidas não pode ser maior que as encontradas");
    }
    return true;
};
exports.validateIrregularidades = validateIrregularidades;
//# sourceMappingURL=PreventivaSchemas.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fotoQuerySchema = exports.fotoUserIdSchema = exports.fotoIdSchema = exports.atualizarFotoSchema = exports.criarFotoSchema = void 0;
const zod_1 = require("zod");
// Schema para criar foto
exports.criarFotoSchema = zod_1.z.object({
    url: zod_1.z.string().url("URL inválida").min(1, "URL é obrigatória"),
    tipo: zod_1.z.enum(['ANTES', 'DEPOIS'], {
        errorMap: () => ({ message: "Tipo deve ser 'ANTES' ou 'DEPOIS'" })
    }),
    preventiva_id: zod_1.z.number().int().min(1, "ID da preventiva é obrigatório")
});
// Schema para atualizar foto
exports.atualizarFotoSchema = zod_1.z.object({
    url: zod_1.z.string().url("URL inválida").optional(),
    tipo: zod_1.z.enum(['ANTES', 'DEPOIS'], {
        errorMap: () => ({ message: "Tipo deve ser 'ANTES' ou 'DEPOIS'" })
    }).optional(),
    preventiva_id: zod_1.z.string().min(1, "ID da preventiva é obrigatório"),
    userId: zod_1.z.string().min(1, "ID do usuário é obrigatório")
});
// Schema para validar ID nos parâmetros
exports.fotoIdSchema = zod_1.z.object({
    id: zod_1.z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, {
        message: "ID deve ser um número positivo"
    }),
});
exports.fotoUserIdSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "ID do usuário é obrigatório")
});
// Schema para query parameters
exports.fotoQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform((val) => val ? parseInt(val, 10) : 1).refine((val) => val > 0, {
        message: "Página deve ser maior que 0"
    }),
    limit: zod_1.z.string().optional().transform((val) => val ? parseInt(val, 10) : 10).refine((val) => val > 0 && val <= 100, {
        message: "Limit deve ser entre 1 e 100"
    }),
    tipo: zod_1.z.enum(['ANTES', 'DEPOIS']).optional(),
    preventiva_id: zod_1.z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => !val || val > 0, {
        message: "Preventiva ID deve ser positivo"
    })
});
//# sourceMappingURL=FotoSchemas.js.map
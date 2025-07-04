"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioSchema = void 0;
const zod_1 = require("zod");
exports.usuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().nonempty("Nome não pode ficar vazio, é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    senha: zod_1.z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    tipo: zod_1.z.enum(['ADMIN', 'TECNICO']).default('TECNICO'),
    ativo: zod_1.z.boolean().default(true)
});
//# sourceMappingURL=UserSchemas.js.map
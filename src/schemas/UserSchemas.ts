import { z } from 'zod';

export const usuarioSchema = z.object({
    nome: z.string().nonempty("Nome não pode ficar vazio, é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    tipo: z.enum(['ADMIN', 'TECNICO']).default('TECNICO'),
    ativo: z.boolean().default(true)
})
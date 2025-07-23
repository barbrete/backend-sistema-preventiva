import { Request, Response } from 'express';
import { createPreventivaSchema, updatePreventivaSchema, preventivaIdSchema } from '../schemas/PreventivaSchemas';
import * as preventivaService from '../Services/PreventivaService';

export const criarPreventiva = async (req: Request, res: Response): Promise<void> => {
    console.log('=== CRIAR PREVENTIVA ===');
    console.log('Body completo:', req.body);
    console.log('userId do body:', req.body.userId, 'Tipo:', typeof req.body.userId);
    
    
    const resultadoZod = createPreventivaSchema.safeParse(req.body);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao } = resultadoZod.data;
        const userId = req.body.userId; 
        
        const preventiva = await preventivaService.createPreventiva(
            nome,
            kilometragem_percorrida,
            irregularidades_encontradas,
            irregularidades_corrigidas,
            descricao,
            userId
        );
        res.status(201).json(preventiva);
        return;
    } catch (err: any) {
        console.log('Erro ao criar preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};

export const buscarPreventivaPorId = async (req: Request, res: Response): Promise<void> => {
    const resultadoZod = preventivaIdSchema.safeParse(req.params);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { id } = resultadoZod.data;
        const preventiva = await preventivaService.getPreventivaById(id);

        const userId = (req as any).user?.id;
        const userTipo = (req as any).user?.tipo;
        
        if (userTipo !== "ADMIN" && preventiva.user_id !== userId) {
            res.status(403).json({ error: "Acesso negado: você não pode visualizar esta preventiva." });
            return;
        }
        
        res.status(200).json(preventiva);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar preventiva:', err);
        res.status(404).json({ error: err.message });
        return;
    }
};

export const buscarTodasPreventivas = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id;
        const userTipo = (req as any).user?.tipo;
        
        const preventivas = await preventivaService.getPreventivasForUserBasedOnRole(userId, userTipo);
        res.status(200).json(preventivas);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar preventivas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};

export const buscarPreventivasPorUsuario = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ error: 'ID do usuário inválido' });
        return;
    }
    try {
        const preventivas = await preventivaService.getPreventivasByUser(userId);
        res.status(200).json(preventivas);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar preventivas do usuário:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};

export const atualizarPreventiva = async (req: Request, res: Response): Promise<void> => {
    const resultadoZodParams = preventivaIdSchema.safeParse(req.params);
    const resultadoZodBody = updatePreventivaSchema.safeParse(req.body);
    
    if (!resultadoZodParams.success) {
        res.status(400).json({ errors: resultadoZodParams.error.errors });
        return;
    }
    if (!resultadoZodBody.success) {
        res.status(400).json({ errors: resultadoZodBody.error.errors });
        return;
    }
    
    try {
        const { id } = resultadoZodParams.data;
        const { nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao } = resultadoZodBody.data;
        const userId = (req as any).user?.id;
        const userTipo = (req as any).user?.tipo;
        
        const preventiva = await preventivaService.updatePreventiva(
            id,
            userId,
            userTipo,
            nome,
            kilometragem_percorrida,
            irregularidades_encontradas,
            irregularidades_corrigidas,
            descricao
        );
        res.status(200).json(preventiva);
        return;
    } catch (err: any) {
        console.log('Erro ao atualizar preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};

export const deletarPreventiva = async (req: Request, res: Response): Promise<void> => {
    const resultadoZod = preventivaIdSchema.safeParse(req.params);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { id } = resultadoZod.data;
        const userId = (req as any).user?.id;
        const userTipo = (req as any).user?.tipo;
        
        await preventivaService.deletePreventiva(id, userId, userTipo);
        res.status(200).json({ message: 'Preventiva deletada com sucesso' });
        return;
    } catch (err: any) {
        console.log('Erro ao deletar preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};

export const obterEstatisticasPreventivas = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.user_id ? parseInt(req.query.user_id as string) : undefined;
        const stats = await preventivaService.getPreventivaStats(userId);
        res.status(200).json(stats);
        return;
    } catch (err: any) {
        console.log('Erro ao obter estatísticas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};

export const buscarPreventivasComPaginacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        
        const resultado = await preventivaService.getPreventivasWithPagination(page, limit);
        res.status(200).json(resultado);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar preventivas com paginação:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};

export const buscarPreventivasPorUsuarioComPaginacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId);
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

        if (!userId) {
            res.status(400).json({ error: 'userId é obrigatório' });
            return;
        }

        const resultado = await preventivaService.getPreventivasByUserWithPagination(userId, page, limit);
        res.status(200).json(resultado);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar preventivas por usuário com paginação:', err);
        res.status(500).json({ error: err.message });
        return;
    }
}
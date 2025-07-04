import { Request, Response } from 'express';
import { atualizarFotoSchema, fotoIdSchema, fotoUserIdSchema } from '../schemas/FotoSchemas';
import * as userService from '../Services/UserService'; // Adicionar import
import * as fotoService from '../Services/FotoService';
import { deletarImagem, isCloudinaryUrl } from '../Services/CloudinaryService';

export const criarFoto = async (req: Request, res: Response): Promise<void> => {
    const { tipo, preventiva_id, userId } = req.body;
    const file = req.file; 

    if (!tipo || !preventiva_id || !userId) {
        res.status(400).json({ error: "Tipo, preventiva_id e id do usuario são obrigatórios" });
        return;
    }

    try {
        if (!req.file) {
            res.status(400).json({ error: "Arquivo não enviado" });
            return;
        }

        const usuario = await userService.getUserById(parseInt(userId));
        if (!usuario) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        const foto = await fotoService.createFoto(
            file as Express.Multer.File,
            tipo,
            parseInt(preventiva_id),
            parseInt(userId),
            usuario.tipo
        );

        console.log('✅ Foto criada no banco:', foto.id);

        res.status(201).json({
            ...foto,
            message: 'Foto salva com sucesso!',
        });

    } catch (err: any) {
        console.log('❌ ERRO ao criar foto:', err);
        res.status(500).json({ error: "Erro ao processar upload", details: err.message });
    }
};


export const buscarFotoPorId = async (req: Request, res: Response): Promise<void> => {
    const resultadoZod = fotoIdSchema.safeParse(req.params);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { id } = resultadoZod.data;
        const foto = await fotoService.getFotoById(id);
        res.status(200).json(foto);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar foto:', err);
        res.status(404).json({ error: err.message });
        return;
    }
};

export const buscarTodasFotos = async (req: Request, res: Response): Promise<void> => {
    try {
        const fotos = await fotoService.getAllFotos();
        res.status(200).json(fotos);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar fotos:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};

export const buscarFotosPorPreventiva = async (req: Request, res: Response): Promise<void> => {
    const preventivaId = parseInt(req.params.preventivaId);
    if (isNaN(preventivaId)) {
        res.status(400).json({ error: 'ID da preventiva inválido' });
        return;
    }
    try {
        const userId = (req as any).user?.id;
        const userTipo = (req as any).user?.tipo;

        const fotos = await fotoService.getFotosByPreventiva(preventivaId, userId, userTipo);
        res.status(200).json(fotos);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar fotos da preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};

export const buscarFotosPorTipo = async (req: Request, res: Response): Promise<void> => {
    const { tipo } = req.params;
    if (tipo !== 'ANTES' && tipo !== 'DEPOIS') {
        res.status(400).json({ error: 'Tipo deve ser ANTES ou DEPOIS' });
        return;
    }
    try {
        const fotos = await fotoService.getFotosByTipo(tipo);
        res.status(200).json(fotos);
        return;
    } catch (err: any) {
        console.log('Erro ao buscar fotos por tipo:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};

export const atualizarFoto = async (req: Request, res: Response): Promise<void> => {
    const resultadoZodParams = fotoIdSchema.safeParse(req.params);
    const resultadoZodBody = atualizarFotoSchema.safeParse(req.body);

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
        const { tipo, userId, preventiva_id } = resultadoZodBody.data;
        const file = req.file as Express.Multer.File;

        const usuario = await userService.getUserById(parseInt(userId));
        if (!usuario) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        const foto = await fotoService.updateFoto(
            id,
            file, 
            parseInt(userId),
            usuario.tipo,
            parseInt(preventiva_id),
            tipo,
        );

        console.log('Foto atualizada no banco:', foto.id);

        res.status(200).json({
            ...foto,
            message: 'Foto atualizada no Cloudinary!'
        });

    } catch (err: any) {
        console.log('Erro ao atualizar foto:', err);
        res.status(400).json({ error: err.message });
    }
};

export const deletarFoto = async (req: Request, res: Response): Promise<void> => {
    console.log('=== DELETAR FOTO ===');

    const resultadoZod = fotoIdSchema.safeParse(req.params);
    const resultadoZodBody = fotoUserIdSchema.safeParse(req.body);

    if (!resultadoZod.success || !resultadoZodBody.success) {
        res.status(400).json({ 
            errors: resultadoZod.error?.errors || resultadoZodBody.error?.errors 
        });
        return;
    }

    try {
        const { id } = resultadoZod.data;
        const { userId } = resultadoZodBody.data;

        const usuario = await userService.getUserById(parseInt(userId));
        if (!usuario) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        await fotoService.deleteFoto(id, parseInt(userId), usuario.tipo);
        console.log('✅ Foto deletada do banco:', id);

        res.status(200).json({ 
            message: 'Foto deletada com sucesso do Cloudinary e banco!',
            deleted_id: id
        });

    } catch (err: any) {
        console.log('❌ Erro ao deletar foto:', err);
        res.status(400).json({ error: err.message });
    }
};


export const obterEstatisticasFotos = async (req: Request, res: Response): Promise<void> => {
    try {
        const preventivaId = req.query.preventiva_id ? parseInt(req.query.preventiva_id as string) : undefined;
        const stats = await fotoService.getFotoStats(preventivaId);
        res.status(200).json(stats);
        return;
    } catch (err: any) {
        console.log('Erro ao obter estatísticas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};

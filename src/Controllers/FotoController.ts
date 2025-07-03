import path from "path";
import { Request, Response } from 'express';
import { criarFotoSchema, atualizarFotoSchema, fotoIdSchema, fotoUserIdSchema } from '../schemas/FotoSchemas';
import * as userService from '../Services/UserService'; // Adicionar import
import * as fotoService from '../Services/FotoService';
import fs from 'fs';
const cloudinary = require('../config/cloudinary');

export const criarFoto = async (req: Request, res: Response): Promise<void> => {
    const { tipo, preventiva_id, userId } = req.body;

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
        const userTipo = usuario.tipo;
        const finalUserId = userId || 'default';
        const oldPath = req.file.path; // uploads/default/arquivo.png
        const userDir = path.join(__dirname, "..", "..", "uploads", finalUserId);
        const newPath = path.join(userDir, req.file.filename);


        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
            console.log('✅ Pasta do usuário criada:', userDir);
        }

        fs.renameSync(oldPath, newPath);

        const fileUrl = `http://localhost:3000/images/${finalUserId}/${req.file.filename}`;

        const foto = await fotoService.createFoto(
            fileUrl, // URL local
            tipo,
            parseInt(preventiva_id),
            parseInt(userId),
            userTipo
        );

        console.log('✅ Foto criada no banco:', foto.id);

        res.status(201).json({
            ...foto,
            message: 'Foto salva com sucesso!',
            access_url: fileUrl
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
        const { tipo, userId } = resultadoZodBody.data;

        const usuario = await userService.getUserById(parseInt(userId));
        if (!usuario) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }

        const fotoAtual = await fotoService.getFotoById(id);
        if (!fotoAtual) {
            res.status(404).json({ error: "Foto não encontrada" });
            return;
        }

        let urlAtualizada = fotoAtual.url; // Manter URL atual por padrão
        let imagemFoiAlterada = false;

        // ✅ OPCIONAL: Se veio arquivo, substituir a imagem
        if (req.file) {
            console.log('=== SUBSTITUINDO IMAGEM ===');
            console.log('Nova imagem enviada, substituindo...');

            // ✅ 1. DELETAR FOTO ANTIGA
            const urlAntiga = fotoAtual.url;
            console.log('URL antiga:', urlAntiga);

            // Verificar se é uma URL HTTP válida
            if (urlAntiga && urlAntiga.includes('http') && urlAntiga.includes('/images/')) {
                const caminhoRelativo = urlAntiga.split('/images/')[1]; // "1/arquivo-antigo.png"
                const caminhoImagemAntiga = path.join(__dirname, "..", "..", "uploads", caminhoRelativo);

                console.log('Tentando deletar:', caminhoImagemAntiga);

                if (fs.existsSync(caminhoImagemAntiga)) {
                    fs.unlinkSync(caminhoImagemAntiga);
                    console.log('✅ Imagem antiga deletada:', caminhoImagemAntiga);
                } else {
                    console.log('⚠️ Imagem antiga não encontrada no sistema');
                }
            } else {
                console.log('⚠️ URL antiga inválida, pulando deleção:', urlAntiga);
            }

            // ✅ 2. SALVAR NOVA IMAGEM
            const oldPath = req.file.path; // uploads/temp/novo-arquivo.png (ou uploads/default/)
            const userDir = path.join(__dirname, "..", "..", "uploads", userId);
            const newPath = path.join(userDir, req.file.filename);

            console.log('=== SALVANDO NOVA IMAGEM ===');
            console.log('De:', oldPath);
            console.log('Para:', newPath);

            // Criar pasta se não existir
            if (!fs.existsSync(userDir)) {
                fs.mkdirSync(userDir, { recursive: true });
                console.log('✅ Pasta criada:', userDir);
            }

            // Mover arquivo
            fs.renameSync(oldPath, newPath);
            console.log('✅ Nova imagem salva');

            // ✅ 3. GERAR NOVA URL
            urlAtualizada = `http://localhost:3000/images/${userId}/${req.file.filename}`;
            imagemFoiAlterada = true;

            console.log('Nova URL:', urlAtualizada);
        } else {
            console.log('=== MANTENDO IMAGEM ATUAL ===');
            console.log('Nenhuma imagem enviada, mantendo URL atual');
        }

        // ✅ 4. ATUALIZAR NO BANCO
        const tipoAtualizado = tipo || fotoAtual.tipo;
        const userTipo = usuario.tipo;

        const foto = await fotoService.updateFoto(
            id,
            parseInt(userId),
            userTipo,
            urlAtualizada,
            tipoAtualizado
        );

        console.log('✅ Foto atualizada no banco:', foto.id);

        res.status(200).json({
            ...foto,
            message: imagemFoiAlterada ? 'Foto e dados atualizados!' : 'Dados da foto atualizados!',
            access_url: urlAtualizada,
            debug: {
                imagem_alterada: imagemFoiAlterada,
                url_final: urlAtualizada
            }
        });


    } catch (err: any) {
        console.log('Erro ao atualizar foto:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};

export const deletarFoto = async (req: Request, res: Response): Promise<void> => {
    console.log('=== DELETAR FOTO ===');
    console.log('req.params:', req.params);
    console.log('req.body:', req.body); // Deve estar vazio para DELETE

    const resultadoZod = fotoIdSchema.safeParse(req.params);
    const resultadoZodBody = fotoUserIdSchema.safeParse(req.body);

    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    if (!resultadoZodBody.success) {
        res.status(400).json({ errors: resultadoZodBody.error.errors });
        return;
    }

    const { userId } = resultadoZodBody.data;

    const usuario = await userService.getUserById(parseInt(userId));
    if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
    }
    const userTipo = usuario.tipo;

    try {
        const { id } = resultadoZod.data;
        console.log("dados para deletar: ", id , userId , userTipo )
        await fotoService.deleteFoto(id, parseInt(userId), userTipo);
        res.status(200).json({ message: 'Foto deletada com sucesso' });
        return;
    } catch (err: any) {
        console.log('Erro ao deletar foto:', err);
        res.status(400).json({ error: err.message });
        return;
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

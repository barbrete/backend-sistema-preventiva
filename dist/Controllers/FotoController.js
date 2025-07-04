"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterEstatisticasFotos = exports.deletarFoto = exports.atualizarFoto = exports.buscarFotosPorTipo = exports.buscarFotosPorPreventiva = exports.buscarTodasFotos = exports.buscarFotoPorId = exports.criarFoto = void 0;
const FotoSchemas_1 = require("../schemas/FotoSchemas");
const userService = __importStar(require("../Services/UserService")); // Adicionar import
const fotoService = __importStar(require("../Services/FotoService"));
const cloudinary = require('../config/cloudinary');
const CloudinaryService_1 = require("../Services/CloudinaryService");
const criarFoto = async (req, res) => {
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
        console.log('=== CRIANDO FOTO CLOUDINARY ===');
        console.log('Arquivo recebido:', req.file.originalname);
        const fileUrl = req.file.path;
        console.log('✅ URL do Cloudinary:', fileUrl);
        const foto = await fotoService.createFoto(fileUrl, // URL real do Cloudinary
        tipo, parseInt(preventiva_id), parseInt(userId), usuario.tipo);
        console.log('✅ Foto criada no banco:', foto.id);
        res.status(201).json({
            ...foto,
            message: 'Foto salva com sucesso!',
            access_url: fileUrl
        });
    }
    catch (err) {
        console.log('❌ ERRO ao criar foto:', err);
        res.status(500).json({ error: "Erro ao processar upload", details: err.message });
    }
};
exports.criarFoto = criarFoto;
const buscarFotoPorId = async (req, res) => {
    const resultadoZod = FotoSchemas_1.fotoIdSchema.safeParse(req.params);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { id } = resultadoZod.data;
        const foto = await fotoService.getFotoById(id);
        res.status(200).json(foto);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar foto:', err);
        res.status(404).json({ error: err.message });
        return;
    }
};
exports.buscarFotoPorId = buscarFotoPorId;
const buscarTodasFotos = async (req, res) => {
    try {
        const fotos = await fotoService.getAllFotos();
        res.status(200).json(fotos);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar fotos:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarTodasFotos = buscarTodasFotos;
const buscarFotosPorPreventiva = async (req, res) => {
    const preventivaId = parseInt(req.params.preventivaId);
    if (isNaN(preventivaId)) {
        res.status(400).json({ error: 'ID da preventiva inválido' });
        return;
    }
    try {
        const userId = req.user?.id;
        const userTipo = req.user?.tipo;
        const fotos = await fotoService.getFotosByPreventiva(preventivaId, userId, userTipo);
        res.status(200).json(fotos);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar fotos da preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.buscarFotosPorPreventiva = buscarFotosPorPreventiva;
const buscarFotosPorTipo = async (req, res) => {
    const { tipo } = req.params;
    if (tipo !== 'ANTES' && tipo !== 'DEPOIS') {
        res.status(400).json({ error: 'Tipo deve ser ANTES ou DEPOIS' });
        return;
    }
    try {
        const fotos = await fotoService.getFotosByTipo(tipo);
        res.status(200).json(fotos);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar fotos por tipo:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarFotosPorTipo = buscarFotosPorTipo;
const atualizarFoto = async (req, res) => {
    const resultadoZodParams = FotoSchemas_1.fotoIdSchema.safeParse(req.params);
    const resultadoZodBody = FotoSchemas_1.atualizarFotoSchema.safeParse(req.body);
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
        //Se veio arquivo, substituir a imagem
        if (req.file) {
            console.log('=== SUBSTITUINDO IMAGEM ===');
            // DELETAR FOTO ANTIGA
            const urlAntiga = fotoAtual.url;
            console.log('URL antiga:', urlAntiga);
            if ((0, CloudinaryService_1.isCloudinaryUrl)(urlAntiga)) {
                const deletado = await (0, CloudinaryService_1.deletarImagem)(urlAntiga);
                if (deletado) {
                    console.log('✅ Imagem antiga removida do Cloudinary');
                }
                else {
                    console.log('⚠️ Não foi possível remover imagem antiga');
                }
            }
            else {
                console.log('⚠️ URL antiga não é do Cloudinary');
            }
            urlAtualizada = req.file.path;
            imagemFoiAlterada = true;
            console.log('✅ Nova URL:', urlAtualizada);
            console.log('✅ Novo Public ID:', req.file.public_id);
        }
        else {
            console.log('=== MANTENDO IMAGEM ATUAL ===');
        }
        // ATUALIZAR NO BANCO
        const tipoAtualizado = tipo || fotoAtual.tipo;
        const foto = await fotoService.updateFoto(id, parseInt(userId), usuario.tipo, urlAtualizada, tipoAtualizado);
        console.log('Foto atualizada no banco:', foto.id);
        res.status(200).json({
            ...foto,
            message: imagemFoiAlterada ? 'Foto atualizada no Cloudinary!' : 'Dados atualizados!',
            access_url: urlAtualizada,
            public_id: imagemFoiAlterada ? req.file.public_id : undefined,
            debug: {
                imagem_alterada: imagemFoiAlterada,
                url_final: urlAtualizada
            }
        });
    }
    catch (err) {
        console.log('Erro ao atualizar foto:', err);
        res.status(400).json({ error: err.message });
    }
};
exports.atualizarFoto = atualizarFoto;
const deletarFoto = async (req, res) => {
    console.log('=== DELETAR FOTO ===');
    const resultadoZod = FotoSchemas_1.fotoIdSchema.safeParse(req.params);
    const resultadoZodBody = FotoSchemas_1.fotoUserIdSchema.safeParse(req.body);
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
        // BUSCAR FOTO PARA PEGAR URL
        const foto = await fotoService.getFotoById(id);
        if (!foto) {
            res.status(404).json({ error: "Foto não encontrada" });
            return;
        }
        // DELETAR DO CLOUDINARY (usando CloudinaryService)
        if ((0, CloudinaryService_1.isCloudinaryUrl)(foto.url)) {
            const deletado = await (0, CloudinaryService_1.deletarImagem)(foto.url);
            if (deletado) {
                console.log('✅ Imagem removida do Cloudinary');
            }
            else {
                console.log('⚠️ Não foi possível remover do Cloudinary');
            }
        }
        else {
            console.log('⚠️ URL não é do Cloudinary');
        }
        // DELETAR DO BANCO
        await fotoService.deleteFoto(id, parseInt(userId), usuario.tipo);
        console.log('✅ Foto deletada do banco:', id);
        res.status(200).json({
            message: 'Foto deletada com sucesso do Cloudinary e banco!',
            deleted_id: id
        });
    }
    catch (err) {
        console.log('❌ Erro ao deletar foto:', err);
        res.status(400).json({ error: err.message });
    }
};
exports.deletarFoto = deletarFoto;
const obterEstatisticasFotos = async (req, res) => {
    try {
        const preventivaId = req.query.preventiva_id ? parseInt(req.query.preventiva_id) : undefined;
        const stats = await fotoService.getFotoStats(preventivaId);
        res.status(200).json(stats);
        return;
    }
    catch (err) {
        console.log('Erro ao obter estatísticas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.obterEstatisticasFotos = obterEstatisticasFotos;
//# sourceMappingURL=FotoController.js.map
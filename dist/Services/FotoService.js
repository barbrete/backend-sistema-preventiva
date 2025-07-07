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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFotoStats = exports.getFotosWithPagination = exports.deleteAllFotosFromPreventiva = exports.deleteFoto = exports.updateFoto = exports.getFotosByPreventivaAndTipo = exports.getFotosByTipo = exports.getFotosByPreventiva = exports.getAllFotos = exports.getFotoById = exports.createFoto = void 0;
const prisma_1 = require("../../generated/prisma");
const FotoRepository = __importStar(require("../Repository/FotoRepository"));
const PreventivaRepository = __importStar(require("../Repository/PreventivaRepository"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const CloudinaryService_1 = require("./CloudinaryService");
const prisma = new prisma_1.PrismaClient();
const createFoto = async (file, tipo, preventiva_id, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventiva_id);
    if (!preventiva) {
        throw new Error("Preventiva não encontrada");
    }
    if (userTipo !== "ADMIN" && preventiva.user_id !== userId) {
        throw new Error("Sem permissão para adicionar fotos a esta preventiva");
    }
    const result = await new Promise((resolve, reject) => {
        const upload = cloudinary_1.default.uploader.upload_stream({
            folder: `usuarios/${userId}/preventivas/${preventiva_id}`,
        }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve(result);
        });
        upload.end(file.buffer);
    });
    const foto = await FotoRepository.createFoto(prisma, result.secure_url, tipo, preventiva_id);
    return foto;
};
exports.createFoto = createFoto;
const getFotoById = async (id) => {
    const foto = await FotoRepository.findFotoById(prisma, id);
    if (!foto) {
        throw new Error("Foto não encontrada");
    }
    return foto;
};
exports.getFotoById = getFotoById;
const getAllFotos = async () => {
    return await FotoRepository.findAllFotos(prisma);
};
exports.getAllFotos = getAllFotos;
const getFotosByPreventiva = async (preventivaId, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
    if (!preventiva) {
        throw new Error("Preventiva não encontrada");
    }
    if (userTipo !== "ADMIN" && preventiva.user_id !== userId) {
        throw new Error("Sem permissão para ver fotos desta preventiva");
    }
    return await FotoRepository.findFotosByPreventivaId(prisma, preventivaId);
};
exports.getFotosByPreventiva = getFotosByPreventiva;
const getFotosByTipo = async (tipo) => {
    return await FotoRepository.findFotosByTipo(prisma, tipo);
};
exports.getFotosByTipo = getFotosByTipo;
const getFotosByPreventivaAndTipo = async (preventivaId, tipo, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
    if (!preventiva) {
        throw new Error("Preventiva não encontrada");
    }
    if (userTipo !== "ADMIN" && preventiva.user_id !== userId) {
        throw new Error("Sem permissão para ver fotos desta preventiva");
    }
    return await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, tipo);
};
exports.getFotosByPreventivaAndTipo = getFotosByPreventivaAndTipo;
const updateFoto = async (id, file, userId, userTipo, preventiva_id, tipo) => {
    const foto = await FotoRepository.findFotoById(prisma, id);
    if (!foto) {
        throw new Error("Foto não encontrada");
    }
    if (userTipo !== "ADMIN" && foto.preventiva.user_id !== userId) {
        throw new Error("Sem permissão para editar esta foto");
    }
    const publicId = (0, CloudinaryService_1.extrairPublicId)(foto.url);
    await cloudinary_1.default.uploader.destroy(publicId);
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder: `usuarios/${userId}/preventivas/${preventiva_id}`,
        }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve(result);
        });
        stream.end(file.buffer);
    });
    const url = result.secure_url;
    return await FotoRepository.updateFoto(prisma, id, url, tipo);
};
exports.updateFoto = updateFoto;
const deleteFoto = async (id, userId, userTipo) => {
    const foto = await FotoRepository.findFotoById(prisma, id);
    if (!foto) {
        throw new Error("Foto não encontrada");
    }
    if (userTipo !== "ADMIN" && foto.preventiva.user_id !== userId) {
        throw new Error("Sem permissão para excluir esta foto");
    }
    const publicId = (0, CloudinaryService_1.extrairPublicId)(foto.url);
    await cloudinary_1.default.uploader.destroy(publicId);
    return await FotoRepository.deleteFoto(prisma, id);
};
exports.deleteFoto = deleteFoto;
const deleteAllFotosFromPreventiva = async (preventivaId, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
    if (!preventiva) {
        throw new Error("Preventiva não encontrada");
    }
    if (userTipo !== "ADMIN" && preventiva.user_id !== userId) {
        throw new Error("Sem permissão para excluir fotos desta preventiva");
    }
    return await FotoRepository.deleteFotosByPreventivaId(prisma, preventivaId);
};
exports.deleteAllFotosFromPreventiva = deleteAllFotosFromPreventiva;
const getFotosWithPagination = async (page = 1, limit = 10) => {
    return await FotoRepository.findFotosWithPagination(prisma, page, limit);
};
exports.getFotosWithPagination = getFotosWithPagination;
const getFotoStats = async (preventivaId) => {
    if (preventivaId) {
        const fotosCount = await FotoRepository.countFotosByPreventivaId(prisma, preventivaId);
        const fotosAntes = await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, "ANTES");
        const fotosDepois = await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, "DEPOIS");
        return {
            total: fotosCount,
            antes: fotosAntes.length,
            depois: fotosDepois.length,
            preventiva_id: preventivaId,
        };
    }
    else {
        const totalFotos = await prisma.foto.count();
        const fotosAntes = await FotoRepository.findFotosByTipo(prisma, "ANTES");
        const fotosDepois = await FotoRepository.findFotosByTipo(prisma, "DEPOIS");
        return {
            total: totalFotos,
            antes: fotosAntes.length,
            depois: fotosDepois.length,
        };
    }
};
exports.getFotoStats = getFotoStats;
//# sourceMappingURL=FotoService.js.map
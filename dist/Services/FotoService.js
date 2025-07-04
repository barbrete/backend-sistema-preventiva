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
exports.getFotoStats = exports.getFotosWithPagination = exports.deleteAllFotosFromPreventiva = exports.deleteFoto = exports.updateFoto = exports.getFotosByPreventivaAndTipo = exports.getFotosByTipo = exports.getFotosByPreventiva = exports.getAllFotos = exports.getFotoById = exports.createFoto = void 0;
const prisma_1 = require("../../generated/prisma");
const FotoRepository = __importStar(require("../Repository/FotoRepository"));
const PreventivaRepository = __importStar(require("../Repository/PreventivaRepository"));
const prisma = new prisma_1.PrismaClient();
const createFoto = async (url, tipo, preventiva_id, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventiva_id);
    if (!preventiva) {
        throw new Error('Preventiva não encontrada');
    }
    if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
        throw new Error('Sem permissão para adicionar fotos a esta preventiva');
    }
    return await FotoRepository.createFoto(prisma, url, tipo, preventiva_id);
};
exports.createFoto = createFoto;
const getFotoById = async (id) => {
    const foto = await FotoRepository.findFotoById(prisma, id);
    if (!foto) {
        throw new Error('Foto não encontrada');
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
        throw new Error('Preventiva não encontrada');
    }
    if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
        throw new Error('Sem permissão para ver fotos desta preventiva');
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
        throw new Error('Preventiva não encontrada');
    }
    if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
        throw new Error('Sem permissão para ver fotos desta preventiva');
    }
    return await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, tipo);
};
exports.getFotosByPreventivaAndTipo = getFotosByPreventivaAndTipo;
const updateFoto = async (id, userId, userTipo, url, tipo) => {
    const foto = await FotoRepository.findFotoById(prisma, id);
    if (!foto) {
        throw new Error('Foto não encontrada');
    }
    if (userTipo !== 'ADMIN' && foto.preventiva.user_id !== userId) {
        throw new Error('Sem permissão para editar esta foto');
    }
    return await FotoRepository.updateFoto(prisma, id, url, tipo);
};
exports.updateFoto = updateFoto;
const deleteFoto = async (id, userId, userTipo) => {
    const foto = await FotoRepository.findFotoById(prisma, id);
    if (!foto) {
        throw new Error('Foto não encontrada');
    }
    if (userTipo !== 'ADMIN' && foto.preventiva.user_id !== userId) {
        throw new Error('Sem permissão para excluir esta foto');
    }
    return await FotoRepository.deleteFoto(prisma, id);
};
exports.deleteFoto = deleteFoto;
const deleteAllFotosFromPreventiva = async (preventivaId, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
    if (!preventiva) {
        throw new Error('Preventiva não encontrada');
    }
    if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
        throw new Error('Sem permissão para excluir fotos desta preventiva');
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
        const fotosAntes = await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, 'ANTES');
        const fotosDepois = await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, 'DEPOIS');
        return {
            total: fotosCount,
            antes: fotosAntes.length,
            depois: fotosDepois.length,
            preventiva_id: preventivaId
        };
    }
    else {
        const totalFotos = await prisma.foto.count();
        const fotosAntes = await FotoRepository.findFotosByTipo(prisma, 'ANTES');
        const fotosDepois = await FotoRepository.findFotosByTipo(prisma, 'DEPOIS');
        return {
            total: totalFotos,
            antes: fotosAntes.length,
            depois: fotosDepois.length
        };
    }
};
exports.getFotoStats = getFotoStats;
//# sourceMappingURL=FotoService.js.map
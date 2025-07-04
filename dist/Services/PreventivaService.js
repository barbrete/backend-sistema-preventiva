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
exports.getPreventivaStats = exports.getPreventivasByUserWithPagination = exports.getPreventivasWithPagination = exports.deletePreventiva = exports.updatePreventiva = exports.getPreventivasForUserBasedOnRole = exports.getPreventivasByUser = exports.getAllPreventivas = exports.getPreventivaById = exports.createPreventiva = void 0;
const prisma_1 = require("../../generated/prisma");
const PreventivaRepository = __importStar(require("../Repository/PreventivaRepository"));
const UserRepository = __importStar(require("../Repository/UserRepository"));
const prisma = new prisma_1.PrismaClient();
const createPreventiva = async (nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao, user_id) => {
    console.log('=== PreventivaService.createPreventiva ===');
    console.log('userId recebido no Service:', user_id, 'Tipo:', typeof user_id);
    const user = await UserRepository.findUserById(prisma, user_id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    if (!user.ativo) {
        throw new Error('Usuário desativado');
    }
    return await PreventivaRepository.createPreventiva(prisma, nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao, user_id);
};
exports.createPreventiva = createPreventiva;
const getPreventivaById = async (id) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, id);
    if (!preventiva) {
        throw new Error('Preventiva não encontrada');
    }
    return preventiva;
};
exports.getPreventivaById = getPreventivaById;
const getAllPreventivas = async () => {
    return await PreventivaRepository.findAllPreventivas(prisma);
};
exports.getAllPreventivas = getAllPreventivas;
const getPreventivasByUser = async (userId) => {
    const user = await UserRepository.findUserById(prisma, userId);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return await PreventivaRepository.findPreventivasByUserId(prisma, userId);
};
exports.getPreventivasByUser = getPreventivasByUser;
const getPreventivasForUserBasedOnRole = async (userId, userTipo) => {
    if (userTipo === 'ADMIN') {
        return await PreventivaRepository.findAllPreventivas(prisma);
    }
    else {
        return await PreventivaRepository.findPreventivasByUserId(prisma, userId);
    }
};
exports.getPreventivasForUserBasedOnRole = getPreventivasForUserBasedOnRole;
const updatePreventiva = async (id, userId, userTipo, nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, id);
    if (!preventiva) {
        throw new Error('Preventiva não encontrada');
    }
    if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
        throw new Error('Sem permissão para editar esta preventiva');
    }
    return await PreventivaRepository.updatePreventiva(prisma, id, nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao);
};
exports.updatePreventiva = updatePreventiva;
const deletePreventiva = async (id, userId, userTipo) => {
    const preventiva = await PreventivaRepository.findPreventivaById(prisma, id);
    if (!preventiva) {
        throw new Error('Preventiva não encontrada');
    }
    if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
        throw new Error('Sem permissão para excluir esta preventiva');
    }
    return await PreventivaRepository.deletePreventiva(prisma, id);
};
exports.deletePreventiva = deletePreventiva;
const getPreventivasWithPagination = async (page = 1, limit = 10) => {
    return await PreventivaRepository.findPreventivosWithPagination(prisma, page, limit);
};
exports.getPreventivasWithPagination = getPreventivasWithPagination;
const getPreventivasByUserWithPagination = async (userId, page = 1, limit = 10) => {
    const user = await UserRepository.findUserById(prisma, userId);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return await PreventivaRepository.findPreventivasByUserWithPagination(prisma, userId, page, limit);
};
exports.getPreventivasByUserWithPagination = getPreventivasByUserWithPagination;
const getPreventivaStats = async (userId) => {
    if (userId) {
        const userPreventivas = await PreventivaRepository.countPreventivasByUserId(prisma, userId);
        return {
            total: userPreventivas,
            user_id: userId
        };
    }
    else {
        const totalPreventivas = await prisma.preventiva.count();
        return {
            total: totalPreventivas
        };
    }
};
exports.getPreventivaStats = getPreventivaStats;
//# sourceMappingURL=PreventivaService.js.map
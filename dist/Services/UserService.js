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
exports.getUserStats = exports.getUsersWithPagination = exports.deleteUser = exports.ativateUser = exports.desativarUser = exports.updateUser = exports.getUsersByTipo = exports.getActiveUsers = exports.getAllUsers = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const prisma_1 = require("../../generated/prisma");
const UserRepository = __importStar(require("../Repository/UserRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new prisma_1.PrismaClient();
const createUser = async (email, nome, senha, tipo) => {
    console.log('Parâmetros recebidos:', { email, nome, senha, tipo });
    const existingUser = await UserRepository.findUserByEmail(prisma, email);
    if (existingUser) {
        throw new Error('Usuário já existe com este email');
    }
    const hashedPassword = await bcrypt_1.default.hash(senha, 10);
    return await UserRepository.createUser(prisma, email, nome, hashedPassword, tipo);
};
exports.createUser = createUser;
const getUserById = async (id) => {
    const user = await UserRepository.findUserById(prisma, id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return user;
};
exports.getUserById = getUserById;
const getUserByEmail = async (email) => {
    const user = await UserRepository.findUserByEmail(prisma, email);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return user;
};
exports.getUserByEmail = getUserByEmail;
const getAllUsers = async () => {
    return await UserRepository.findAllUsers(prisma);
};
exports.getAllUsers = getAllUsers;
const getActiveUsers = async () => {
    return await UserRepository.findActiveUsers(prisma);
};
exports.getActiveUsers = getActiveUsers;
const getUsersByTipo = async (tipo) => {
    return await UserRepository.findUsersByTipo(prisma, tipo);
};
exports.getUsersByTipo = getUsersByTipo;
const updateUser = async (id, email, name, senha, tipo, ativo) => {
    const user = await UserRepository.findUserById(prisma, id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    if (email && email !== user.email) {
        const existingUser = await UserRepository.findUserByEmail(prisma, email);
        if (existingUser) {
            throw new Error('Já existe um usuário com este email');
        }
    }
    let hashedPassword;
    if (senha) {
        hashedPassword = await bcrypt_1.default.hash(senha, 10);
    }
    return await UserRepository.updateUser(prisma, id, email, name, hashedPassword, tipo, ativo);
};
exports.updateUser = updateUser;
const desativarUser = async (id) => {
    const user = await UserRepository.findUserById(prisma, id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return await UserRepository.softDeleteUser(prisma, id);
};
exports.desativarUser = desativarUser;
const ativateUser = async (id) => {
    const user = await UserRepository.findUserById(prisma, id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return await UserRepository.reactivateUser(prisma, id);
};
exports.ativateUser = ativateUser;
const deleteUser = async (id) => {
    const user = await UserRepository.findUserById(prisma, id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    if (user.preventivas && user.preventivas.length > 0) {
        throw new Error('Não é possível excluir usuário com preventivas vinculadas');
    }
    return await UserRepository.hardDeleteUser(prisma, id);
};
exports.deleteUser = deleteUser;
const getUsersWithPagination = async (page = 1, limit = 10) => {
    return await UserRepository.findUsersWithPagination(prisma, page, limit);
};
exports.getUsersWithPagination = getUsersWithPagination;
const getUserStats = async () => {
    const totalUsers = await UserRepository.countUsers(prisma);
    const activeUsers = await UserRepository.countActiveUsers(prisma);
    return {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers
    };
};
exports.getUserStats = getUserStats;
//# sourceMappingURL=UserService.js.map
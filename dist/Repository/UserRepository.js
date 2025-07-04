"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsersWithPagination = exports.countActiveUsers = exports.countUsers = exports.hardDeleteUser = exports.reactivateUser = exports.softDeleteUser = exports.updateUser = exports.findUsersByTipo = exports.findActiveUsers = exports.findAllUsers = exports.findUserByEmail = exports.findUserById = exports.createUser = void 0;
const createUser = async (prisma, email, nome, senha, tipo, ativo = true) => {
    console.log('=== UserRepository.createUser ===');
    console.log('Dados para criar:', { email, nome, senha: '***', tipo });
    try {
        const user = await prisma.user.create({
            data: {
                email,
                name: nome,
                senha,
                tipo,
                ativo
            },
            include: {
                preventivas: true
            }
        });
        console.log('✅ Usuário criado no Prisma:', user.id);
        return user;
    }
    catch (error) {
        console.log('❌ ERRO no Prisma:', error);
        throw error;
    }
};
exports.createUser = createUser;
const findUserById = async (prisma, id) => {
    console.log('=== UserRepository.findUserById ===');
    console.log('ID recebido no Repository:', id, 'Tipo:', typeof id);
    return await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
            preventivas: {
                include: {
                    fotos: true
                }
            }
        }
    });
};
exports.findUserById = findUserById;
const findUserByEmail = async (prisma, email) => {
    return await prisma.user.findUnique({
        where: { email },
        include: {
            preventivas: true
        }
    });
};
exports.findUserByEmail = findUserByEmail;
const findAllUsers = async (prisma) => {
    return await prisma.user.findMany({
        include: {
            preventivas: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findAllUsers = findAllUsers;
const findActiveUsers = async (prisma) => {
    return await prisma.user.findMany({
        where: {
            ativo: true,
            deleted_at: null
        },
        include: {
            preventivas: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findActiveUsers = findActiveUsers;
const findUsersByTipo = async (prisma, tipo) => {
    return await prisma.user.findMany({
        where: { tipo },
        include: {
            preventivas: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findUsersByTipo = findUsersByTipo;
const updateUser = async (prisma, id, email, name, senha, tipo, ativo) => {
    const dataToUpdate = {};
    if (email !== undefined)
        dataToUpdate.email = email;
    if (name !== undefined)
        dataToUpdate.name = name;
    if (senha !== undefined)
        dataToUpdate.senha = senha;
    if (tipo !== undefined)
        dataToUpdate.tipo = tipo;
    if (ativo !== undefined)
        dataToUpdate.ativo = ativo;
    return await prisma.user.update({
        where: { id },
        data: dataToUpdate,
        include: {
            preventivas: true
        }
    });
};
exports.updateUser = updateUser;
const softDeleteUser = async (prisma, id) => {
    return await prisma.user.update({
        where: { id },
        data: {
            ativo: false,
            deleted_at: new Date()
        }
    });
};
exports.softDeleteUser = softDeleteUser;
const reactivateUser = async (prisma, id) => {
    return await prisma.user.update({
        where: { id },
        data: {
            ativo: true,
            deleted_at: null
        }
    });
};
exports.reactivateUser = reactivateUser;
const hardDeleteUser = async (prisma, id) => {
    await prisma.user.delete({
        where: { id }
    });
};
exports.hardDeleteUser = hardDeleteUser;
const countUsers = async (prisma) => {
    return await prisma.user.count();
};
exports.countUsers = countUsers;
const countActiveUsers = async (prisma) => {
    return await prisma.user.count({
        where: {
            ativo: true,
            deleted_at: null
        }
    });
};
exports.countActiveUsers = countActiveUsers;
const findUsersWithPagination = async (prisma, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: limit,
            include: {
                preventivas: true
            },
            orderBy: {
                created_at: 'desc'
            }
        }),
        prisma.user.count()
    ]);
    return {
        users,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1
    };
};
exports.findUsersWithPagination = findUsersWithPagination;
//# sourceMappingURL=UserRepository.js.map
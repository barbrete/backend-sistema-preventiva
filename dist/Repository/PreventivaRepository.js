"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPreventivasByUserWithPagination = exports.findPreventivosWithPagination = exports.countPreventivasByUserId = exports.deletePreventivasByUserId = exports.deletePreventiva = exports.updatePreventiva = exports.findPreventivasByUserId = exports.findAllPreventivas = exports.findPreventivaById = exports.createPreventiva = void 0;
const createPreventiva = async (prisma, nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao, user_id) => {
    return await prisma.preventiva.create({
        data: {
            nome,
            kilometragem_percorrida,
            irregularidades_encontradas,
            irregularidades_corrigidas,
            descricao,
            user_id
        },
        include: {
            usuario: true,
            fotos: true
        }
    });
};
exports.createPreventiva = createPreventiva;
const findPreventivaById = async (prisma, id) => {
    return await prisma.preventiva.findUnique({
        where: { id },
        include: {
            usuario: true,
            fotos: true
        }
    });
};
exports.findPreventivaById = findPreventivaById;
const findAllPreventivas = async (prisma) => {
    return await prisma.preventiva.findMany({
        include: {
            usuario: true,
            fotos: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findAllPreventivas = findAllPreventivas;
const findPreventivasByUserId = async (prisma, userId) => {
    return await prisma.preventiva.findMany({
        where: { user_id: userId },
        include: {
            usuario: true,
            fotos: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findPreventivasByUserId = findPreventivasByUserId;
const updatePreventiva = async (prisma, id, nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao) => {
    const dataToUpdate = {};
    if (nome !== undefined)
        dataToUpdate.nome = nome;
    if (kilometragem_percorrida !== undefined)
        dataToUpdate.kilometragem_percorrida = kilometragem_percorrida;
    if (irregularidades_encontradas !== undefined)
        dataToUpdate.irregularidades_encontradas = irregularidades_encontradas;
    if (irregularidades_corrigidas !== undefined)
        dataToUpdate.irregularidades_corrigidas = irregularidades_corrigidas;
    if (descricao !== undefined)
        dataToUpdate.descricao = descricao;
    return await prisma.preventiva.update({
        where: { id },
        data: dataToUpdate,
        include: {
            usuario: true,
            fotos: true
        }
    });
};
exports.updatePreventiva = updatePreventiva;
const deletePreventiva = async (prisma, id) => {
    await prisma.preventiva.delete({
        where: { id }
    });
};
exports.deletePreventiva = deletePreventiva;
const deletePreventivasByUserId = async (prisma, userId) => {
    await prisma.preventiva.deleteMany({
        where: { user_id: userId }
    });
};
exports.deletePreventivasByUserId = deletePreventivasByUserId;
const countPreventivasByUserId = async (prisma, userId) => {
    return await prisma.preventiva.count({
        where: { user_id: userId }
    });
};
exports.countPreventivasByUserId = countPreventivasByUserId;
const findPreventivosWithPagination = async (prisma, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [preventivas, total] = await Promise.all([
        prisma.preventiva.findMany({
            skip,
            take: limit,
            include: {
                usuario: true,
                fotos: true
            },
            orderBy: {
                created_at: 'desc'
            }
        }),
        prisma.preventiva.count()
    ]);
    return {
        preventivas,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1
    };
};
exports.findPreventivosWithPagination = findPreventivosWithPagination;
const findPreventivasByUserWithPagination = async (prisma, userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [preventivas, total] = await Promise.all([
        prisma.preventiva.findMany({
            where: { user_id: userId },
            skip,
            take: limit,
            include: {
                usuario: true,
                fotos: true
            },
            orderBy: {
                created_at: 'desc'
            }
        }),
        prisma.preventiva.count({
            where: { user_id: userId }
        })
    ]);
    return {
        preventivas,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1
    };
};
exports.findPreventivasByUserWithPagination = findPreventivasByUserWithPagination;
//# sourceMappingURL=PreventivaRepository.js.map
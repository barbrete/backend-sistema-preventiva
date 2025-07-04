"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFotosWithPagination = exports.countFotosByPreventivaId = exports.deleteFotosByPreventivaId = exports.deleteFoto = exports.updateFoto = exports.findFotosByPreventivaAndTipo = exports.findFotosByTipo = exports.findFotosByPreventivaId = exports.findAllFotos = exports.findFotoById = exports.createFoto = void 0;
// ===== CRIAR FOTO =====
const createFoto = async (prisma, url, tipo, preventiva_id) => {
    return await prisma.foto.create({
        data: {
            url,
            tipo,
            preventiva_id
        },
        include: {
            preventiva: true
        }
    });
};
exports.createFoto = createFoto;
// ===== BUSCAR FOTO POR ID =====
const findFotoById = async (prisma, id) => {
    return await prisma.foto.findUnique({
        where: { id },
        include: {
            preventiva: {
                include: {
                    usuario: true
                }
            }
        }
    });
};
exports.findFotoById = findFotoById;
// ===== BUSCAR TODAS AS FOTOS =====
// Função para buscar todas as fotos do sistema
const findAllFotos = async (prisma) => {
    return await prisma.foto.findMany({
        include: {
            preventiva: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findAllFotos = findAllFotos;
// ===== BUSCAR FOTOS POR PREVENTIVA =====
const findFotosByPreventivaId = async (prisma, preventivaId) => {
    return await prisma.foto.findMany({
        where: {
            preventiva_id: preventivaId
        },
        orderBy: {
            created_at: 'asc'
        }
    });
};
exports.findFotosByPreventivaId = findFotosByPreventivaId;
// ===== BUSCAR FOTOS POR TIPO =====
const findFotosByTipo = async (prisma, tipo) => {
    return await prisma.foto.findMany({
        where: { tipo },
        include: {
            preventiva: true
        },
        orderBy: {
            created_at: 'desc'
        }
    });
};
exports.findFotosByTipo = findFotosByTipo;
// ===== BUSCAR FOTOS POR PREVENTIVA E TIPO =====
const findFotosByPreventivaAndTipo = async (prisma, preventivaId, tipo) => {
    return await prisma.foto.findMany({
        where: {
            preventiva_id: preventivaId,
            tipo
        },
        orderBy: {
            created_at: 'asc'
        }
    });
};
exports.findFotosByPreventivaAndTipo = findFotosByPreventivaAndTipo;
// ===== ATUALIZAR FOTO =====
const updateFoto = async (prisma, id, url, tipo) => {
    const dataToUpdate = {};
    if (url)
        dataToUpdate.url = url;
    if (tipo)
        dataToUpdate.tipo = tipo;
    return await prisma.foto.update({
        where: { id },
        data: dataToUpdate,
        include: {
            preventiva: true
        }
    });
};
exports.updateFoto = updateFoto;
// ===== DELETAR FOTO =====
const deleteFoto = async (prisma, id) => {
    await prisma.foto.delete({
        where: { id }
    });
};
exports.deleteFoto = deleteFoto;
// ===== DELETAR TODAS AS FOTOS DE UMA PREVENTIVA =====
const deleteFotosByPreventivaId = async (prisma, preventivaId) => {
    await prisma.foto.deleteMany({
        where: { preventiva_id: preventivaId }
    });
};
exports.deleteFotosByPreventivaId = deleteFotosByPreventivaId;
// ===== CONTAR FOTOS =====
const countFotosByPreventivaId = async (prisma, preventivaId) => {
    return await prisma.foto.count({
        where: { preventiva_id: preventivaId }
    });
};
exports.countFotosByPreventivaId = countFotosByPreventivaId;
// ===== BUSCAR COM PAGINAÇÃO =====
const findFotosWithPagination = async (prisma, page = 1, limit = 10) => {
    // Calcular quantos registros pular
    const skip = (page - 1) * limit;
    const [fotos, total] = await Promise.all([
        prisma.foto.findMany({
            skip, // Pula X registros
            take: limit, // Pega apenas X registros
            include: {
                preventiva: true
            },
            orderBy: {
                created_at: 'desc'
            }
        }),
        prisma.foto.count() // Conta total de fotos
    ]);
    return {
        fotos,
        total,
        totalPages: Math.ceil(total / limit), // Calcula total de páginas
        currentPage: page,
        hasNext: page < Math.ceil(total / limit),
        hasPrevious: page > 1
    };
};
exports.findFotosWithPagination = findFotosWithPagination;
//# sourceMappingURL=FotoRepository.js.map
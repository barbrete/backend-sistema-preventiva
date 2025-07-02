import { PrismaClient } from '../../generated/prisma';

// ===== CRIAR FOTO =====
export const createFoto = async (prisma: PrismaClient, url: string, tipo: any, preventiva_id: number) => {
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

// ===== BUSCAR FOTO POR ID =====
export const findFotoById = async (prisma: PrismaClient, id: number) => {
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

// ===== BUSCAR TODAS AS FOTOS =====
// Função para buscar todas as fotos do sistema
export const findAllFotos = async (prisma: PrismaClient) => {
  return await prisma.foto.findMany({
    include: {
      preventiva: true  
    },
    orderBy: {
      created_at: 'desc' 
    }
  });
};

// ===== BUSCAR FOTOS POR PREVENTIVA =====
export const findFotosByPreventivaId = async (prisma: PrismaClient, preventivaId: number) => {
  return await prisma.foto.findMany({
    where: { 
      preventiva_id: preventivaId 
    },
    orderBy: {
      created_at: 'asc'  
    }
  });
};

// ===== BUSCAR FOTOS POR TIPO =====
export const findFotosByTipo = async (prisma: PrismaClient, tipo: any) => {
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

// ===== BUSCAR FOTOS POR PREVENTIVA E TIPO =====
export const findFotosByPreventivaAndTipo = async (prisma: PrismaClient, preventivaId: number, tipo: any) => {
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

// ===== ATUALIZAR FOTO =====
export const updateFoto = async (prisma: PrismaClient, id: number, url?: string, tipo?: any) => {
  const dataToUpdate: any = {};
  if (url) dataToUpdate.url = url;
  if (tipo) dataToUpdate.tipo = tipo;

  return await prisma.foto.update({
    where: { id },
    data: dataToUpdate,
    include: {
      preventiva: true
    }
  });
};

// ===== DELETAR FOTO =====
export const deleteFoto = async (prisma: PrismaClient, id: number) => {
  await prisma.foto.delete({
    where: { id }
  });
};

// ===== DELETAR TODAS AS FOTOS DE UMA PREVENTIVA =====
export const deleteFotosByPreventivaId = async (prisma: PrismaClient, preventivaId: number) => {
  await prisma.foto.deleteMany({
    where: { preventiva_id: preventivaId }
  });
};

// ===== CONTAR FOTOS =====
export const countFotosByPreventivaId = async (prisma: PrismaClient, preventivaId: number) => {
  return await prisma.foto.count({
    where: { preventiva_id: preventivaId }
  });
};

// ===== BUSCAR COM PAGINAÇÃO =====
export const findFotosWithPagination = async (prisma: PrismaClient, page: number = 1, limit: number = 10) => {
  // Calcular quantos registros pular
  const skip = (page - 1) * limit;
  
  const [fotos, total] = await Promise.all([
    prisma.foto.findMany({
      skip,           // Pula X registros
      take: limit,    // Pega apenas X registros
      include: {
        preventiva: true
      },
      orderBy: {
        created_at: 'desc'
      }
    }),
    prisma.foto.count()  // Conta total de fotos
  ]);

  return {
    fotos,
    total,
    totalPages: Math.ceil(total / limit),  // Calcula total de páginas
    currentPage: page,
    hasNext: page < Math.ceil(total / limit),      
    hasPrevious: page > 1                          
  };
};

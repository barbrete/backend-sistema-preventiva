import { PrismaClient } from '../../generated/prisma';

export const createPreventiva = async (
  prisma: PrismaClient, 
  nome: string, 
  kilometragem_percorrida: number,
  irregularidades_encontradas: number,
  irregularidades_corrigidas: number,
  descricao: string,
  user_id: number
) => {
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

export const findPreventivaById = async (prisma: PrismaClient, id: number) => {
  return await prisma.preventiva.findUnique({
    where: { id },
    include: {
      usuario: true,
      fotos: true
    }
  });
};

export const findAllPreventivas = async (prisma: PrismaClient) => {
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

export const findPreventivasByUserId = async (prisma: PrismaClient, userId: number) => {
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

export const updatePreventiva = async (
  prisma: PrismaClient, 
  id: number, 
  nome?: string,
  kilometragem_percorrida?: number,
  irregularidades_encontradas?: number,
  irregularidades_corrigidas?: number,
  descricao?: string
) => {
  const dataToUpdate: any = {};
  if (nome !== undefined) dataToUpdate.nome = nome;
  if (kilometragem_percorrida !== undefined) dataToUpdate.kilometragem_percorrida = kilometragem_percorrida;
  if (irregularidades_encontradas !== undefined) dataToUpdate.irregularidades_encontradas = irregularidades_encontradas;
  if (irregularidades_corrigidas !== undefined) dataToUpdate.irregularidades_corrigidas = irregularidades_corrigidas;
  if (descricao !== undefined) dataToUpdate.descricao = descricao;

  return await prisma.preventiva.update({
    where: { id },
    data: dataToUpdate,
    include: {
      usuario: true,
      fotos: true
    }
  });
};

export const deletePreventiva = async (prisma: PrismaClient, id: number) => {
  await prisma.preventiva.delete({
    where: { id }
  });
};

export const deletePreventivasByUserId = async (prisma: PrismaClient, userId: number) => {
  await prisma.preventiva.deleteMany({
    where: { user_id: userId }
  });
};

export const countPreventivasByUserId = async (prisma: PrismaClient, userId: number) => {
  return await prisma.preventiva.count({
    where: { user_id: userId }
  });
};

export const findPreventivosWithPagination = async (prisma: PrismaClient, page: number = 1, limit: number = 10) => {
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

export const findPreventivasByUserWithPagination = async (
  prisma: PrismaClient, 
  userId: number, 
  page: number = 1, 
  limit: number = 10
) => {
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

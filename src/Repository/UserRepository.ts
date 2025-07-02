import { boolean } from 'zod';
import { PrismaClient } from '../../generated/prisma';

export const createUser = async (prisma: PrismaClient, email: string, nome: string, senha: string, tipo: any, ativo: boolean = true) => {
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
    } catch (error) {
        console.log('❌ ERRO no Prisma:', error);
        throw error;
    }
};

export const findUserById = async (prisma: PrismaClient, id: number) => {
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

export const findUserByEmail = async (prisma: PrismaClient, email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      preventivas: true
    }
  });
};

export const findAllUsers = async (prisma: PrismaClient) => {
  return await prisma.user.findMany({
    include: {
      preventivas: true
    },
    orderBy: {
      created_at: 'desc'
    }
  });
};

export const findActiveUsers = async (prisma: PrismaClient) => {
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

export const findUsersByTipo = async (prisma: PrismaClient, tipo: any) => {
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

export const updateUser = async (
  prisma: PrismaClient,
  id: number,
  email?: string,
  name?: string,
  senha?: string,
  tipo?: any,
  ativo?: boolean
) => {
  const dataToUpdate: any = {};
  if (email !== undefined) dataToUpdate.email = email;
  if (name !== undefined) dataToUpdate.name = name;
  if (senha !== undefined) dataToUpdate.senha = senha;
  if (tipo !== undefined) dataToUpdate.tipo = tipo;
  if (ativo !== undefined) dataToUpdate.ativo = ativo;

  return await prisma.user.update({
    where: { id },
    data: dataToUpdate,
    include: {
      preventivas: true
    }
  });
};

export const softDeleteUser = async (prisma: PrismaClient, id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      ativo: false,
      deleted_at: new Date()
    }
  });
};

export const reactivateUser = async (prisma: PrismaClient, id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      ativo: true,
      deleted_at: null
    }
  });
};

export const hardDeleteUser = async (prisma: PrismaClient, id: number) => {
  await prisma.user.delete({
    where: { id }
  });
};

export const countUsers = async (prisma: PrismaClient) => {
  return await prisma.user.count();
};

export const countActiveUsers = async (prisma: PrismaClient) => {
  return await prisma.user.count({
    where: { 
      ativo: true,
      deleted_at: null
    }
  });
};

export const findUsersWithPagination = async (prisma: PrismaClient, page: number = 1, limit: number = 10) => {
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

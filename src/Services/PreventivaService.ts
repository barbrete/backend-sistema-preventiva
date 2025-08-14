import { PrismaClient } from '../../generated/prisma';
import * as PreventivaRepository from '../Repository/PreventivaRepository';
import * as UserRepository from '../Repository/UserRepository';

const prisma = new PrismaClient();

export const createPreventiva = async (
  nome: string,
  kilometragem_percorrida: number,
  irregularidades_encontradas: number,
  irregularidades_corrigidas: number,
  descricao: string,
  user_id: number,
  tipo: string
) => {
  console.log('=== PreventivaService.createPreventiva ===');
  console.log('userId recebido no Service:', user_id, 'Tipo:', typeof user_id);
  
  const user = await UserRepository.findUserById(prisma, user_id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (!user.ativo) {
    throw new Error('Usuário desativado');
  }

  return await PreventivaRepository.createPreventiva(
    prisma,
    nome,
    kilometragem_percorrida,
    irregularidades_encontradas,
    irregularidades_corrigidas,
    descricao,
    user_id,
    tipo
  );
};

export const getPreventivaById = async (id: number) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, id);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }
  return preventiva;
};

export const getAllPreventivas = async () => {
  return await PreventivaRepository.findAllPreventivas(prisma);
};

export const getPreventivasByUser = async (userId: number) => {
  const user = await UserRepository.findUserById(prisma, userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return await PreventivaRepository.findPreventivasByUserId(prisma, userId);
};

export const getPreventivasForUserBasedOnRole = async (userId: number, userTipo: any) => {
  if (userTipo === 'ADMIN') {
    return await PreventivaRepository.findAllPreventivas(prisma);
  } else {
    return await PreventivaRepository.findPreventivasByUserId(prisma, userId);
  }
};

export const updatePreventiva = async (
  id: number,
  userId: number,
  userTipo: any,
  nome?: string,
  kilometragem_percorrida?: number,
  irregularidades_encontradas?: number,
  irregularidades_corrigidas?: number,
  descricao?: string,
  tipo?: string,
) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, id);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }

  if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
    throw new Error('Sem permissão para editar esta preventiva');
  }

  return await PreventivaRepository.updatePreventiva(
    prisma,
    id,
    nome,
    kilometragem_percorrida,
    irregularidades_encontradas,
    irregularidades_corrigidas,
    descricao,
    tipo
  );
};

export const deletePreventiva = async (id: number, userId: number, userTipo: any) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, id);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }

  if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
    throw new Error('Sem permissão para excluir esta preventiva');
  }

  return await PreventivaRepository.deletePreventiva(prisma, id);
};

export const getPreventivasWithPagination = async (page: number = 1, limit: number = 10) => {
  return await PreventivaRepository.findPreventivosWithPagination(prisma, page, limit);
};

export const getPreventivasByUserWithPagination = async (
  userId: number,
  page: number = 1,
  limit: number = 10
) => {
  const user = await UserRepository.findUserById(prisma, userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return await PreventivaRepository.findPreventivasByUserWithPagination(prisma, userId, page, limit);
};

export const getPreventivaStats = async (userId?: number) => {
  if (userId) {
    const userPreventivas = await PreventivaRepository.countPreventivasByUserId(prisma, userId);
    return {
      total: userPreventivas,
      user_id: userId
    };
  } else {
    const totalPreventivas = await prisma.preventiva.count();
    return {
      total: totalPreventivas
    };
  }
};

interface FiltrosPreventiva {
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    tecnico?: string;
    kmMin?: number;
    kmMax?: number;
    irregMin?: number;
    irregMax?: number;
    corrigMin?: number;
    corrigMax?: number;
    dataInicio?: string;
    dataFim?: string;
    page?: number;
    limit?: number;
}

export const getPreventivasWithFilters = async (
    userId: number, 
    userTipo: string, 
    filtros: FiltrosPreventiva
) => {
    const whereConditions: any = {};
    
    // Controle de acesso baseado no tipo de usuário
    if (userTipo !== "ADMIN") {
        whereConditions.user_id = userId;
    }

    // Filtro por termo de busca
    if (filtros.search) {
        whereConditions.OR = [
            { nome: { contains: filtros.search, mode: 'insensitive' } },
            { descricao: { contains: filtros.search, mode: 'insensitive' } },
            { usuario: { name: { contains: filtros.search, mode: 'insensitive' } } }
        ];
    }

    // Filtro por técnico específico
    if (filtros.tecnico) {
        whereConditions.usuario = {
            name: { contains: filtros.tecnico, mode: 'insensitive' }
        };
    }

    // Filtro por kilometragem
    if (filtros.kmMin !== undefined || filtros.kmMax !== undefined) {
        whereConditions.kilometragem_percorrida = {};
        if (filtros.kmMin !== undefined) {
            whereConditions.kilometragem_percorrida.gte = filtros.kmMin;
        }
        if (filtros.kmMax !== undefined) {
            whereConditions.kilometragem_percorrida.lte = filtros.kmMax;
        }
    }

    // Filtro por irregularidades encontradas
    if (filtros.irregMin !== undefined || filtros.irregMax !== undefined) {
        whereConditions.irregularidades_encontradas = {};
        if (filtros.irregMin !== undefined) {
            whereConditions.irregularidades_encontradas.gte = filtros.irregMin;
        }
        if (filtros.irregMax !== undefined) {
            whereConditions.irregularidades_encontradas.lte = filtros.irregMax;
        }
    }

    // Filtro por irregularidades corrigidas
    if (filtros.corrigMin !== undefined || filtros.corrigMax !== undefined) {
        whereConditions.irregularidades_corrigidas = {};
        if (filtros.corrigMin !== undefined) {
            whereConditions.irregularidades_corrigidas.gte = filtros.corrigMin;
        }
        if (filtros.corrigMax !== undefined) {
            whereConditions.irregularidades_corrigidas.lte = filtros.corrigMax;
        }
    }

    // Filtro por intervalo de datas
    if (filtros.dataInicio || filtros.dataFim) {
        whereConditions.created_at = {};
        if (filtros.dataInicio) {
            whereConditions.created_at.gte = new Date(filtros.dataInicio);
        }
        if (filtros.dataFim) {
            whereConditions.created_at.lte = new Date(filtros.dataFim);
        }
    }

    // Configuração de ordenação
    const validSortColumns = [
        'id',
        'nome', 
        'kilometragem_percorrida',
        'irregularidades_encontradas',
        'irregularidades_corrigidas',
        'created_at',
        'updated_at'
    ];
    
    let orderBy: any = { created_at: 'desc' };
    
    if (filtros.sortBy && validSortColumns.includes(filtros.sortBy)) {
        const orderDirection = filtros.sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc';
        orderBy = { [filtros.sortBy]: orderDirection };
    }
    
    // Ordenação por técnico
    if (filtros.sortBy === 'tecnico') {
        orderBy = { usuario: { name: filtros.sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc' } };
    }

    // Paginação
    const skip = ((filtros.page || 1) - 1) * (filtros.limit || 20);
    const take = filtros.limit || 20;

    const { preventivas, total } = await PreventivaRepository.findPreventivasWithFilters(
        prisma,
        whereConditions,
        orderBy,
        skip,
        take
    );

    return {
        preventivas,
        pagination: {
            total,
            page: filtros.page || 1,
            limit: filtros.limit || 20,
            totalPages: Math.ceil(total / (filtros.limit || 20))
        }
    };
};
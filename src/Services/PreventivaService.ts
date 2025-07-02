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
  user_id: number
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
    user_id
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
  descricao?: string
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
    descricao
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

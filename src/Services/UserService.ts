import { PrismaClient } from '../../generated/prisma';
import * as UserRepository from '../Repository/UserRepository';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (email: string, nome: string, senha: string, tipo: any) => {
  console.log('Parâmetros recebidos:', { email, nome, senha, tipo });

  const existingUser = await UserRepository.findUserByEmail(prisma, email);
  if (existingUser) {
    throw new Error('Usuário já existe com este email');
  }

  const hashedPassword = await bcrypt.hash(senha, 10);
  
  return await UserRepository.createUser(prisma, email, nome, hashedPassword, tipo);
};

export const getUserById = async (id: number) => {
  console.log('=== USER SERVICE - getUserById ===');
  console.log('ID recebido:', id, 'Tipo:', typeof id);
  
  if (!id || isNaN(id)) {
    throw new Error(`ID inválido: ${id}`);
  }
  
  const user = await UserRepository.findUserById(prisma, id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await UserRepository.findUserByEmail(prisma, email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  return user;
};

export const getAllUsers = async () => {
  return await UserRepository.findAllUsers(prisma);
};

export const getActiveUsers = async () => {
  return await UserRepository.findActiveUsers(prisma);
};

export const getUsersByTipo = async (tipo: any) => {
  return await UserRepository.findUsersByTipo(prisma, tipo);
};

export const updateUser = async (
  id: number,
  email?: string,
  name?: string,
  senha?: string,
  tipo?: any,
  ativo?: boolean
) => {
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
    hashedPassword = await bcrypt.hash(senha, 10);
  }

  return await UserRepository.updateUser(prisma, id, email, name, hashedPassword, tipo, ativo);
};

export const desativarUser = async (id: number) => {
  const user = await UserRepository.findUserById(prisma, id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return await UserRepository.softDeleteUser(prisma, id);
};

export const ativateUser = async (id: number) => {
  const user = await UserRepository.findUserById(prisma, id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return await UserRepository.reactivateUser(prisma, id);
};

export const deleteUser = async (id: number) => {
  const user = await UserRepository.findUserById(prisma, id);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.preventivas && user.preventivas.length > 0) {
    throw new Error('Não é possível excluir usuário com preventivas vinculadas');
  }

  return await UserRepository.hardDeleteUser(prisma, id);
};

export const getUsersWithPagination = async (page: number = 1, limit: number = 10) => {
  return await UserRepository.findUsersWithPagination(prisma, page, limit);
};

export const getUserStats = async () => {
  const totalUsers = await UserRepository.countUsers(prisma);
  const activeUsers = await UserRepository.countActiveUsers(prisma);
  
  return {
    total: totalUsers,
    active: activeUsers,
    inactive: totalUsers - activeUsers
  };
};

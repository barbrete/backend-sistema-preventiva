import { PrismaClient } from '../../generated/prisma';
import * as FotoRepository from '../Repository/FotoRepository';
import * as PreventivaRepository from '../Repository/PreventivaRepository';

const prisma = new PrismaClient();

export const createFoto = async (url: string, tipo: any, preventiva_id: number, userId: number, userTipo?: any) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventiva_id);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }

  if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
    throw new Error('Sem permissão para adicionar fotos a esta preventiva');
  }

  return await FotoRepository.createFoto(prisma, url, tipo, preventiva_id);
};

export const getFotoById = async (id: number) => {
  const foto = await FotoRepository.findFotoById(prisma, id);
  if (!foto) {
    throw new Error('Foto não encontrada');
  }
  return foto;
};

export const getAllFotos = async () => {
  return await FotoRepository.findAllFotos(prisma);
};

export const getFotosByPreventiva = async (preventivaId: number, userId: number, userTipo: any) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }

  if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
    throw new Error('Sem permissão para ver fotos desta preventiva');
  }

  return await FotoRepository.findFotosByPreventivaId(prisma, preventivaId);
};

export const getFotosByTipo = async (tipo: any) => {
  return await FotoRepository.findFotosByTipo(prisma, tipo);
};

export const getFotosByPreventivaAndTipo = async (
  preventivaId: number,
  tipo: any,
  userId: number,
  userTipo: any
) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }

  if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
    throw new Error('Sem permissão para ver fotos desta preventiva');
  }

  return await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, tipo);
};

export const updateFoto = async ( id: number, userId: number, userTipo: any, url?: string, tipo?: any) => {
  const foto = await FotoRepository.findFotoById(prisma, id);
  if (!foto) {
    throw new Error('Foto não encontrada');
  }

  if (userTipo !== 'ADMIN' && foto.preventiva.user_id !== userId) {
    throw new Error('Sem permissão para editar esta foto');
  }

  return await FotoRepository.updateFoto(prisma, id, url, tipo);
};

export const deleteFoto = async (id: number, userId: number, userTipo: any) => {
  const foto = await FotoRepository.findFotoById(prisma, id);
  if (!foto) {
    throw new Error('Foto não encontrada');
  }

  if (userTipo !== 'ADMIN' && foto.preventiva.user_id !== userId) {
    throw new Error('Sem permissão para excluir esta foto');
  }

  return await FotoRepository.deleteFoto(prisma, id);
};

export const deleteAllFotosFromPreventiva = async (preventivaId: number, userId: number, userTipo: any) => {
  const preventiva = await PreventivaRepository.findPreventivaById(prisma, preventivaId);
  if (!preventiva) {
    throw new Error('Preventiva não encontrada');
  }

  if (userTipo !== 'ADMIN' && preventiva.user_id !== userId) {
    throw new Error('Sem permissão para excluir fotos desta preventiva');
  }

  return await FotoRepository.deleteFotosByPreventivaId(prisma, preventivaId);
};

export const getFotosWithPagination = async (page: number = 1, limit: number = 10) => {
  return await FotoRepository.findFotosWithPagination(prisma, page, limit);
};

export const getFotoStats = async (preventivaId?: number) => {
  if (preventivaId) {
    const fotosCount = await FotoRepository.countFotosByPreventivaId(prisma, preventivaId);
    const fotosAntes = await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, 'ANTES');
    const fotosDepois = await FotoRepository.findFotosByPreventivaAndTipo(prisma, preventivaId, 'DEPOIS');
    
    return {
      total: fotosCount,
      antes: fotosAntes.length,
      depois: fotosDepois.length,
      preventiva_id: preventivaId
    };
  } else {
    const totalFotos = await prisma.foto.count();
    const fotosAntes = await FotoRepository.findFotosByTipo(prisma, 'ANTES');
    const fotosDepois = await FotoRepository.findFotosByTipo(prisma, 'DEPOIS');
    
    return {
      total: totalFotos,
      antes: fotosAntes.length,
      depois: fotosDepois.length
    };
  }
};

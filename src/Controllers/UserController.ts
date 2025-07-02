import { Request, Response } from 'express';
import { usuarioSchema } from '../schemas/UserSchemas';
import * as usuarioService from '../Services/UserService'


export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
    console.log('Usuario pra criar: ', req.body)
  const resultadoZod = usuarioSchema.safeParse(req.body);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { email, nome, senha, tipo } = resultadoZod.data;
        const usuario = await usuarioService.createUser(email, nome, senha, tipo);
        res.status(201).json(usuario);
        return;
    } catch (err) {
        console.log('Erro ao criar usuario:', err);
        res.status(500).json({ error: "Erro ao criar usuário", details: err });
        return;
    }
    console.log()
};

export const buscarTodosUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioService.getAllUsers();
    res.status(200).json(usuarios);
    return;
  } catch (err: any) {
    console.log('Erro ao buscar usuários:', err);
    res.status(500).json({ error: err.message });
    return;
  }
};

export const buscarUsuariosAtivos = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioService.getActiveUsers();
    res.status(200).json(usuarios);
    return;
  } catch (err: any) {
    console.log('Erro ao buscar usuários ativos:', err);
    res.status(500).json({ error: err.message });
    return;
  }
};

export const buscarUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.getUserById(Number(id));
    res.status(200).json(usuario);
    return;
  } catch (err: any) {
    console.log('Erro ao buscar usuário:', err);
    res.status(404).json({ error: err.message });
    return;
  }
};

export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const { email, nome, senha, tipo, ativo } = req.body;
    const usuario = await usuarioService.updateUser(Number(id), email, nome, senha, tipo, ativo);
    res.status(200).json(usuario);
    return;
  } catch (err: any) {
    console.log('Erro ao atualizar usuário:', err);
    res.status(400).json({ error: err.message });
    return;
  }
};

export const reativarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.ativateUser(Number(id));
    res.status(200).json(usuario);
    return;
  } catch (err: any) {
    console.log('Erro ao reativar usuário:', err);
    res.status(400).json({ error: err.message });
    return;
  }
};

export const desativarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.desativarUser(Number(id));
    res.json(usuario);
    return;
  } catch (err) {
    console.log('Erro ao desativar usuario:', err);
    res.status(500).json({ error: "Erro ao desativar usuário", details: err });
    return;
  }
};

export const deletarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await usuarioService.deleteUser(Number(id));
    res.json(usuario);
    return;
  } catch (err) {
    console.log('Erro ao deletar usuario:', err);
    res.status(500).json({ error: "Erro ao deletar usuário", details: err });
    return;
  }
};

export const obterEstatisticasUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await usuarioService.getUserStats();
    res.status(200).json(stats);
    return;
  } catch (err: any) {
    console.log('Erro ao obter estatísticas:', err);
    res.status(500).json({ error: err.message });
    return;
  }
};
import { Request, Response } from 'express';
import * as AuthService from '../Services/AuthService';
import bcrypt from 'bcrypt';
import * as userService from '../Services/UserService';
import * as userController from '../Controllers/UserController';
import { usuarioSchema } from '../schemas/UserSchemas';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Recebe o email e a senha e retorna um token e os dados do usuário se as credenciais forem válidas.
 *     tags: [Autenticação]
 *     requestBody:
 *       description: Dados para autenticação
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@g.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 2
 *                     email:
 *                       type: string
 *                       example: admin@g.com
 *                     tipo_usuario:
 *                       type: string
 *                       example: admin
 *       401:
 *         description: Credenciais inválidas
 */
export const login = async (req: Request, res: Response) => {
  console.log('Body recebido:', req.body);
  const { email, senha } = req.body;
  console.log('Email recebido:', email);
  console.log('Password recebido:', senha);
  const result = await AuthService.autenticarUsuario(email, senha);
  if (!result) {
    res.status(401).json({ mensagem: 'Credenciais inválidas' });
    return;
  }

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none", 
    maxAge: 60 * 60 * 1000
  });

  res.json({ usuario: result.usuario });
};


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário para a aplicação.
 *     tags: [Autenticação]
 *     requestBody:
 *       description: Dados para registro do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João da Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               apelido:
 *                 type: string
 *                 example: "joaoS"
 *               data_nascimento:
 *                 type: string
 *                 format: date-time
 *                 example: "1990-01-01T00:00:00.000Z"
 *               status:
 *                 type: boolean
 *                 example: true
 *               tipo_usuario:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: "João da Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@example.com"
 *       400:
 *         description: Dados inválidos para criação do usuário
 *       500:
 *         description: Erro interno na criação do usuário
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const resultadoZod = usuarioSchema.safeParse(req.body);
  if (!resultadoZod.success) {
    res.status(400).json({ errors: resultadoZod.error.errors });
    return;
  }
  try {
    const { email, nome, senha, tipo } = resultadoZod.data;
    const usuario = await userService.createUser(email, nome, senha, tipo);
    res.status(201).json(usuario);
    return;
  } catch (err) {
    console.log('Erro ao criar usuario:', err);
    res.status(500).json({ error: "Erro ao criar usuário", details: err });
    return;
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none", 
    secure: process.env.NODE_ENV === "production",
    path: "/", 
  });
  res.sendStatus(200);
};
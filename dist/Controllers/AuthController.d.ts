import { Request, Response } from 'express';
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
export declare const login: (req: Request, res: Response) => Promise<void>;
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
export declare const register: (req: Request, res: Response) => Promise<void>;
export declare const logout: (req: Request, res: Response) => void;
//# sourceMappingURL=AuthController.d.ts.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const AuthService = __importStar(require("../Services/AuthService"));
const userService = __importStar(require("../Services/UserService"));
const UserSchemas_1 = require("../schemas/UserSchemas");
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
const login = async (req, res) => {
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
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    });
    res.json({ usuario: result.usuario });
};
exports.login = login;
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
const register = async (req, res) => {
    const resultadoZod = UserSchemas_1.usuarioSchema.safeParse(req.body);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { email, nome, senha, tipo } = resultadoZod.data;
        const usuario = await userService.createUser(email, nome, senha, tipo);
        res.status(201).json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao criar usuario:', err);
        res.status(500).json({ error: "Erro ao criar usuário", details: err });
        return;
    }
};
exports.register = register;
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax", // ou "none" se usar domínios diferentes e HTTPS
        secure: process.env.NODE_ENV === "production",
        path: "/", // igual ao path usado no login
    });
    res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=AuthController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarUsuario = void 0;
const prisma_1 = require("../../generated/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET || "";
const prisma = new prisma_1.PrismaClient();
const autenticarUsuario = async (email, password) => {
    console.log('=== AuthService.autenticarUsuario ===');
    console.log('Email:', email);
    console.log('Password fornecida:', password);
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario)
        return null;
    console.log('Usuário retornado:', usuario);
    if (!usuario.ativo) {
        console.log('❌ Usuário inativo');
        return null;
    }
    const senhaValida = await bcrypt_1.default.compare(password, usuario.senha);
    console.log('Senha válida:', senhaValida);
    if (!senhaValida)
        return null;
    const token = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email, tipo: usuario.tipo }, SECRET, { expiresIn: '1h' });
    console.log('✅ Token gerado:', token.substring(0, 20) + '...');
    const { senha, ...usuarioSemSenha } = usuario;
    return { usuario: usuarioSemSenha, token };
};
exports.autenticarUsuario = autenticarUsuario;
//# sourceMappingURL=AuthService.js.map
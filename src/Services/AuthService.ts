import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || "";
const prisma = new PrismaClient();

export const autenticarUsuario = async (email: string, password: string) => {
  console.log('=== AuthService.autenticarUsuario ===');
  console.log('Email:', email);
  console.log('Password fornecida:', password);
  
  const usuario = await prisma.user.findUnique({ where: { email } });
  if (!usuario) return null;

  console.log('Usuário retornado:', usuario);

    if (!usuario.ativo) {
    console.log('❌ Usuário inativo');
    return null;
  }

  const senhaValida = await bcrypt.compare(password, usuario.senha);
  console.log('Senha válida:', senhaValida);
  if (!senhaValida) return null;

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
    SECRET,
    { expiresIn: '1h' }
  );

  console.log('✅ Token gerado:', token.substring(0, 20) + '...');

  const { senha, ...usuarioSemSenha } = usuario;

  return { usuario: usuarioSemSenha, token };
};
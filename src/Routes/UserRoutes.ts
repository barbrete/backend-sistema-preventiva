import { Router } from 'express';
import * as userController from '../Controllers/UserController';
import { autenticarToken } from '../Middlewares/AuthMiddleware';

export const router = Router();

// Rotas para usuários
router.post('/', userController.criarUsuario);
router.get('/', userController.buscarTodosUsuarios);
router.get('/ativos', userController.buscarUsuariosAtivos);
router.get('/stats', userController.obterEstatisticasUsuarios);
router.get('/:id', userController.buscarUsuarioPorId);
router.put('/:id', userController.atualizarUsuario);
router.patch('/:id/desativar', userController.desativarUsuario);
router.patch('/:id/reativar', userController.reativarUsuario);
router.delete('/:id', userController.deletarUsuario);

export default router;
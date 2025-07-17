import { Router } from 'express';
import * as userController from '../Controllers/UserController';
import { autenticarToken } from '../Middlewares/AuthMiddleware';
import { checkAdmin } from '../Middlewares/CheckAdminMiddleware';

export const router = Router();

// Rotas para usuários
router.post('/', userController.criarUsuario);
router.get('/', autenticarToken, userController.buscarTodosUsuarios);
router.get('/ativos', autenticarToken, userController.buscarUsuariosAtivos);
router.get('/stats', autenticarToken, userController.obterEstatisticasUsuarios);
router.get('/tecnicos', autenticarToken, checkAdmin ,userController.buscarTecnicos);
router.get('/:id', autenticarToken, userController.buscarUsuarioPorId);
router.put('/:id', autenticarToken, userController.atualizarUsuario);
router.patch('/:id/desativar',autenticarToken, userController.desativarUsuario);
router.patch('/:id/reativar', autenticarToken, userController.reativarUsuario);
router.delete('/:id', autenticarToken, userController.deletarUsuario);

export default router;
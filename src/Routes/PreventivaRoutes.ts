import { Router } from 'express';
import * as preventivaController from '../Controllers/PreventivaController';
import { autenticarToken } from '../Middlewares/AuthMiddleware';

export const router = Router();

// Rotas para preventivas
router.post('/', autenticarToken, preventivaController.criarPreventiva);
router.get('/', autenticarToken, preventivaController.buscarTodasPreventivas);
router.get('/paginacao', autenticarToken, preventivaController.buscarPreventivasComPaginacao);
router.get('/paginacao/:userId', autenticarToken, preventivaController.buscarPreventivasPorUsuarioComPaginacao);
router.get('/stats', autenticarToken, preventivaController.obterEstatisticasPreventivas);
router.get('/usuario/:userId', autenticarToken, preventivaController.buscarPreventivasPorUsuario);
router.get('/filtros/buscar', autenticarToken, preventivaController.buscarPreventivasComFiltros);
router.get('/:id', autenticarToken, preventivaController.buscarPreventivaPorId);
router.put('/:id', autenticarToken, preventivaController.atualizarPreventiva);
router.delete('/:id', autenticarToken, preventivaController.deletarPreventiva);

export default router;
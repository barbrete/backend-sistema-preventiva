import { Router } from 'express';
import * as preventivaController from '../Controllers/PreventivaController';

export const router = Router();

// Rotas para preventivas
router.post('/', preventivaController.criarPreventiva);
router.get('/', preventivaController.buscarTodasPreventivas);
router.get('/paginacao', preventivaController.buscarPreventivasComPaginacao);
router.get('/stats', preventivaController.obterEstatisticasPreventivas);
router.get('/usuario/:userId', preventivaController.buscarPreventivasPorUsuario);
router.get('/:id', preventivaController.buscarPreventivaPorId);
router.put('/:id', preventivaController.atualizarPreventiva);
router.delete('/:id', preventivaController.deletarPreventiva);

export default router;
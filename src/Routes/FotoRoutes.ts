import { Router } from 'express';
import * as fotoController from '../Controllers/FotoController';
import { autenticarToken } from '../Middlewares/AuthMiddleware';
import upload from '../config/multerCloudinary';

export const router = Router();
router.post('/', autenticarToken, upload.single('file'), fotoController.criarFoto);
router.get('/', autenticarToken, fotoController.buscarTodasFotos);
router.get('/stats', autenticarToken, fotoController.obterEstatisticasFotos);
router.get('/tipo/:tipo', autenticarToken, fotoController.buscarFotosPorTipo);
router.get('/preventiva/:preventivaId', autenticarToken, fotoController.buscarFotosPorPreventiva);
router.get('/:id', autenticarToken, fotoController.buscarFotoPorId);
router.put('/:id', autenticarToken, upload.single('file'), fotoController.atualizarFoto);
router.delete('/:id', autenticarToken, fotoController.deletarFoto);

export default router;
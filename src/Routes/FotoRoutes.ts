import { Router } from 'express';
import * as fotoController from '../Controllers/FotoController';
import { autenticarToken } from '../Middlewares/AuthMiddleware';
import multer from 'multer';
import multerConfig from '../config/multerCloudinary';


export const router = Router();
// router.use((req, res, next) => {
//     console.log('=== DEBUG FOTO ROUTE ===');
//     console.log('Method:', req.method);
//     console.log('Headers:', req.headers);
//     console.log('Content-Type:', req.get('Content-Type'));
//     next();
// });
router.post('/', autenticarToken, multer(multerConfig).single('file'), fotoController.criarFoto);
router.get('/', autenticarToken, fotoController.buscarTodasFotos);
router.get('/stats', autenticarToken, fotoController.obterEstatisticasFotos);
router.get('/tipo/:tipo', autenticarToken, fotoController.buscarFotosPorTipo);
router.get('/preventiva/:preventivaId', autenticarToken, fotoController.buscarFotosPorPreventiva);
router.get('/:id', autenticarToken, fotoController.buscarFotoPorId);
router.put('/:id', autenticarToken, multer(multerConfig).single('file'), fotoController.atualizarFoto);
router.delete('/:id', autenticarToken, fotoController.deletarFoto);

export default router;
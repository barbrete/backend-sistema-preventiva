import { Router } from 'express';
import * as fotoController from '../Controllers/FotoController';
import multer from 'multer';
import multerConfig from '../config/multer';


export const router = Router();
// router.use((req, res, next) => {
//     console.log('=== DEBUG FOTO ROUTE ===');
//     console.log('Method:', req.method);
//     console.log('Headers:', req.headers);
//     console.log('Content-Type:', req.get('Content-Type'));
//     next();
// });
router.post('/', multer(multerConfig).single('file'), fotoController.criarFoto);
router.get('/', fotoController.buscarTodasFotos);
router.get('/stats', fotoController.obterEstatisticasFotos);
router.get('/tipo/:tipo', fotoController.buscarFotosPorTipo);
router.get('/preventiva/:preventivaId', fotoController.buscarFotosPorPreventiva);
router.get('/:id', fotoController.buscarFotoPorId);
router.put('/:id', multer(multerConfig).single('file'), fotoController.atualizarFoto);
router.delete('/:id', fotoController.deletarFoto);

export default router;
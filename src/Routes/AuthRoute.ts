import { Router } from 'express';
import * as AuthController from '../Controllers/AuthController';
import { autenticarToken } from '../Middlewares/AuthMiddleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.get('/usuario', autenticarToken, (req, res) => {
  res.json({ usuario: (req as any).usuario });
});

export default router;
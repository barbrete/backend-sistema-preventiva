import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || "";

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, SECRET, (err:any, usuario:any) => {
    if (err) {
      console.log("Erro na verificação do token:", err);
      res.sendStatus(403);
      return;
    }
    console.log("Token verificado, usuário:", usuario);
    (req as any).user = usuario;
    next();
  });
};
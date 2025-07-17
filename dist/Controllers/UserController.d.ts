import { Request, Response } from 'express';
export declare const criarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const buscarTodosUsuarios: (req: Request, res: Response) => Promise<void>;
export declare const buscarUsuariosAtivos: (req: Request, res: Response) => Promise<void>;
export declare const buscarTecnicos: (req: Request, res: Response) => Promise<void>;
export declare const buscarUsuarioPorId: (req: Request, res: Response) => Promise<void>;
export declare const atualizarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const reativarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const desativarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const deletarUsuario: (req: Request, res: Response) => Promise<void>;
export declare const obterEstatisticasUsuarios: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=UserController.d.ts.map
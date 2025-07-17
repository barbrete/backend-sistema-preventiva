"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const checkAdmin = (req, res, next) => {
    const usuario = req.usuario;
    console.log("Verificando se o usuário é admin:", usuario);
    if (!usuario) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
    }
    if (usuario.tipo !== 'ADMIN') {
        res.status(403).json({ error: 'Acesso negado. Este recurso é apenas para administradores.' });
        return;
    }
    next();
};
exports.checkAdmin = checkAdmin;
//# sourceMappingURL=CheckAdminMiddleware.js.map
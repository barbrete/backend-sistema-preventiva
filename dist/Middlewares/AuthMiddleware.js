"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET || "";
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jsonwebtoken_1.default.verify(token, SECRET, (err, usuario) => {
        if (err) {
            console.log("Erro na verificação do token:", err);
            res.sendStatus(403);
            return;
        }
        console.log("Token verificado, usuário:", usuario);
        req.usuario = usuario;
        next();
    });
};
exports.autenticarToken = autenticarToken;
//# sourceMappingURL=AuthMiddleware.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fotoController = __importStar(require("../Controllers/FotoController"));
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const multerCloudinary_1 = __importDefault(require("../config/multerCloudinary"));
exports.router = (0, express_1.Router)();
// router.use((req, res, next) => {
//     console.log('=== DEBUG FOTO ROUTE ===');
//     console.log('Method:', req.method);
//     console.log('Headers:', req.headers);
//     console.log('Content-Type:', req.get('Content-Type'));
//     next();
// });
exports.router.post('/', AuthMiddleware_1.autenticarToken, multerCloudinary_1.default.single('file'), fotoController.criarFoto);
exports.router.get('/', AuthMiddleware_1.autenticarToken, fotoController.buscarTodasFotos);
exports.router.get('/stats', AuthMiddleware_1.autenticarToken, fotoController.obterEstatisticasFotos);
exports.router.get('/tipo/:tipo', AuthMiddleware_1.autenticarToken, fotoController.buscarFotosPorTipo);
exports.router.get('/preventiva/:preventivaId', AuthMiddleware_1.autenticarToken, fotoController.buscarFotosPorPreventiva);
exports.router.get('/:id', AuthMiddleware_1.autenticarToken, fotoController.buscarFotoPorId);
exports.router.put('/:id', AuthMiddleware_1.autenticarToken, multerCloudinary_1.default.single('file'), fotoController.atualizarFoto);
exports.router.delete('/:id', AuthMiddleware_1.autenticarToken, fotoController.deletarFoto);
exports.default = exports.router;
//# sourceMappingURL=FotoRoutes.js.map
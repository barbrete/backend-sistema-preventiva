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
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterEstatisticasUsuarios = exports.deletarUsuario = exports.desativarUsuario = exports.reativarUsuario = exports.atualizarUsuario = exports.buscarUsuarioPorId = exports.buscarTecnicos = exports.buscarUsuariosAtivos = exports.buscarTodosUsuarios = exports.criarUsuario = void 0;
const UserSchemas_1 = require("../schemas/UserSchemas");
const usuarioService = __importStar(require("../Services/UserService"));
const criarUsuario = async (req, res) => {
    console.log('Usuario pra criar: ', req.body);
    const resultadoZod = UserSchemas_1.usuarioSchema.safeParse(req.body);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { email, nome, senha, tipo } = resultadoZod.data;
        const usuario = await usuarioService.createUser(email, nome, senha, tipo);
        res.status(201).json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao criar usuario:', err);
        res.status(500).json({ error: "Erro ao criar usuário", details: err });
        return;
    }
    console.log();
};
exports.criarUsuario = criarUsuario;
const buscarTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.getAllUsers();
        res.status(200).json(usuarios);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar usuários:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarTodosUsuarios = buscarTodosUsuarios;
const buscarUsuariosAtivos = async (req, res) => {
    try {
        const usuarios = await usuarioService.getActiveUsers();
        res.status(200).json(usuarios);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar usuários ativos:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarUsuariosAtivos = buscarUsuariosAtivos;
const buscarTecnicos = async (req, res) => {
    try {
        const tecnicos = await usuarioService.getUsersByTipo("TECNICO");
        res.status(200).json(tecnicos);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar técnicos:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarTecnicos = buscarTecnicos;
const buscarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.getUserById(Number(id));
        res.status(200).json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar usuário:', err);
        res.status(404).json({ error: err.message });
        return;
    }
};
exports.buscarUsuarioPorId = buscarUsuarioPorId;
const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const { email, nome, senha, tipo, ativo } = req.body;
        const usuario = await usuarioService.updateUser(Number(id), email, nome, senha, tipo, ativo);
        res.status(200).json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao atualizar usuário:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.atualizarUsuario = atualizarUsuario;
const reativarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.ativateUser(Number(id));
        res.status(200).json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao reativar usuário:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.reativarUsuario = reativarUsuario;
const desativarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.desativarUser(Number(id));
        res.json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao desativar usuario:', err);
        res.status(500).json({ error: "Erro ao desativar usuário", details: err });
        return;
    }
};
exports.desativarUsuario = desativarUsuario;
const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.deleteUser(Number(id));
        res.json(usuario);
        return;
    }
    catch (err) {
        console.log('Erro ao deletar usuario:', err);
        res.status(500).json({ error: "Erro ao deletar usuário", details: err });
        return;
    }
};
exports.deletarUsuario = deletarUsuario;
const obterEstatisticasUsuarios = async (req, res) => {
    try {
        const stats = await usuarioService.getUserStats();
        res.status(200).json(stats);
        return;
    }
    catch (err) {
        console.log('Erro ao obter estatísticas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.obterEstatisticasUsuarios = obterEstatisticasUsuarios;
//# sourceMappingURL=UserController.js.map
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
exports.buscarPreventivasComPaginacao = exports.obterEstatisticasPreventivas = exports.deletarPreventiva = exports.atualizarPreventiva = exports.buscarPreventivasPorUsuario = exports.buscarTodasPreventivas = exports.buscarPreventivaPorId = exports.criarPreventiva = void 0;
const PreventivaSchemas_1 = require("../schemas/PreventivaSchemas");
const preventivaService = __importStar(require("../Services/PreventivaService"));
const criarPreventiva = async (req, res) => {
    console.log('=== CRIAR PREVENTIVA ===');
    console.log('Body completo:', req.body);
    console.log('userId do body:', req.body.userId, 'Tipo:', typeof req.body.userId);
    const resultadoZod = PreventivaSchemas_1.createPreventivaSchema.safeParse(req.body);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao } = resultadoZod.data;
        const userId = req.body.userId;
        const preventiva = await preventivaService.createPreventiva(nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao, userId);
        res.status(201).json(preventiva);
        return;
    }
    catch (err) {
        console.log('Erro ao criar preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.criarPreventiva = criarPreventiva;
const buscarPreventivaPorId = async (req, res) => {
    const resultadoZod = PreventivaSchemas_1.preventivaIdSchema.safeParse(req.params);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { id } = resultadoZod.data;
        const preventiva = await preventivaService.getPreventivaById(id);
        res.status(200).json(preventiva);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar preventiva:', err);
        res.status(404).json({ error: err.message });
        return;
    }
};
exports.buscarPreventivaPorId = buscarPreventivaPorId;
const buscarTodasPreventivas = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userTipo = req.user?.tipo;
        const preventivas = await preventivaService.getPreventivasForUserBasedOnRole(userId, userTipo);
        res.status(200).json(preventivas);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar preventivas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarTodasPreventivas = buscarTodasPreventivas;
const buscarPreventivasPorUsuario = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ error: 'ID do usuário inválido' });
        return;
    }
    try {
        const preventivas = await preventivaService.getPreventivasByUser(userId);
        res.status(200).json(preventivas);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar preventivas do usuário:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.buscarPreventivasPorUsuario = buscarPreventivasPorUsuario;
const atualizarPreventiva = async (req, res) => {
    const resultadoZodParams = PreventivaSchemas_1.preventivaIdSchema.safeParse(req.params);
    const resultadoZodBody = PreventivaSchemas_1.updatePreventivaSchema.safeParse(req.body);
    if (!resultadoZodParams.success) {
        res.status(400).json({ errors: resultadoZodParams.error.errors });
        return;
    }
    if (!resultadoZodBody.success) {
        res.status(400).json({ errors: resultadoZodBody.error.errors });
        return;
    }
    try {
        const { id } = resultadoZodParams.data;
        const { nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao } = resultadoZodBody.data;
        const userId = req.user?.id;
        const userTipo = req.user?.tipo;
        const preventiva = await preventivaService.updatePreventiva(id, userId, userTipo, nome, kilometragem_percorrida, irregularidades_encontradas, irregularidades_corrigidas, descricao);
        res.status(200).json(preventiva);
        return;
    }
    catch (err) {
        console.log('Erro ao atualizar preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.atualizarPreventiva = atualizarPreventiva;
const deletarPreventiva = async (req, res) => {
    const resultadoZod = PreventivaSchemas_1.preventivaIdSchema.safeParse(req.params);
    if (!resultadoZod.success) {
        res.status(400).json({ errors: resultadoZod.error.errors });
        return;
    }
    try {
        const { id } = resultadoZod.data;
        const userId = req.user?.id;
        const userTipo = req.user?.tipo;
        await preventivaService.deletePreventiva(id, userId, userTipo);
        res.status(200).json({ message: 'Preventiva deletada com sucesso' });
        return;
    }
    catch (err) {
        console.log('Erro ao deletar preventiva:', err);
        res.status(400).json({ error: err.message });
        return;
    }
};
exports.deletarPreventiva = deletarPreventiva;
const obterEstatisticasPreventivas = async (req, res) => {
    try {
        const userId = req.query.user_id ? parseInt(req.query.user_id) : undefined;
        const stats = await preventivaService.getPreventivaStats(userId);
        res.status(200).json(stats);
        return;
    }
    catch (err) {
        console.log('Erro ao obter estatísticas:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.obterEstatisticasPreventivas = obterEstatisticasPreventivas;
const buscarPreventivasComPaginacao = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const resultado = await preventivaService.getPreventivasWithPagination(page, limit);
        res.status(200).json(resultado);
        return;
    }
    catch (err) {
        console.log('Erro ao buscar preventivas com paginação:', err);
        res.status(500).json({ error: err.message });
        return;
    }
};
exports.buscarPreventivasComPaginacao = buscarPreventivasComPaginacao;
//# sourceMappingURL=PreventivaController.js.map
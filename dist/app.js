"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const PreventivaRoutes_1 = __importDefault(require("./Routes/PreventivaRoutes"));
const FotoRoutes_1 = __importDefault(require("./Routes/FotoRoutes"));
const AuthRoute_1 = __importDefault(require("./Routes/AuthRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send("API rodando!");
});
app.use('/auth', AuthRoute_1.default);
app.use('/usuarios', UserRoutes_1.default);
app.use('/preventivas', PreventivaRoutes_1.default);
app.use('/fotos', FotoRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
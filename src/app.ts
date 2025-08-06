import express from 'express';
import cors from 'cors';
import userRoutes from './Routes/UserRoutes';
import preventivaRoutes from './Routes/PreventivaRoutes';
import fotoRoutes from './Routes/FotoRoutes';
import authRoutes from './Routes/AuthRoute';
import cookieParser from "cookie-parser";
const app = express();

const frontsPermitidos = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || frontsPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Não permitido pelo CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("API rodando!");
})

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/preventivas', preventivaRoutes);
app.use('/fotos', fotoRoutes);

export default app;
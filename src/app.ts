import express from 'express';
import cors from 'cors';
import userRoutes from './Routes/UserRoutes';
import preventivaRoutes from './Routes/PreventivaRoutes';
import fotoRoutes from './Routes/FotoRoutes';
import authRoutes from './Routes/AuthRoute';
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
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
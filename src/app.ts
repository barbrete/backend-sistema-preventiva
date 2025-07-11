import express from 'express';
import cors from 'cors';
import path from 'path';
import userRoutes from './Routes/UserRoutes';
import preventivaRoutes from './Routes/PreventivaRoutes';
import fotoRoutes from './Routes/FotoRoutes';
import authRoutes from './Routes/AuthRoute';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API rodando!");
})

app.use("/images", express.static(path.join(__dirname,"..", "uploads")));
console.log('Pasta de uploads:', path.join(__dirname, "..", "uploads"));

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/preventivas', preventivaRoutes);
app.use('/fotos', fotoRoutes);

export default app;
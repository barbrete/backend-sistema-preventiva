import multer, { Options } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Estende o tipo Request para incluir o usuário
//para criar uma pasta diferente para cada usuario logado que fizer o upload das foto

const storage = multer.diskStorage({
    destination: (req: any, file, cb) => {
        console.log('=== MULTER DESTINATION DEBUG ===');
        console.log('req.body completo:', req.body);

        const userId = req.user?.id || req.body?.userId;
        console.log('UserId final escolhido:', userId);
        console.log('Tipo do userId:', typeof userId);
        
        const uploadPath = path.join(__dirname, "..", "..", "uploads", userId.toString());
        console.log('Caminho completo da pasta:', uploadPath);
        console.log('Pasta existe antes de criar?', fs.existsSync(uploadPath));

        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.log('❌ Erro ao criar pasta:', err);
                return cb(err, uploadPath);
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const multerConfig = {
    storage,
    limits: {
        fileSize: 8 * 1024 * 1024 // 8MB
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];

        if (!allowedTypes.includes(file.mimetype)) {
            console.log('❌ Tipo de arquivo não permitido:', file.mimetype);
            return cb(new Error('Apenas imagens são permitidas!'), false);
        }

        console.log('✅ Tipo de arquivo válido:', file.mimetype);
        cb(null, true);
    }
};

export default multerConfig;

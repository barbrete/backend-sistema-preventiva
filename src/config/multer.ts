import multer from "multer";
import path from "path";
import fs from "fs";

//Configurado para salvar local

const storage = multer.diskStorage({
    destination: (req: any, file, cb) => {
        const userId = req.user?.id || req.body?.userId || 'default';
        const uploadPath = path.join(__dirname, "..", "..", "uploads", userId.toString());

        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
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
        fileSize: 8 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Apenas imagens são permitidas!'), false);
        }

        cb(null, true);
    }
};

export default multerConfig;

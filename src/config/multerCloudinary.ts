// src/config/multerCloudinary.ts
import multer from "multer";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req: any, file: any) => {
            const userId = req.body?.userId || 'default';
            return `sistema-preventiva/usuario_${userId}`;
        },
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [
            { width: 1500, height: 1500, crop: 'limit' },
            { quality: 'auto:good' }
        ],
        publicId: (req: any, file: any) => {
            const timestamp = Date.now();
            const tipo = req.body?.tipo || 'foto';
            const originalName = file.originalname.split('.')[0];
            return `${timestamp}-${tipo}-${originalName}`;
        }
    }
});

const multerConfig = {
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
        cb(null, allowedTypes.includes(file.mimetype));
    }
};

export default multerConfig;
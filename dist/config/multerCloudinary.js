"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/multerCloudinary.ts
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("./cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        folder: (req, file) => {
            const userId = req.body.userId || 'default';
            const preventivaId = req.body.preventiva_id || 'default';
            return `sistema-preventiva/usuario_${userId}/${preventivaId}`;
        },
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [
            { width: 1500, height: 1500, crop: 'limit' },
            { quality: 'auto:good' }
        ],
        public_id: (req, file) => {
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
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"];
        cb(null, allowedTypes.includes(file.mimetype));
    }
};
exports.default = multerConfig;
//# sourceMappingURL=multerCloudinary.js.map
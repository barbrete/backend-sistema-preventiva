import { CloudinaryStorage } from "multer-storage-cloudinary";
declare const multerConfig: {
    storage: CloudinaryStorage;
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => void;
};
export default multerConfig;
//# sourceMappingURL=multerCloudinary.d.ts.map
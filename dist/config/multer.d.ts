import multer from "multer";
declare const multerConfig: {
    storage: multer.StorageEngine;
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => any;
};
export default multerConfig;
//# sourceMappingURL=multer.d.ts.map
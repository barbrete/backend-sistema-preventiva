export declare const createFoto: (file: Express.Multer.File, tipo: any, preventiva_id: number, userId: number, userTipo?: any) => Promise<{
    preventiva: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    };
} & {
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}>;
export declare const getFotoById: (id: number) => Promise<{
    preventiva: {
        usuario: {
            email: string;
            senha: string;
            tipo: import("../../generated/prisma").$Enums.TipoUsuario;
            ativo: boolean;
            id: number;
            name: string | null;
            deleted_at: Date | null;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    };
} & {
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}>;
export declare const getAllFotos: () => Promise<({
    preventiva: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    };
} & {
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
})[]>;
export declare const getFotosByPreventiva: (preventivaId: number, userId: number, userTipo: any) => Promise<{
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}[]>;
export declare const getFotosByTipo: (tipo: any) => Promise<({
    preventiva: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    };
} & {
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
})[]>;
export declare const getFotosByPreventivaAndTipo: (preventivaId: number, tipo: any, userId: number, userTipo: any) => Promise<{
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}[]>;
export declare const updateFoto: (id: number, file: Express.Multer.File, userId: number, userTipo: any, preventiva_id: number, tipo?: any) => Promise<{
    preventiva: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    };
} & {
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}>;
export declare const deleteFoto: (id: number, userId: number, userTipo: any) => Promise<void>;
export declare const deleteAllFotosFromPreventiva: (preventivaId: number, userId: number, userTipo: any) => Promise<void>;
export declare const getFotosWithPagination: (page?: number, limit?: number) => Promise<{
    fotos: ({
        preventiva: {
            nome: string | null;
            id: number;
            created_at: Date;
            updated_at: Date;
            kilometragem_percorrida: number;
            irregularidades_encontradas: number;
            irregularidades_corrigidas: number;
            descricao: string;
            user_id: number;
        };
    } & {
        tipo: import("../../generated/prisma").$Enums.TipoFoto;
        id: number;
        created_at: Date;
        updated_at: Date;
        url: string;
        preventiva_id: number;
    })[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
}>;
export declare const getFotoStats: (preventivaId?: number) => Promise<{
    total: number;
    antes: number;
    depois: number;
    preventiva_id: number;
} | {
    total: number;
    antes: number;
    depois: number;
    preventiva_id?: undefined;
}>;
//# sourceMappingURL=FotoService.d.ts.map
import { PrismaClient } from '../../generated/prisma';
export declare const createFoto: (prisma: PrismaClient, url: string, tipo: any, preventiva_id: number) => Promise<{
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
export declare const findFotoById: (prisma: PrismaClient, id: number) => Promise<({
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
}) | null>;
export declare const findAllFotos: (prisma: PrismaClient) => Promise<({
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
export declare const findFotosByPreventivaId: (prisma: PrismaClient, preventivaId: number) => Promise<{
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}[]>;
export declare const findFotosByTipo: (prisma: PrismaClient, tipo: any) => Promise<({
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
export declare const findFotosByPreventivaAndTipo: (prisma: PrismaClient, preventivaId: number, tipo: any) => Promise<{
    tipo: import("../../generated/prisma").$Enums.TipoFoto;
    id: number;
    created_at: Date;
    updated_at: Date;
    url: string;
    preventiva_id: number;
}[]>;
export declare const updateFoto: (prisma: PrismaClient, id: number, url?: string, tipo?: any) => Promise<{
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
export declare const deleteFoto: (prisma: PrismaClient, id: number) => Promise<void>;
export declare const deleteFotosByPreventivaId: (prisma: PrismaClient, preventivaId: number) => Promise<void>;
export declare const countFotosByPreventivaId: (prisma: PrismaClient, preventivaId: number) => Promise<number>;
export declare const findFotosWithPagination: (prisma: PrismaClient, page?: number, limit?: number) => Promise<{
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
//# sourceMappingURL=FotoRepository.d.ts.map
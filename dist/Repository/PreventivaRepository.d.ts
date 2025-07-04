import { PrismaClient } from '../../generated/prisma';
export declare const createPreventiva: (prisma: PrismaClient, nome: string, kilometragem_percorrida: number, irregularidades_encontradas: number, irregularidades_corrigidas: number, descricao: string, user_id: number) => Promise<{
    fotos: {
        tipo: import("../../generated/prisma").$Enums.TipoFoto;
        id: number;
        created_at: Date;
        updated_at: Date;
        url: string;
        preventiva_id: number;
    }[];
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
}>;
export declare const findPreventivaById: (prisma: PrismaClient, id: number) => Promise<({
    fotos: {
        tipo: import("../../generated/prisma").$Enums.TipoFoto;
        id: number;
        created_at: Date;
        updated_at: Date;
        url: string;
        preventiva_id: number;
    }[];
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
}) | null>;
export declare const findAllPreventivas: (prisma: PrismaClient) => Promise<({
    fotos: {
        tipo: import("../../generated/prisma").$Enums.TipoFoto;
        id: number;
        created_at: Date;
        updated_at: Date;
        url: string;
        preventiva_id: number;
    }[];
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
})[]>;
export declare const findPreventivasByUserId: (prisma: PrismaClient, userId: number) => Promise<({
    fotos: {
        tipo: import("../../generated/prisma").$Enums.TipoFoto;
        id: number;
        created_at: Date;
        updated_at: Date;
        url: string;
        preventiva_id: number;
    }[];
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
})[]>;
export declare const updatePreventiva: (prisma: PrismaClient, id: number, nome?: string, kilometragem_percorrida?: number, irregularidades_encontradas?: number, irregularidades_corrigidas?: number, descricao?: string) => Promise<{
    fotos: {
        tipo: import("../../generated/prisma").$Enums.TipoFoto;
        id: number;
        created_at: Date;
        updated_at: Date;
        url: string;
        preventiva_id: number;
    }[];
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
}>;
export declare const deletePreventiva: (prisma: PrismaClient, id: number) => Promise<void>;
export declare const deletePreventivasByUserId: (prisma: PrismaClient, userId: number) => Promise<void>;
export declare const countPreventivasByUserId: (prisma: PrismaClient, userId: number) => Promise<number>;
export declare const findPreventivosWithPagination: (prisma: PrismaClient, page?: number, limit?: number) => Promise<{
    preventivas: ({
        fotos: {
            tipo: import("../../generated/prisma").$Enums.TipoFoto;
            id: number;
            created_at: Date;
            updated_at: Date;
            url: string;
            preventiva_id: number;
        }[];
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
    })[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
}>;
export declare const findPreventivasByUserWithPagination: (prisma: PrismaClient, userId: number, page?: number, limit?: number) => Promise<{
    preventivas: ({
        fotos: {
            tipo: import("../../generated/prisma").$Enums.TipoFoto;
            id: number;
            created_at: Date;
            updated_at: Date;
            url: string;
            preventiva_id: number;
        }[];
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
    })[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
}>;
//# sourceMappingURL=PreventivaRepository.d.ts.map
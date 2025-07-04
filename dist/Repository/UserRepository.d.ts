import { PrismaClient } from '../../generated/prisma';
export declare const createUser: (prisma: PrismaClient, email: string, nome: string, senha: string, tipo: any, ativo?: boolean) => Promise<{
    preventivas: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    }[];
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}>;
export declare const findUserById: (prisma: PrismaClient, id: number) => Promise<({
    preventivas: ({
        fotos: {
            tipo: import("../../generated/prisma").$Enums.TipoFoto;
            id: number;
            created_at: Date;
            updated_at: Date;
            url: string;
            preventiva_id: number;
        }[];
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
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}) | null>;
export declare const findUserByEmail: (prisma: PrismaClient, email: string) => Promise<({
    preventivas: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    }[];
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}) | null>;
export declare const findAllUsers: (prisma: PrismaClient) => Promise<({
    preventivas: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    }[];
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
})[]>;
export declare const findActiveUsers: (prisma: PrismaClient) => Promise<({
    preventivas: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    }[];
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
})[]>;
export declare const findUsersByTipo: (prisma: PrismaClient, tipo: any) => Promise<({
    preventivas: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    }[];
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
})[]>;
export declare const updateUser: (prisma: PrismaClient, id: number, email?: string, name?: string, senha?: string, tipo?: any, ativo?: boolean) => Promise<{
    preventivas: {
        nome: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        kilometragem_percorrida: number;
        irregularidades_encontradas: number;
        irregularidades_corrigidas: number;
        descricao: string;
        user_id: number;
    }[];
} & {
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}>;
export declare const softDeleteUser: (prisma: PrismaClient, id: number) => Promise<{
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}>;
export declare const reactivateUser: (prisma: PrismaClient, id: number) => Promise<{
    email: string;
    senha: string;
    tipo: import("../../generated/prisma").$Enums.TipoUsuario;
    ativo: boolean;
    id: number;
    name: string | null;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}>;
export declare const hardDeleteUser: (prisma: PrismaClient, id: number) => Promise<void>;
export declare const countUsers: (prisma: PrismaClient) => Promise<number>;
export declare const countActiveUsers: (prisma: PrismaClient) => Promise<number>;
export declare const findUsersWithPagination: (prisma: PrismaClient, page?: number, limit?: number) => Promise<{
    users: ({
        preventivas: {
            nome: string | null;
            id: number;
            created_at: Date;
            updated_at: Date;
            kilometragem_percorrida: number;
            irregularidades_encontradas: number;
            irregularidades_corrigidas: number;
            descricao: string;
            user_id: number;
        }[];
    } & {
        email: string;
        senha: string;
        tipo: import("../../generated/prisma").$Enums.TipoUsuario;
        ativo: boolean;
        id: number;
        name: string | null;
        deleted_at: Date | null;
        created_at: Date;
        updated_at: Date;
    })[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
}>;
//# sourceMappingURL=UserRepository.d.ts.map
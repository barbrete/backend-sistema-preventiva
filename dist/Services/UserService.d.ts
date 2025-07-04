export declare const createUser: (email: string, nome: string, senha: string, tipo: any) => Promise<{
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
export declare const getUserById: (id: number) => Promise<{
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
}>;
export declare const getUserByEmail: (email: string) => Promise<{
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
export declare const getAllUsers: () => Promise<({
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
export declare const getActiveUsers: () => Promise<({
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
export declare const getUsersByTipo: (tipo: any) => Promise<({
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
export declare const updateUser: (id: number, email?: string, name?: string, senha?: string, tipo?: any, ativo?: boolean) => Promise<{
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
export declare const desativarUser: (id: number) => Promise<{
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
export declare const ativateUser: (id: number) => Promise<{
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
export declare const deleteUser: (id: number) => Promise<void>;
export declare const getUsersWithPagination: (page?: number, limit?: number) => Promise<{
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
export declare const getUserStats: () => Promise<{
    total: number;
    active: number;
    inactive: number;
}>;
//# sourceMappingURL=UserService.d.ts.map
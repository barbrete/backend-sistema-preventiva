export declare const createPreventiva: (nome: string, kilometragem_percorrida: number, irregularidades_encontradas: number, irregularidades_corrigidas: number, descricao: string, user_id: number) => Promise<{
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
export declare const getPreventivaById: (id: number) => Promise<{
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
export declare const getAllPreventivas: () => Promise<({
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
export declare const getPreventivasByUser: (userId: number) => Promise<({
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
export declare const getPreventivasForUserBasedOnRole: (userId: number, userTipo: any) => Promise<({
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
export declare const updatePreventiva: (id: number, userId: number, userTipo: any, nome?: string, kilometragem_percorrida?: number, irregularidades_encontradas?: number, irregularidades_corrigidas?: number, descricao?: string) => Promise<{
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
export declare const deletePreventiva: (id: number, userId: number, userTipo: any) => Promise<void>;
export declare const getPreventivasWithPagination: (page?: number, limit?: number) => Promise<{
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
export declare const getPreventivasByUserWithPagination: (userId: number, page?: number, limit?: number) => Promise<{
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
export declare const getPreventivaStats: (userId?: number) => Promise<{
    total: number;
    user_id: number;
} | {
    total: number;
    user_id?: undefined;
}>;
//# sourceMappingURL=PreventivaService.d.ts.map
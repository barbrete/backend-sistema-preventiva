export declare const autenticarUsuario: (email: string, password: string) => Promise<{
    usuario: {
        email: string;
        tipo: import("../../generated/prisma").$Enums.TipoUsuario;
        ativo: boolean;
        id: number;
        name: string | null;
        deleted_at: Date | null;
        created_at: Date;
        updated_at: Date;
    };
    token: string;
} | null>;
//# sourceMappingURL=AuthService.d.ts.map
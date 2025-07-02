-- CreateEnum
CREATE TYPE "TipoFoto" AS ENUM ('ANTES', 'DEPOIS');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'TECNICO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL DEFAULT 'TECNICO',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preventiva" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "kilometragem_percorrida" INTEGER NOT NULL,
    "irregularidades_encontradas" INTEGER NOT NULL,
    "irregularidades_corrigidas" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preventiva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" "TipoFoto" NOT NULL,
    "preventiva_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Preventiva" ADD CONSTRAINT "Preventiva_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_preventiva_id_fkey" FOREIGN KEY ("preventiva_id") REFERENCES "Preventiva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

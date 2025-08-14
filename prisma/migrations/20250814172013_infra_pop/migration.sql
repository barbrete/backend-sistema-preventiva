-- CreateEnum
CREATE TYPE "TipoPreventiva" AS ENUM ('CTO', 'POP');

-- AlterTable
ALTER TABLE "Foto" ADD COLUMN     "descricao" TEXT;

-- AlterTable
ALTER TABLE "Preventiva" ADD COLUMN     "tipo" "TipoPreventiva" NOT NULL DEFAULT 'CTO';

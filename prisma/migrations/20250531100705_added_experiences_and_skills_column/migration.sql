-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "experiences" JSONB,
ADD COLUMN     "skills" JSONB,
ADD COLUMN     "summary" TEXT;

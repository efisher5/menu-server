-- AlterTable
ALTER TABLE "recipe" ALTER COLUMN "ingredients" SET NOT NULL,
ALTER COLUMN "ingredients" SET DATA TYPE TEXT,
ALTER COLUMN "instructions" SET NOT NULL,
ALTER COLUMN "instructions" SET DATA TYPE TEXT;

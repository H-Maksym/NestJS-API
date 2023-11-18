/*
  Warnings:

  - You are about to drop the column `email` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tokens_email_key";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "email",
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "roles" "E_UserRole"[] DEFAULT ARRAY['USER']::"E_UserRole"[];

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

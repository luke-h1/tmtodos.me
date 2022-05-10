/*
  Warnings:

  - You are about to drop the column `Body` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `Completed` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `body` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_Email_key";

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "Body",
DROP COLUMN "Completed",
DROP COLUMN "CreatedAt",
DROP COLUMN "Title",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "completed" BOOLEAN NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "CreatedAt",
DROP COLUMN "Email",
DROP COLUMN "FirstName",
DROP COLUMN "LastName",
DROP COLUMN "Password",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

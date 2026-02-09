/*
  Warnings:

  - You are about to drop the column `uploadedBy` on the `Document` table. All the data in the column will be lost.
  - Added the required column `uploadedById` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedByRole` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentVisibility" AS ENUM ('PRIVATE', 'SHARED');

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "uploadedBy",
ADD COLUMN     "uploadedById" TEXT NOT NULL,
ADD COLUMN     "uploadedByRole" "Role" NOT NULL,
ADD COLUMN     "visibility" "DocumentVisibility" NOT NULL;

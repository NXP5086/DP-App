/*
  Warnings:

  - A unique constraint covering the columns `[joinCode]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripId,userId]` on the table `TripGuest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinCode` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "joinCode" TEXT NOT NULL,
ADD COLUMN     "organizerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trip_joinCode_key" ON "Trip"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "TripGuest_tripId_userId_key" ON "TripGuest"("tripId", "userId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

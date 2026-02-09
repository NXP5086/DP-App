-- CreateEnum
CREATE TYPE "TravelType" AS ENUM ('FLIGHT', 'STAY', 'TRANSFER');

-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('SHARED', 'PRIVATE', 'OTHER');

-- CreateTable
CREATE TABLE "TravelItem" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TravelType" NOT NULL,
    "airline" TEXT,
    "flightNumber" TEXT,
    "departureDateTime" TIMESTAMP(3),
    "arrivalDateTime" TIMESTAMP(3),
    "hotelName" TEXT,
    "roomNumber" TEXT,
    "checkIn" TIMESTAMP(3),
    "checkOut" TIMESTAMP(3),
    "airportDepartureDateTime" TIMESTAMP(3),
    "hotelDepartureDateTime" TIMESTAMP(3),
    "transferType" "TransferType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TravelItem_tripId_idx" ON "TravelItem"("tripId");

-- CreateIndex
CREATE INDEX "TravelItem_userId_idx" ON "TravelItem"("userId");

-- AddForeignKey
ALTER TABLE "TravelItem" ADD CONSTRAINT "TravelItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelItem" ADD CONSTRAINT "TravelItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

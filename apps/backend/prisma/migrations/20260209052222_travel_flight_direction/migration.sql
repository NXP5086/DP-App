-- CreateEnum
CREATE TYPE "FlightDirection" AS ENUM ('ARRIVAL', 'DEPARTURE');

-- AlterTable
ALTER TABLE "TravelItem" ADD COLUMN     "flightDirection" "FlightDirection";

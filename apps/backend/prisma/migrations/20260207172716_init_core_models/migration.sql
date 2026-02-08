-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactMethod" TEXT NOT NULL,
    "note" TEXT,
    "interestType" TEXT NOT NULL,
    "interestTitle" TEXT NOT NULL,
    "anonymousSession" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripGuest" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripGuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineItem" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "visibility" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimelineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConciergeMessage" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConciergeMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TripGuest" ADD CONSTRAINT "TripGuest_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineItem" ADD CONSTRAINT "TimelineItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

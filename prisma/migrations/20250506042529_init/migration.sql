-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "picture" TEXT,
    "fullName" TEXT,
    "headLine" TEXT,
    "email" TEXT,
    "website" TEXT,
    "phoneNumber" INTEGER,
    "location" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

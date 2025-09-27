-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'FIELD_WORKER', 'OWNER', 'GOVERNMENT_OFFICIAL', 'USER');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."animals" (
    "id" TEXT NOT NULL,
    "ownerAadhaar" TEXT NOT NULL,
    "ownerName" TEXT,
    "breed" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,
    "physicalMarks" TEXT,
    "photoUrl" TEXT,
    "detectedBreed" TEXT,
    "detectedImageBase64" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vaccinations" (
    "id" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "vaccineName" TEXT NOT NULL,
    "dateAdministered" TIMESTAMP(3) NOT NULL,
    "batchNumber" TEXT,
    "notes" TEXT,
    "ownerAadhaar" TEXT NOT NULL,
    "vaccineType" TEXT NOT NULL,
    "nextDueDate" TIMESTAMP(3),
    "veterinarian" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."breeding_records" (
    "id" TEXT NOT NULL,
    "femaleAnimalId" TEXT NOT NULL,
    "maleAnimalId" TEXT,
    "breedingDate" TIMESTAMP(3) NOT NULL,
    "veterinarian" TEXT,
    "notes" TEXT,
    "ownerAadhaar" TEXT NOT NULL,
    "breedingMethod" TEXT NOT NULL,
    "expectedDeliveryDate" TIMESTAMP(3),
    "aiDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "breeding_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."health_issues" (
    "id" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,
    "dateReported" TIMESTAMP(3) NOT NULL,
    "symptoms" TEXT NOT NULL,
    "treatment" TEXT,
    "veterinarian" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_issues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."vaccinations" ADD CONSTRAINT "vaccinations_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."breeding_records" ADD CONSTRAINT "breeding_records_femaleAnimalId_fkey" FOREIGN KEY ("femaleAnimalId") REFERENCES "public"."animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."breeding_records" ADD CONSTRAINT "breeding_records_maleAnimalId_fkey" FOREIGN KEY ("maleAnimalId") REFERENCES "public"."animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."health_issues" ADD CONSTRAINT "health_issues_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

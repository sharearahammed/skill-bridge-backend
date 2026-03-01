-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_tutorId_fkey";

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

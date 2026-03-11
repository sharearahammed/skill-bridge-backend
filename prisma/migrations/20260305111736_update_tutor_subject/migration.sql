-- DropForeignKey
ALTER TABLE "TutorSubject" DROP CONSTRAINT "TutorSubject_tutorId_fkey";

-- AddForeignKey
ALTER TABLE "TutorSubject" ADD CONSTRAINT "TutorSubject_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

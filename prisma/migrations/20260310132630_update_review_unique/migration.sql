/*
  Warnings:

  - A unique constraint covering the columns `[studentId,tutorId,categoryId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_studentId_tutorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_studentId_tutorId_categoryId_key" ON "Review"("studentId", "tutorId", "categoryId");

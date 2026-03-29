-- AlterTable
ALTER TABLE "user" ADD COLUMN     "resetOtp" TEXT,
ADD COLUMN     "resetOtpExpiresAt" TIMESTAMP(3);

/*
  Warnings:

  - You are about to drop the column `authority` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "authority",
DROP COLUMN "paidAt",
DROP COLUMN "provider",
DROP COLUMN "transactionId",
ADD COLUMN     "adminNote" TEXT,
ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'manual',
ADD COLUMN     "receiptImage" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedBy" TEXT,
ADD COLUMN     "trackingCode" TEXT,
ALTER COLUMN "status" SET DEFAULT 'pending_review';

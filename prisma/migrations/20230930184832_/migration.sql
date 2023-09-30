/*
  Warnings:

  - The values [COMPLETED] on the enum `BetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BetStatus_new" AS ENUM ('PENDING', 'WON', 'LOST');
ALTER TABLE "bet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "bet" ALTER COLUMN "status" TYPE "BetStatus_new" USING ("status"::text::"BetStatus_new");
ALTER TYPE "BetStatus" RENAME TO "BetStatus_old";
ALTER TYPE "BetStatus_new" RENAME TO "BetStatus";
DROP TYPE "BetStatus_old";
ALTER TABLE "bet" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

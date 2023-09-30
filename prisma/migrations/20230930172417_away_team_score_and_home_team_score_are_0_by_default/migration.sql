/*
  Warnings:

  - Made the column `homeTeamScore` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `awayTeamScore` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "game" ALTER COLUMN "homeTeamScore" SET NOT NULL,
ALTER COLUMN "homeTeamScore" SET DEFAULT 0,
ALTER COLUMN "awayTeamScore" SET NOT NULL,
ALTER COLUMN "awayTeamScore" SET DEFAULT 0;

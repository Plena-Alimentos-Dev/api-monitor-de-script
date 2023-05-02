/*
  Warnings:

  - You are about to drop the column `function` on the `Script` table. All the data in the column will be lost.
  - Added the required column `func` to the `Script` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Script" DROP COLUMN "function",
ADD COLUMN     "func" TEXT NOT NULL;

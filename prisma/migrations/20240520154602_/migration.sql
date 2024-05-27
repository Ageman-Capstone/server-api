/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Tari` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Tari` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tari` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tari_slug_key` ON `Tari`(`slug`);

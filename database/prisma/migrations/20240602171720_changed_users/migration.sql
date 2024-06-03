/*
  Warnings:

  - Made the column `createdAt` on table `chats` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `bio` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followers` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_of_posts` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "followers" TEXT NOT NULL,
ADD COLUMN     "following" TEXT NOT NULL,
ADD COLUMN     "no_of_posts" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

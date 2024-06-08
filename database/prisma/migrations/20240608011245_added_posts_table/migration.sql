/*
  Warnings:

  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_info";

-- CreateTable
CREATE TABLE "user_details" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "f_name" TEXT NOT NULL,
    "l_name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "website_url" TEXT,
    "location" TEXT,
    "birth_date" TIMESTAMP(3),
    "followers" TEXT[],
    "following" TEXT[],

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "posts_metada" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_metada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_user_id_key" ON "user_details"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_username_key" ON "user_details"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_email_key" ON "user_details"("email");

-- AddForeignKey
ALTER TABLE "posts_metada" ADD CONSTRAINT "posts_metada_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_details"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

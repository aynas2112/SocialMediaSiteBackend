/*
  Warnings:

  - You are about to drop the `posts_metada` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts_metada" DROP CONSTRAINT "posts_metada_user_id_fkey";

-- DropTable
DROP TABLE "posts_metada";

-- CreateTable
CREATE TABLE "posts_metadata" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_metadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts_metadata" ADD CONSTRAINT "posts_metadata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_details"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

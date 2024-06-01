-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "chat_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

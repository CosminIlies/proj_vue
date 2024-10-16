-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_incarcare" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nume_fisier" TEXT NOT NULL,
    "marime_fisier" INTEGER NOT NULL
);

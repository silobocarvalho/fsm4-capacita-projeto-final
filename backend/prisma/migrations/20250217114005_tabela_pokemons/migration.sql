-- CreateEnum
CREATE TYPE "Raridade" AS ENUM ('Comum', 'Raro', 'MuitoRaro', 'Lendario', 'Ultrararo', 'Desconhecido');

-- CreateTable
CREATE TABLE "pokemons" (
    "id_pokemon" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "raridade" "Raridade" NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id_pokemon")
);

CREATE DATABASE POKEMON_DB;

CREATE TABLE POKEMON(
    ID_POKEMON SERIAL PRIMARY KEY,
    NOME VARCHAR(100) NOT NULL,
    TIPO VARCHAR(100) NOT NULL,
    RARIDADE INT,
    PRECO DECIMAL(10, 2) NOT NULL
) CREATE TABLE VENDAS(
    ID_VENDA SERIAL PRIMARY KEY,
    ID_POKEMON INT,
    PRECO DECIMAL(10, 2) NOT NULL,
    QUANTIDADE INT NOT NULL,
    FOREIGN KEY(ID_POKEMON) REFERENCES POKEMON(ID_POKEMON) ON DELETE CASCADE
) INSERT INTO POKEMON (
    NOME,
    TIPO,
    RARIDADE,
    PRECO
) VALUES (
    'Pikachu',
    'Elétrico',
    20,
    100.50
),
(
    'Snorlax',
    'Sono',
    5,
    2000
),
(
    'Charizard',
    'Fogo',
    4,
    2500
)
 -- Exemplo de JOIN
    SELECT
        POKEMON.NOME,
        POKEMON.PRECO AS PRECO_ORIGINAL,
        VENDAS.PRECO AS PRECO_VENDA,
        VENDAS.QUANTIDADE
    FROM
        VENDAS
        JOIN POKEMON
        ON VENDAS.ID_POKEMON = POKEMON.ID_POKEMON
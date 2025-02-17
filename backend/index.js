const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// GET pokemons --> Liste todos os pokemons!
app.get('/pokemons', async (req, res) => {
    const todosPokemons = await prisma.pokemons.findMany(); // Similar ao "Select * from pokemons"
    res.json(todosPokemons);
});

// POST pokemons --> Adicionar um novo pokemon!
app.post('/pokemons', async (req, res) => {
    // nome tipo raridade e preço
    const { nome, tipo, raridade, preco } = req.body;
    try {
        // Será convertido para um INSERT INTO pokemons
        const pokemonCriado = await prisma.pokemons.create({
            data: {
                nome,
                tipo,
                raridade,
                preco,
            },
        });
        res.json(pokemonCriado);
    } catch (e) {
        console.log(e);
        res.json(`Deu erro, que pena! :-( :::::::: ${e} `)
    }

});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
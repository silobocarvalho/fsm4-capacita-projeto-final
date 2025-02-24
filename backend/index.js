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

// GET algumacoisa --> Testes!
app.get('/algumacoisa', async (req, res) => {
    const pokemonsDb = await prisma.pokemons.findMany({
        orderBy: {
            preco: 'asc'
        }
    })
    res.json(pokemonsDb);
});

// PUT pokemons/:id --> Atualizar um pokemon específico!
app.put('/pokemons/:id', async (req, res) => {
    //Descobrir qual Pokemon
    const {id} = req.params;

    const { nome, tipo, raridade, preco, img_url } = req.body;

    console.log(`ID Pokemon ${id}`)
    console.log(`Novos dados Pokemon ${nome} | ${tipo} | ${raridade} | ${preco} | ${img_url}`)

    try{
        const pokemonAlterado = await prisma.pokemons.update({
            where: {id_pokemon: id},
            data: {
                nome,
                tipo,
                raridade,
                preco,
                img_url
            }
        })
        res.json(pokemonAlterado)

    }catch(e){
        console.log(e)
        res.json(`Deu erro, que pena! :-( :::::::: ${e} `)
    }
});

app.delete('/pokemons/:id', async (req, res) => {
    console.log('entrou no delete!')
    const {id} = req.params;

    try{
        const pokemonDeletado = await prisma.pokemons.delete({
            where: {id_pokemon: id}
        })
        res.json(pokemonDeletado)
    }catch(e){
        console.log(e)
        res.json(`Deu erro, que pena! :-( :::::::: ${e} `)
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
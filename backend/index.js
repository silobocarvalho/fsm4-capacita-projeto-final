const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors())

// GET pokemons --> Liste todos os pokemons!
app.get('/pokemons', async (req, res) => {
    //const todosPokemons = await prisma.pokemons.findMany(); // Similar ao "Select * from pokemons"

    // A segunda opção é retornar somente alguns atributos do Pokemon:
    // * 1. Filtrando no banco de dados: 
      
    
    const todosPokemons = await prisma.pokemons.findMany({
        // vai ser convertido para o comando SQL: SELECT id_pokemon, nome, preco, estoque, tipo, raridade, url_img FROM pokemons    
        select: {  
                id_pokemon: true,
                nome: true,
                tipo: true,
                raridade: true,
                preco: true,
                img_url: true
            }
        });

        //Poderia filtrar se temos URLs inválidas para as imagens.
        
        res.json(todosPokemons);

     /*
        // 2. Filtrando com Map
        const pokemonsFiltrados = todosPokemons.map(pokemon => ({
            id_pokemon: pokemon.id_pokemon,
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            raridade: pokemon.raridade,
            preco: pokemon.preco,
            img_url: pokemon.img_url,
        }));
        res.json(pokemonsFiltrados);
        */
    
});

// POST pokemons --> Adicionar um novo pokemon!
app.post('/pokemons', async (req, res) => {
    // nome tipo raridade e preço
    const { nome, tipo, raridade, preco, img_url } = req.body;
    try {
        // Será convertido para um INSERT INTO pokemons
        const pokemonCriado = await prisma.pokemons.create({
            data: {
                nome,
                tipo,
                raridade,
                preco,
                img_url
            },
        });
        res.status(201).json(pokemonCriado)
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

app.get('/pokemons/populate', async (req, res) => {

    try {
        const pokemonsCriados = await prisma.pokemons.createMany({
            data: [
                {nome: 'Pikachu', tipo: 'Eletrico', raridade: 'Comum', preco: 300, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'},
                {nome: 'Charmander', tipo: 'Fogo', raridade: 'Comum', preco: 200, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'},
                {nome: 'Squirtle', tipo: 'Agua', raridade: 'Comum', preco: 200, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'},
                {nome: 'Bulbasaur', tipo: 'Planta', raridade: 'Comum', preco: 200, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'},
                {nome: 'Mewtwo', tipo: 'Psiquico', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'},
                {nome: 'Mew', tipo: 'Psiquico', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'},
                {nome: 'Gengar', tipo: 'Fantasma', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png'},
                {nome: 'Gyarados', tipo: 'Agua', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png'},
                {nome: 'Dragonite', tipo: 'Dragão', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png'},
                {nome: 'Machamp', tipo: 'Lutador', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png'},
                {nome: 'Alakazam', tipo: 'Psiquico', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png'},
                {nome: 'Venusaur', tipo: 'Planta', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'},
                {nome: 'Blastoise', tipo: 'Agua', raridade: 'Raro', preco: 1000, img_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'}
            ],
        });
        res.json(pokemonsCriados);
    } catch (e) {
        console.log(e);
        res.json(`Deu erro, que pena! :-( :::::::: ${e} `)
    }
});


const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, server };
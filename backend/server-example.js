//npm install express cors
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(cors());

// Rota de exemplo
app.get('/', (req, res) => {
  res.json({ message: 'Servidor Node.js rodando com sucesso!' });
});

// Rota para listar produtos (exemplo)
app.get('/produtos', (req, res) => {
  const produtos = [
    { id: 1, nome: 'Produto 1', preco: 100 },
    { id: 2, nome: 'Produto 2', preco: 200 }
  ];
  res.json(produtos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
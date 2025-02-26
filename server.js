// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Configuração de CORS
app.use(cors());

// Middleware para leitura do corpo da requisição
app.use(express.json());

// Rotas de pagamento

// Rotas de autenticação
app.use('/auth', authRoutes);

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definir porta
const PORT = process.env.PORT || 5001;

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta: ${PORT}`);
});


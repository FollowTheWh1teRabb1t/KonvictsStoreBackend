// Importa o arquivo de configuração do knex
const knexConfig = require('../../../knexfile'); // Caminho correto para o seu arquivo de configuração do Knex
const knex = require('knex');

// Cria a conexão com o banco usando a configuração de desenvolvimento
const connection = knex(knexConfig.development);

module.exports = connection;

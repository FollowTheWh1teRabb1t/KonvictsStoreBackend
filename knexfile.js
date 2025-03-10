require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/database.sqlite',
    },
    migrations: {
      directory: './src/database/knex/migrations',
    },
    seeds: {
      directory: './src/database/knex/seeds', // Caminho para as seeds no ambiente de desenvolvimento
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, // Pegando do ambiente
    migrations: {
      directory: './src/database/knex/migrations',
    },
    seeds: {
      directory: './src/database/knex/seeds', // Caminho para as seeds no ambiente de produção
    },
    ssl: { rejectUnauthorized: false }, // Importante para Render
  },
};

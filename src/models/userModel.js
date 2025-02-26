const db = require('../database/knex');

// Função para criar um novo usuário
const createUser = async (userName, email, hashedPassword) => {
    try {
        const [userId] = await db('users').insert({
            userName,  // Use "userName" se o campo na tabela for "userName"
            email,
            password: hashedPassword
        }).returning('id'); // Retorna o ID do usuário criado
        return userId;
    } catch (err) {
        throw err; // Lança o erro para que seja tratado na rota
    }
};

// Função para encontrar um usuário pelo e-mail
const findUserByEmail = async (email) => {
    try {
        const user = await db('users').where({ email }).first();
        return user; // Retorna o usuário encontrado ou undefined
    } catch (err) {
        throw err; // Lança o erro para que seja tratado na rota
    }
};

module.exports = {
    createUser,
    findUserByEmail
};

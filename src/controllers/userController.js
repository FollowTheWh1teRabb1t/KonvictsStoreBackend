const db = require('../database/knex');

const createUser = async (userName, email, hashedPassword) => {
    try {
        const [userId] = await db('users').insert({
            userName,
            email,
            password: hashedPassword
        }).returning('id');
        return userId
    } catch (err) {
        throw err
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await db('users').where({ email }).first();
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    findUserByEmail
}
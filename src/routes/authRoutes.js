const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const db = require('../database/knex/index');
const AppError = require('../utils/AppError');
const { createUser, findUserByEmail } = require('../controllers/userController');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const router = express.Router();

// Verifica se a variável de ambiente existe
if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET não definida no arquivo .env!");
}

// Rota de perfil
router.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await db('users').select('id', 'userName', 'email', 'profileImage').where({ id: userId }).first();
        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }
        res.json({ user });
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        console.error("Erro ao buscar o perfil do usuário:", err);
        return res.status(500).json({ error: 'Erro ao buscar o perfil do usuário.' });
    }
});

// Rota de upload de imagem de perfil
router.post('/upload-profile-image', authenticateToken, upload.single('profileImage'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
    }

    const userId = req.user.id;
    const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;

    try {
        await db('users').where({ id: userId }).update({ profileImage: imageUrl });
        res.json({ profileImage: imageUrl });
    } catch (err) {
        console.error("Erro ao salvar a imagem no banco de dados:", err);
        return res.status(500).json({ error: 'Erro ao salvar a imagem no banco de dados' });
    }
});

// Rota de registro
router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Usuário já existe.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Senha hashada ao cadastrar:', hashedPassword);

        const userId = await createUser(userName, email, hashedPassword);
        res.status(201).json({ id: userId, userName, email });
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Gerar o token JWT
        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token: jwtToken,
            userData: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        return res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

module.exports = router;

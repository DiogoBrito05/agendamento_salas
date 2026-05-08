const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/database');
const authConfig =require('../config/auth');



async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: 'Email e senha são obrigatórios'
            });
        }

        const usuario = await db.get(`
            SELECT *
            FROM usuarios
            WHERE email = ?
            `, [email]);


        const senhaValida =
        await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!usuario || !senhaValida) {
        return res.status(401).json({
            erro: 'Email ou senha inválidos'
        });
        }

        // gera token
        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            authConfig.jwt.secret,
            {
                expiresIn: '1d'
            }
        );

        res.json({ usuario, token });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao realizar login'
        });
    }
}

module.exports = {
    login
};
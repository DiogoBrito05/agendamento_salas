const jwt = require('jsonwebtoken');

const authConfig =
    require('../config/auth');

function autenticacao(req, res, next) {

    try {
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                erro: 'Token não enviado'
            });
        }

        const [, token] =
            authHeader.split(' ');

        const decoded = jwt.verify(
            token,
            authConfig.jwt.secret
        );

        req.usuarioId = decoded.id;

        next();

    } catch (erro) {

        return res.status(401).json({
            erro: 'Token inválido'
        });

    }
}

module.exports = autenticacao;
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');

// Rota pública para cadastro de usuário
router.post('/', UsuarioController.cadastrar);

// Rota protegida para perfil do usuário logado
router.get('/me', AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

module.exports = router;


const express = require('express');
const router = express.Router();
const AutenticacaoController = require('../controllers/autenticacao.controller');

// Login - gera token de acesso e refresh token
router.post('/login', AutenticacaoController.login);

// Renovar token de acesso usando refresh token
router.post('/refresh-token', AutenticacaoController.refreshToken);

// Logout - limpa o refresh token do cookie
router.post('/logout', AutenticacaoController.sair);

module.exports = router;

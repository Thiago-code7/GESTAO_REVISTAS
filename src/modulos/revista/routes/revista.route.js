const express = require('express');
const router = express.Router();
const revistaController = require('../controllers/revista.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

// GET /revistas - Listar revistas (usuário autenticado)
router.get('/', AutenticacaoMiddleware.autenticarToken, revistaController.listarRevistas);

// GET /revistas/:id - Detalhes da revista (usuário autenticado)
router.get('/:id', AutenticacaoMiddleware.autenticarToken, revistaController.detalharRevista);

// POST /revistas - Criar revista (somente funcionário ou admin)
router.post('/', 
  AutenticacaoMiddleware.autenticarToken, 
  AutorizacaoMiddleware.funcionarioOuAdmin, 
  revistaController.criarRevista
);

// PUT /revistas/:id - Atualizar revista (somente funcionário ou admin)
router.put('/:id', 
  AutenticacaoMiddleware.autenticarToken, 
  AutorizacaoMiddleware.funcionarioOuAdmin, 
  revistaController.atualizarRevista
);

// DELETE /revistas/:id - Excluir revista (somente funcionário ou admin)
router.delete('/:id', 
  AutenticacaoMiddleware.autenticarToken, 
  AutorizacaoMiddleware.funcionarioOuAdmin, 
  revistaController.excluirRevista
);

module.exports = router;

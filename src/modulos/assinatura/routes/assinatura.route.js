const express = require('express');
const router = express.Router();
const controller = require('../controllers/assinatura.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

// Listar assinaturas do usuário (próprio usuário)
router.get('/', AutenticacaoMiddleware.autenticarToken, controller.listar);

// Detalhes da assinatura (somente dono)
router.get('/:id', 
  AutenticacaoMiddleware.autenticarToken, 
  AutorizacaoMiddleware.apenasDonoDaAssinatura, 
  controller.buscar
);

// Criar assinatura (próprio usuário)
router.post('/', AutenticacaoMiddleware.autenticarToken, controller.criar);

// Atualizar assinatura (somente dono)
router.put('/:id', 
  AutenticacaoMiddleware.autenticarToken, 
  AutorizacaoMiddleware.apenasDonoDaAssinatura, 
  controller.atualizar
);

// Cancelar assinatura (somente dono)
router.delete('/:id', 
  AutenticacaoMiddleware.autenticarToken, 
  AutorizacaoMiddleware.apenasDonoDaAssinatura, 
  controller.deletar
);

module.exports = router;

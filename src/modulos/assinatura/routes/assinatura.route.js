const express = require('express');
const router = express.Router();
const AssinaturaController = require('../controllers/assinatura.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

// Listar assinaturas do usuário autenticado (próprio usuário)
router.get(
  '/',
  AutenticacaoMiddleware.autenticarToken,
  AssinaturaController.listar
);

// Detalhes da assinatura (somente dono)
router.get(
  '/:id',
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(['funcionario']),
  AssinaturaController.listar
);

// Criar assinatura (próprio usuário)
router.post(
  '/',
  AutenticacaoMiddleware.autenticarToken,
  AssinaturaController.criar,
);

// Atualizar assinatura (somente dono)
router.put(
  '/:id',
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(['funcionario']),
  AssinaturaController.atualizar
);

// Cancelar assinatura (somente dono)
router.delete(
  '/:id',
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(['funcionario']),
  AssinaturaController.deletar
);

module.exports = router;

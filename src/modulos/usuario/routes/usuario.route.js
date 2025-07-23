const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuario.controller");
const AutenticacaoMiddleware = require("../../../middleware/autenticacao.middleware");
const AutorizacaoMiddleware = require("../../../middleware/autorizacao.middleware");

// Rota pública para cadastro de usuário (papel padrão assinante)
router.post("/", UsuarioController.cadastrar);

// ✅ NOVA ROTA: login
router.post("/login", UsuarioController.login);

// Rota protegida para cadastro de usuários com papel customizado (só admin)
router.post(
  "/admin",
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(['funcionario']),
  UsuarioController.cadastrarAdmin
);

// Rota protegida para perfil do usuário logado
router.get("/me", AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

module.exports = router;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const Usuario = require("../../usuario/models/usuario.model");

// Pegando os tempos corretos das variáveis de ambiente
const tempo_acess_token = process.env.JWT_ACCESS_EXPIRES_IN;
const tempo_refresh_token = process.env.JWT_REFRESH_EXPIRES_IN;

class AutenticacaoController {
  // Gerar token de acesso
  static gerarTokenAcesso(dadosUsuario) {
    return jwt.sign(dadosUsuario, process.env.SECRET_KEY, {
      expiresIn: tempo_acess_token,
    });
  }

  // Gerar refresh token
  static gerarRefressToken(dadosUsuario) {
    return jwt.sign(dadosUsuario, process.env.REFRESH_SECRET_KEY, {
      expiresIn: tempo_refresh_token,
    });
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res
          .status(400)
          .json({ msg: "É necessário informar email e senha para login" });
      }

      const usuario = await Usuario.findOne({
        where: { email },
      });

      if (!usuario) {
        return res.status(401).json({ msg: "Usuário não encontrado!" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(400).json({ msg: "E-mail ou senha incorreto!" });
      }

      // Aqui inclui o id junto com os outros dados
      const dadosUsuario = {
        id: usuario.id,        // <<< adicionado
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
      };

      // Gerar os tokens
      const tokenAcesso = AutenticacaoController.gerarTokenAcesso(dadosUsuario);
      const refreshToken = AutenticacaoController.gerarRefressToken(dadosUsuario);

      // Enviar refresh token como cookie seguro e HttpOnly
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 dia
      });

      res.status(200).json({
        msg: "Usuário logado com sucesso",
        tokenAcesso,
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno do servidor. Por favor tente mais tarde.",
        erro: error.message,
      });
    }
  }

  // Renovar refresh token
  static refreshToken(req, res) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).json({ msg: "Refresh token inválido!" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY,
      (erro, usuario) => {
        if (erro) {
          return res.status(403).json({ msg: "Refresh token inválido!" });
        }
        const dadosUsuario = {
          id: usuario.id,       // <<< adiciona aqui também
          nome: usuario.nome,
          email: usuario.email,
          papel: usuario.papel,
        };

        const novoTokenAcesso = this.gerarTokenAcesso(dadosUsuario);
        res.status(200).json({ tokenAcesso: novoTokenAcesso });
      }
    );
  }

  static async sair(req, res) {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      res.status(200).json({ msg: "Logout realizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno do servidor. Por favor, tente mais tarde.",
        erro: error.message,
      });
    }
  }
}

module.exports = AutenticacaoController;

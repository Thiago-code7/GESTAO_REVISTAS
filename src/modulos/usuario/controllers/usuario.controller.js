const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

class UsuarioController {
  // Cadastro público (permite papel via req.body, mas valida e assume "assinante" se inválido/ausente)
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, papel } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
      }

      const existe = await Usuario.findOne({ where: { email } });
      if (existe) {
        return res.status(409).json({ msg: "Email já cadastrado." });
      }

      // Verifica papel enviado, se válido usa, senão assume "assinante"
      const papeisValidos = ["assinante", "funcionário", "admin"];
      const papelFinal = papeisValidos.includes(papel) ? papel : "assinante";

      const senhaHash = await bcrypt.hash(senha, 12);
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        papel: papelFinal
      });

      res.status(201).json({
        msg: "Cadastro realizado com sucesso",
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          papel: novoUsuario.papel,
        }
      });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar usuário", detalhes: error.message });
    }
  }

  // Cadastro restrito para uso por administradores
  static async cadastrarAdmin(req, res) {
    try {
      const { nome, email, senha, papel } = req.body;

      if (!nome || !email || !senha || !papel) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
      }

      const papeisValidos = ["assinante", "funcionario", "admin"];
      if (!papeisValidos.includes(papel)) {
        return res.status(400).json({ msg: "Papel inválido. Use 'assinante', 'funcionario' ou 'admin'." });
      }

      const existe = await Usuario.findOne({ where: { email } });
      if (existe) {
        return res.status(409).json({ msg: "Email já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 12);
      const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash, papel });

      res.status(201).json({
        msg: "Cadastro realizado com sucesso",
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          papel: novoUsuario.papel,
        }
      });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao cadastrar usuário", detalhes: error.message });
    }
  }

  // Login
  static async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios." });
    }

    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ msg: "Senha incorreta." });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          papel: usuario.papel
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1d" }
      );

      return res.status(200).json({
        msg: "Login realizado com sucesso.",
        token
      });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao fazer login", detalhes: error.message });
    }
  }

  // Perfil autenticado
  static async perfil(req, res) {
    try {
      const usuarioId = req.usuario?.id;
      if (!usuarioId) {
        return res.status(400).json({ erro: "ID do usuário não informado no token." });
      }

      const usuario = await Usuario.findByPk(usuarioId, {
        attributes: { exclude: ["senha"] }
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar perfil do usuário." });
    }
  }
}

module.exports = UsuarioController;


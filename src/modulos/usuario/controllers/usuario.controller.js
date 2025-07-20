const bcrypt = require('bcrypt');
const Usuario = require("../models/usuario.model");

class UsuarioController {
    // Cadastrar novo usuário
  static async cadastrar(req, res) {
  try {
    const { nome, email, senha, papel } = req.body;
    const senhaCriptografada = await bcrypt.hash(senha, 12);
    await Usuario.create({ nome, email, senha: senhaCriptografada, papel });
    res.status(201).json({ msg: 'Cadastro realizado com sucesso' });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
}

    // Perfil do usuário
    static async perfil(req, res) {
        try {
            // Supondo que o ID do usuário está em req.params.id ou req.user.id (ajuste conforme sua autenticação)
            const usuarioId = req.params.id
            if (!usuarioId) {
                return res.status(400).json({ erro: "ID do usuário não informado." });
            }
            const usuario = await Usuario.findByPk(usuarioId, {
                attributes: { 
                    exclude: ["senha"] 
                }
            });
            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado." });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao buscar perfil do usuário." });
        }
    }
}

module.exports = UsuarioController;
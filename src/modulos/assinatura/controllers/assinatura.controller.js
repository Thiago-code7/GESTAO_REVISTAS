const Assinatura = require('../models/assinatura.model');

module.exports = {
  // Listar todas as assinaturas do usuário autenticado
  async listar(req, res) {
    try {
      const assinaturas = await Assinatura.findAll({
        where: { usuarioId: req.usuario.id }
      });
      res.status(200).json(assinaturas);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar assinaturas", detalhes: error.message });
    }
  },

  // Buscar detalhes de uma assinatura específica
  async buscar(req, res) {
    try {
      const { id } = req.params;
      const assinatura = await Assinatura.findByPk(id);
      if (!assinatura) {
        return res.status(404).json({ erro: 'Assinatura não encontrada' });
      }
      if (assinatura.usuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Acesso negado: assinatura de outro usuário' });
      }
      res.status(200).json(assinatura);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar assinatura", detalhes: error.message });
    }
  },

  // Criar nova assinatura
  async criar(req, res) {
    try {
      const novaAssinatura = await Assinatura.create({
        ...req.body,
        usuarioId: req.usuario.id  // sempre forçado do token
      });
      res.status(201).json(novaAssinatura);
    } catch (error) {
      res.status(400).json({ erro: "Erro ao criar assinatura", detalhes: error.message });
    }
  },

  // Atualizar uma assinatura existente
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const assinatura = await Assinatura.findByPk(id);
      if (!assinatura) {
        return res.status(404).json({ erro: 'Assinatura não encontrada' });
      }
      if (assinatura.usuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Acesso negado: assinatura de outro usuário' });
      }

      await assinatura.update(req.body);
      res.status(200).json(assinatura);
    } catch (error) {
      res.status(400).json({ erro: "Erro ao atualizar assinatura", detalhes: error.message });
    }
  },

  // Deletar uma assinatura
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const assinatura = await Assinatura.findByPk(id);
      if (!assinatura) {
        return res.status(404).json({ erro: 'Assinatura não encontrada' });
      }
      if (assinatura.usuarioId !== req.usuario.id) {
        return res.status(403).json({ erro: 'Acesso negado: assinatura de outro usuário' });
      }

      await assinatura.destroy();
      res.status(200).json({ msg: 'Assinatura cancelada com sucesso!' });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao excluir assinatura", detalhes: error.message });
    }
  },
};

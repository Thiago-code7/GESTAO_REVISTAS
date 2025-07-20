const Revista = require('../models/revista.model');

const listarRevistas = async (req, res) => {
  try {
    const revistas = await Revista.findAll();
    res.status(200).json(revistas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar revistas.', detalhes: error.message });
  }
};

const detalharRevista = async (req, res) => {
  try {
    const { id } = req.params;
    const revista = await Revista.findByPk(id);
    if (!revista) {
      return res.status(404).json({ erro: 'Revista não encontrada.' });
    }
    res.status(200).json(revista);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar a revista.', detalhes: error.message });
  }
};

const criarRevista = async (req, res) => {
  const { nome, descricao, categoria, status } = req.body;
  try {
    const novaRevista = await Revista.create({ nome, descricao, categoria, status });
    res.status(201).json(novaRevista);
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        erro: 'Erro de validação',
        detalhes: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ erro: 'Erro ao criar revista.', detalhes: error.message });
  }
};

const atualizarRevista = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, status } = req.body;
  try {
    const revista = await Revista.findByPk(id);
    if (!revista) {
      return res.status(404).json({ erro: 'Revista não encontrada.' });
    }

    await revista.update({ nome, descricao, categoria, status });
    res.status(200).json(revista);
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        erro: 'Erro de validação',
        detalhes: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ erro: 'Erro ao atualizar revista.', detalhes: error.message });
  }
};

const excluirRevista = async (req, res) => {
  const { id } = req.params;
  try {
    const revista = await Revista.findByPk(id);
    if (!revista) {
      return res.status(404).json({ erro: 'Revista não encontrada.' });
    }

    await revista.destroy();
    res.status(200).json({ msg: 'Revista excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir revista.', detalhes: error.message });
  }
};

module.exports = {
  listarRevistas,
  detalharRevista,
  criarRevista,
  atualizarRevista,
  excluirRevista,
};

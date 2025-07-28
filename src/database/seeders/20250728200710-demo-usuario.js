'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaCriptografada = await bcrypt.hash('senha123', 10);

    return queryInterface.bulkInsert('usuario', [
      {
        id: uuidv4(),
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: senhaCriptografada,
        papel: 'assinante',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        senha: senhaCriptografada,
        papel: 'funcionario',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Carlos Souza',
        email: 'carlos.souza@example.com',
        senha: senhaCriptografada,
        papel: 'admin',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Ana Costa',
        email: 'ana.costa@example.com',
        senha: senhaCriptografada,
        papel: 'assinante',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Pedro Santos',
        email: 'pedro.santos@example.com',
        senha: senhaCriptografada,
        papel: 'funcionario',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {});
  },
};


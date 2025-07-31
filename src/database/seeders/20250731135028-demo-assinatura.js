'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('assinatura', [
      {
        id: uuidv4(),
        usuarioid: '7da2f55c-d2f3-47c7-b1f2-e99d8f8f77c7', // Substitua pelo UUID real do usuário
        revistaid: '5a613c3b-1cbe-4c1d-9f91-efa7cd3d27e8', // Substitua pelo UUID real da revista
        data_inicio: new Date('2025-01-10'),
        data_fim: new Date('2026-01-09'),
        status: 'ativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        usuarioid: 'c0585304-e165-47bc-be7b-40347f5cb7cf', // Substitua pelo UUID real do usuário
        revistaid: 'a012adad-5384-454e-aea8-089619a597d5', // Substitua pelo UUID real da revista
        data_inicio: new Date('2025-02-15'),
        data_fim: new Date('2026-02-14'),
        status: 'ativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assinatura', null, {});
  },
};

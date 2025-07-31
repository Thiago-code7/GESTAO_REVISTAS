'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('revista', [
      {
        id: uuidv4(),
        nome: 'Ciência Atual',
        descricao: 'Revista mensal com novidades do mundo científico.',
        categoria: 'Ciência',
        status: 'ativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Estilo & Moda',
        descricao: 'Tendências, dicas e novidades do universo fashion.',
        categoria: 'Moda',
        status: 'ativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Esporte Total',
        descricao: 'Cobertura de esportes nacionais e internacionais.',
        categoria: 'Esportes',
        status: 'ativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Tecnologia Hoje',
        descricao: 'Inovações, gadgets e análises tecnológicas.',
        categoria: 'Tecnologia',
        status: 'ativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
      {
        id: uuidv4(),
        nome: 'Saúde & Bem-Estar',
        descricao: 'Dicas de saúde, alimentação e qualidade de vida.',
        categoria: 'Saúde',
        status: 'inativa',
        criado_em: new Date(),
        atualizado_em: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('revista', null, {});
  },
};

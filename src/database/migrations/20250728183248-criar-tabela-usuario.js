"use strict";

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      papel: {
        type: Sequelize.ENUM("assinante", "funcionario", "admin"),
        allowNull: false,
      },
    });
     // Adicionar índices para otimização
     await queryInterface.addIndex("usuario", ["email"]);
     await queryInterface.addIndex('usuario', ['papel']);
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.dropTable('usuario');
  },
};

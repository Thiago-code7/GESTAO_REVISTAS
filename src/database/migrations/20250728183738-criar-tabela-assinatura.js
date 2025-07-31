"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("assinatura", {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      usuarioId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: "usuario",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      revistaId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: "revista",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      data_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      data_fim: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("ativa", "cancelada", "expirada"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("assinatura");
  },
};
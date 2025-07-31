"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("assinatura", "criado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn("assinatura", "atualizado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("assinatura", "criado_em");
    await queryInterface.removeColumn("assinatura", "atualizado_em");
  },
};
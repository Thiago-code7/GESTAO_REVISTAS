"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("usuario", "criado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn("usuario", "atualizado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("usuario", "criado_em");
    await queryInterface.removeColumn("usuario", "atualizado_em");
  },
};



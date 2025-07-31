"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("revista", "criado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn("revista", "atualizado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("revista", "criado_em");
    await queryInterface.removeColumn("revista", "atualizado_em");
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("revista", {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("ativa", "inativa"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
   
     await queryInterface.dropTable('revista');
    
  },
};


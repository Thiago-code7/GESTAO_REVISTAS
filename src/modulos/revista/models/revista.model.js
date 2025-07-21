const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/configDB");

const Revista = sequelize.define(
  "Revista",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "O nome é obrigatório.",
        },
        len: {
          args: [2, 100],
          msg: "O nome deve ter entre 2 e 100 caracteres.",
        },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A descrição é obrigatória.",
        },
        len: {
          args: [5, 1000],
          msg: "A descrição deve ter entre 5 e 1000 caracteres.",
        },
      },
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "A categoria é obrigatória." },
        len: {
          args: [2, 50],
          msg: "A categoria deve ter entre 2 e 50 caracteres.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("ativa", "inativa"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["ativa", "inativa"]],
          msg: 'O status deve ser "ativa" ou "inativa".',
        },
      },
    },
  },
  {
    tableName: "revista",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Revista;

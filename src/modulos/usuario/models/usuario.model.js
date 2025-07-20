const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/configDB");
const { v4: uuidv4 } = require('uuid');

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),  // gera UUID no Node
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "E-mail inválido!",
        },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
          msg: "A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
        },
        notEmpty: {
          msg: "A senha não pode estar vazia.",
        },
      },
    },
    papel: {
      type: DataTypes.ENUM("assinante", "funcionário", "admin"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["assinante", "funcionário", "admin"]],
          msg: 'O papel deve ser "assinante", "funcionário" ou "admin".',
        },
        notEmpty: {
          msg: 'O campo "papel" não pode estar vazio.',
        },
      },
    },
  },
  {
    tableName: 'usuario',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  }
);

module.exports = Usuario;

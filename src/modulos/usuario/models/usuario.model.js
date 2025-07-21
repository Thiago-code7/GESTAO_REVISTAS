const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/configDB");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Geração automática de UUID v4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/i,
          msg: "O nome contém caracteres inválidos.",
        },
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
      type: DataTypes.ENUM("assinante", "funcionario", "admin"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["assinante", "funcionario", "admin"]],
          msg: 'O papel deve ser "assinante", "funcionário" ou "admin".',
        },
        notEmpty: {
          msg: 'O campo "papel" não pode estar vazio.',
        },
      },
    },
  },
  {
    tableName: "usuario",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Usuario;

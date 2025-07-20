const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/configDB");

const Assinatura = sequelize.define(
  "Assinatura",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id",
      },
    },
    revistaId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "revista",
        key: "id",
      },
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDataFimMaiorQueDataInicio(value) {
          if (this.data_inicio && value <= this.data_inicio) {
            throw new Error("A data_fim deve ser maior que data_inicio.");
          }
        },
      },
    },
    status: {
      type: DataTypes.ENUM("ativa", "cancelada", "expirada"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["ativa", "cancelada", "expirada"]],
          msg: 'O status deve ser "ativa", "cancelada" ou "expirada".',
        },
      },
    },
  },
  {
    tableName: "assinatura",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Assinatura;
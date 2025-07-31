const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const dialect = process.env.DB_DIALECT;
const logging = process.env.NODE_ENV === 'development';

if (!['postgres', 'mariadb'].includes(dialect)) {
  throw new Error(`❌ Dialeto de banco não suportado: ${dialect}. Use 'postgres' ou 'mariadb'.`);
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    logging,
    dialectOptions:
      dialect === 'postgres'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
  }
);

module.exports = sequelize;

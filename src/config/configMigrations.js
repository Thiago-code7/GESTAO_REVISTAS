require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'postgres';

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: dialect,
    logging: process.env.NODE_ENV === 'development',
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data'
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST || `${process.env.DB_DATABASE}_test`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: dialect,
    logging: false
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: dialect,
    logging: false,
    dialectOptions:
      dialect === 'postgres'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        : {}
  }
};

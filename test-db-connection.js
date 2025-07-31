const sequelize = require('./src/config/configDB');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco MariaDB foi estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();

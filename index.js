const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');

// Carrega variáveis do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração dinâmica do Sequelize conforme banco (Postgres ou MariaDB)
const DB_DIALECT = process.env.DB_DIALECT || 'postgres'; // 'postgres' ou 'mariadb'

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
  }
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rotas
const usuarioRoutes = require('./src/modulos/usuario/routes/usuario.route');
const revistaRoutes = require('./src/modulos/revista/routes/revista.route');
const assinaturaRoutes = require('./src/modulos/assinatura/routes/assinatura.route');
const autenticacaoRoutes = require('./src/modulos/autenticacao/routes/autenticacao.route');

app.use('/usuarios', usuarioRoutes);
app.use('/revistas', revistaRoutes);
app.use('/assinaturas', assinaturaRoutes);
app.use('/auth', autenticacaoRoutes);

// Rota simples para teste
app.get('/', (req, res) => {
  res.send('API de Assinaturas de Revistas - Online!');
});

// Testa conexão e inicia servidor
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com banco estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error.message);
    process.exit(1); // Finaliza a aplicação se não conectar
  }
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

module.exports = { app, sequelize };


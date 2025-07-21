const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./src/config/configDB');  // importa Sequelize configurado

// Configurações iniciais
dotenv.config();
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rotas
const usuarioRoutes = require('./src/modulos/usuario/routes/usuario.route');
const revistaRoutes = require('./src/modulos/revista/routes/revista.route');
const assinaturaRoutes = require('./src/modulos/assinatura/routes/assinatura.route');
const autenticacaoRoutes = require('./src/modulos/autenticacao/routes/autenticacao.route'); // corrigido aqui

app.use('/usuarios', usuarioRoutes);     
app.use('/revistas', revistaRoutes);     
app.use('/assinaturas', assinaturaRoutes);
app.use('/auth', autenticacaoRoutes);    // corrigido aqui

// Rota simples para testar se API está online
app.get('/', (req, res) => {
  res.send('API de Assinaturas de Revistas - Online!');
});

// Sincroniza o banco e inicia o servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Banco sincronizado');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar o banco:', err);
  });

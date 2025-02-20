import dotenv from 'dotenv';
import express from 'express';
import swaggerConfig from './config/swagger';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Inicializar Swagger
swaggerConfig(app);

// Usar as rotas de autenticação
app.use('/api', authRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
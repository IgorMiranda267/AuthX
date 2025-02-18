require("dotenv").config();
const express = require("express");
const swaggerConfig = require("./config/swagger"); // Importando o Swagger

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Inicializar Swagger
swaggerConfig(app);

// Rota de teste para verificar se o servidor está rodando
app.get("/", (req, res) => {
  res.send("API está rodando...");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

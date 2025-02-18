const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login do usuário
 *     description: Autentica um usuário com email e senha.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@email.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Sucesso ao fazer login.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "usuario@email.com" && password === "123456") {
    return res.status(200).json({ message: "Login realizado com sucesso!" });
  }
  return res.status(401).json({ message: "Credenciais inválidas." });
});

module.exports = router;

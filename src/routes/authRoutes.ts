import { Router } from 'express';

const router = Router();


//#region Autenticação
/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Autenticação de usuários
 */

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
  
  /**
   * @swagger
   * /logout:
   *   post:
   *     summary: Faz logout do usuário
   *     description: Realiza logout do usuário.
   *     tags:
   *       - Autenticação
   *     responses:
   *       200:
   *         description: Sucesso ao fazer logout.
   *       400:
   *         description: Token não fornecido.
   *       500:
   *         description: Erro interno ao processar logout.
   */
  router.post("/logout", (req, res) => {
      const token = req.headers.authorization;
      
      if (!token) {
        return res.status(400).json({ message: "Token não fornecido." });
      }
  
      // TODO: Implementar blacklist de tokens para invalidar tokens antigos.
  
      return res.status(200).json({ message: "Logout realizado com sucesso!" });
  });
  
  //#endregion Autenticação.
  
  //#region Usuários
  /**
   * @swagger
   * tags:
   *   name: Usuários
   *   description: Operações com usuários
   */
  
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Lista todos os usuários
   *     description: Lista todos os usuários cadastrados.
   *     tags:
   *       - Usuários    
   *     responses:
   *       200:
   *         description: Lista de usuários.
   *       500:
   *         description: Erro interno ao listar usuários.
   */
  
  router.get("/users", (req, res) => {
  
      const usuarios = [
        { id: 1, nome: "João", email: "joao@email.com" },
        { id: 2, nome: "Maria", email: "maria@email.com" }
      ];
    
      return res.status(200).json(usuarios); // Retorna a lista de usuários
    });
  
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     description: Cria um novo usuário com nome e email.
   *     tags:
   *       - Usuários
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João
   *               email:
   *                 type: string
   *                 example: joao@email.com
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso.
   *       400:
   *         description: Nome e email são obrigatórios.
   *       409:
   *         description: Usuário com esse email já existe.
   *       500:
   *         description: Erro interno ao criar usuário.
   */
  router.post("/users", (req, res) => {
      const { nome, email } = req.body();
    
      if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios." });
      }
    
      // Verificação fictícia se o email já existe
      const usuariosExistentes = [
        { email: "joao@email.com" },
        { email: "maria@email.com" }
      ];
      
      const usuarioExistente = usuariosExistentes.find(user => user.email === email);
    
      if (usuarioExistente) {
        return res.status(409).json({ message: "Usuário com esse email já existe." });
      }
    
      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    });
    
  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualiza as informações de um usuário
   *     description: Atualiza o nome e o email de um usuário com base no ID.
   *     tags:
   *       - Usuários
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID do usuário que será atualizado.
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João Atualizado
   *               email:
   *                 type: string
   *                 example: joao.atualizado@email.com
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso.
   *       400:
   *         description: Nome e email são obrigatórios.
   *       404:
   *         description: Usuário não encontrado.
   *       500:
   *         description: Erro interno ao atualizar usuário.
   */
  router.put("/users/:id", (req, res) => {
      const { id } = req.params;
      const { nome, email } = req.body;
    
      if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios." });
      }
    
      // Verifica se o usuário existe (simulação)
      const usuarioExistente = { id: 1, nome: "João", email: "joao@email.com" }; // Exemplo fictício de usuário
      
      if (!usuarioExistente || usuarioExistente.id !== parseInt(id)) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
    
      // Atualização fictícia
      usuarioExistente.nome = nome;
      usuarioExistente.email = email;
    
      return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    });
  
    /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Deleta um usuário
   *     description: Deleta um usuário com base no ID.
   *     tags:
   *       - Usuários
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID do usuário que será deletado.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Usuário deletado com sucesso.
   *       404:
   *         description: Usuário não encontrado.
   *       500:
   *         description: Erro interno ao deletar usuário.
   */
  router.delete("/users/:id", (req, res) => {
      const { id } = req.params;
    
      // Verifica se o usuário existe (simulação)
      const usuarioExistente = { id: 1, nome: "João", email: "joao@email.com" }; // Exemplo fictício de usuário
    
      if (!usuarioExistente || usuarioExistente.id !== parseInt(id)) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
    
      // Lógica fictícia para deletar o usuário
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    });
    
  //#endregion Usuários.
  
  //#region Token
  
  /**
   * @swagger
   * /token:
   *   post:
   *     summary: Gera um novo token de autenticação
   *     description: Cria um novo token JWT para o usuário após a autenticação.
   *     tags:
   *       - Token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: joao@email.com
   *               password:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       200:
   *         description: Token gerado com sucesso.
   *       401:
   *         description: Credenciais inválidas.
   *       500:
   *         description: Erro ao gerar o token.
   */
  router.post("/token", (req, res) => {
      const { email, password } = req.body;
    
      if (email === "joao@email.com" && password === "123456") {
        // Aqui você geraria o token, usando alguma chave secreta
        const token = "exemplo_de_token_gerado";  // Simulação de token gerado
        return res.status(200).json({ token });
      }
    
      return res.status(401).json({ message: "Credenciais inválidas." });
    });
  
  /**
   * @swagger
   * /token/refresh:
   *   post:
   *     summary: Gera um novo token com um refresh token
   *     description: Gera um novo token JWT usando o refresh token enviado.
   *     tags:
   *       - Token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *                 example: "exemplo_de_refresh_token"
   *     responses:
   *       200:
   *         description: Novo token gerado com sucesso.
   *       400:
   *         description: Refresh token inválido.
   *       500:
   *         description: Erro ao gerar o novo token.
   */
  router.post("/token/refresh", (req, res) => {
      const { refreshToken } = req.body;
    
      // Simulação de validação de refresh token
      if (refreshToken === "exemplo_de_refresh_token") {
        // Aqui você geraria um novo token com base no refresh token
        const novoToken = "novo_token_gerado";  // Simulação de novo token
        return res.status(200).json({ token: novoToken });
      }
    
      return res.status(400).json({ message: "Refresh token inválido." });
    });
  
  /**
   * @swagger
   * /token/invalidate:
   *   post:
   *     summary: Invalida um token de autenticação
   *     description: Invalida um token JWT para logout ou revogação.
   *     tags:
   *       - Token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *                 example: "exemplo_de_token_a_ser_invalidado"
   *     responses:
   *       200:
   *         description: Token invalidado com sucesso.
   *       400:
   *         description: Token inválido.
   *       500:
   *         description: Erro ao invalidar o token.
   */
  router.post("/token/invalidate", (req, res) => {
      const { token } = req.body;
    
      // Simulação de invalidar o token
      if (token === "exemplo_de_token_a_ser_invalidado") {
        // Aqui você colocaria o token em uma blacklist, por exemplo
        return res.status(200).json({ message: "Token invalidado com sucesso!" });
      }
    
      return res.status(400).json({ message: "Token inválido." });
    });
export default router;
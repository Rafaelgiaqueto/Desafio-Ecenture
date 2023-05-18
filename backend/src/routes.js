const express = require('express'); // Importa o módulo Express, responsável pelo servidor web
const router = express.Router(); // Cria um objeto de roteador para definir as rotas
const db = require('../db.js'); // Importa o módulo de acesso ao banco de dados
const multer = require('multer'); // Importa o módulo Multer, responsável por lidar com o upload de arquivos
const storage = multer.memoryStorage(); // Configura o armazenamento em memória para os arquivos enviados
const upload = multer({ storage: storage }); // Cria um middleware de upload usando as configurações de armazenamento

router.post("/posts", upload.single("file_name"), async (req, res) => {
  try {
    const { file_name } = req.file;
    const result = await db.query('INSERT INTO images (file_name, path, created_at) VALUES ($1, $2, $3) RETURNING *', [file_name, req.file.path, new Date()]);
    const image = result.rows[0];
    res.json({ image, message: 'Arquivo enviado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao enviar arquivo' });
  }
});


router.get('/images', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM images ORDER BY created_at DESC'); // Consulta todos os registros da tabela "images" ordenados pela data de criação (em ordem decrescente)
    const images = result.rows; // Obtém os registros retornados pela consulta
    res.json({ images }); // Retorna uma resposta JSON contendo os registros das imagens
  } catch (err) {
    console.error(err); // Registra qualquer erro ocorrido durante o processamento
    res.status(500).json({ error: 'Erro ao buscar imagens' }); // Retorna uma resposta de erro 500 com uma mensagem de erro
  }
});

module.exports = router; // Exporta o roteador para que ele possa ser usado em outros módulos

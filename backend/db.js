const { Client } = require('pg');

const client = new Client({
  host: '',
  user: '',
  password: '',
  database: '',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.stack);
  } else {
    console.log('Conexão bem sucedida com o banco de dados');
  }
});

module.exports = client;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes.js');

const app = express();

app.use('/tmp/uploads', express.static(__dirname + '/../tmp/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(router);

app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});

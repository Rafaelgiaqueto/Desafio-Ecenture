const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes.js');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '..', '..', 'tmp', 'uploads')));
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const dest = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) {
        cb(err);
      } else {
        const fileName = `${buffer.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      }
    });
  },  
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato inválido de arquivo'));
    }
  },
});

module.exports = upload;
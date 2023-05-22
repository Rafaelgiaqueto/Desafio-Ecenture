const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: "./tmp/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + originalExtension);
  },
});


const upload = multer({
  storage,
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
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
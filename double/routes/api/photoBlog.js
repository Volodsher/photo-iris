// '/api/photo-blog'

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/blog');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
({ storage: storage });

// const upload = multer({ dest: 'uploads/' }).single('file');
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
}).single('file');

router.get('/', (req, res) => {
  res.send('Birds home page');
});

router.post('/', auth, upload, (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send('success');
  console.log('success');
});

module.exports = router;

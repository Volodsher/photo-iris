const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const fs = require('fs');

router.get('/api/gallery', auth, (req, res) => {
  fs.readdir('./uploads/gallery', (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

module.exports = router;

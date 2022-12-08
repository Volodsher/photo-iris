const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const fs = require('fs');

// import express from 'express';
// import auth from '../../middleware/auth.js';
// import fs from 'fs';

router.get('/', (req, res) => {
  fs.readdir('./uploads/gallery', (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

module.exports = router;
// export default router;

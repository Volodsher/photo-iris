import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth.js';
import fs from 'fs';

router.get('/', (req, res) => {
  fs.readdir('./uploads/gallery', (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

export default router;

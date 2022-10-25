const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const fs = require('fs');
const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Directory for uploading files
const upload = multer({ dest: 'uploads/' });

app.use(express.static('uploads'));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/cors', (req, res) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.send({ msg: 'This has CORS enabled' });
// });

// Test Request
// app.get('/', (req, res) => {
//   res.json({
//     name: 'bill',
//     age: 99,
//   });
// });

app.get('/api', (req, res) => {
  // res.send({ message: 'We did it!' });
  res.send('We did it');
});

// just to get amount of files in a folder - number
// app.get('/api/gallery', (req, res) => {
//   fs.readdir('./uploads/gallery', (err, files) => {
//     console.log({ lenth: files.length });
//     res.send({ length: files.length });
//   });
// });

app.get('/api/gallery', (req, res) => {
  fs.readdir('./uploads/gallery', (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

app.post('/api/photo', upload.single('file'), (req, res, next) => {
  const file = req.file;
  // console.log(file);
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send('success');
  console.log('success');
});

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

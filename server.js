const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

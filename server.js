const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql');

const app = express();
app.use(cors());
connectDB();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB,
});

// to work with DB

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  const sql = 'INSERT INTO customers (name, adress) values ("Iryna", "Ottawa")';
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('Added  ');
  });
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');

//   const sql =
//     'CREATE TABLE customers3 (name VARCHAR(255), adress VARCHAR(255))';
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log('Table created');
//   });
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.json({ extended: false }));
app.use(express.static('uploads'));

app.get('/api', (req, res) => {
  res.send('We did it');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/photo-blog', require('./routes/api/photoBlog'));
app.use('/api/mail', require('./routes/api/mail'));
app.use('/api/sessions', require('./routes/api/sessions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

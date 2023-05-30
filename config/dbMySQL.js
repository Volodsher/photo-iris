const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// const connectDBMySQL = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   database: process.env.DB,
// });

const connectDBMySQL = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB,
});

module.exports = connectDBMySQL;

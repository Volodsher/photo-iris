const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.json({ extended: false }));
app.use(express.static('uploads'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.send('We did it');
});

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/mail', require('./routes/api/mail'));
app.use('/api/sessions', require('./routes/api/sessions'));

app.listen();

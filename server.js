const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
connectDB();

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

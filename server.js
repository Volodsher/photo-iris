const express = require('express');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Test Request
app.get('/', auth, (req, res) => res.send('Api Is Running'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

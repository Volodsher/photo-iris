const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect db
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('trying to understand how to create crud'));

// define routes
app.use('/api/pictures', require('./routes/api/pictures'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

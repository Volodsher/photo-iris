const express = require('express');

const app = express();

const PORT = process.env.PORT || 5001;

app.use('/', (req, res) => res.send('api is running'));

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

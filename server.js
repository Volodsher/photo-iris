import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import users from './routes/api/users.js';
import auth from './routes/api/auth.js';
import posts from './routes/api/posts.js';
import photoBlog from './routes/api/photoBlog.js';
import mail from './routes/api/mail.js';
import gallery from './routes/api/gallery.js';

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

// app.get('/api/gallery', (req, res) => {
//   res.send('We did it ga;');
// });

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/photo-blog', photoBlog);
app.use('/api/mail', mail);
app.use('/api/gallery', gallery);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port ${PORT}`));

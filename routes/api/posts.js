const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/blog');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
({ storage: storage });

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
}).single('file');

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  '/',
  auth,
  upload,
  check('title', 'Title is required').notEmpty(),
  check('text', 'Text is required').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text, image } = req.body;

    const id = uuidv4();
    const date = new Date().toJSON().slice(0, 10);

    const newPost = {
      id,
      title,
      text,
      image,
      date,
    };

    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 1' });
      }

      const addNewPost =
        'INSERT INTO posts (id, title, text, image, date) VALUES (?, ?, ?, ?, ?)';
      connection.query(
        addNewPost,
        [id, title, text, image, date],
        (err, results) => {
          connection.release();

          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error 3' });
          }
          // results.message = 'You successfully added a new post!';
          // res.json(results.message);
          res.json(newPost);
        }
      );
    });
  }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    const getAllPosts = 'SELECT * FROM posts ORDER BY date ASC';
    connection.query(getAllPosts, (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      res.send(rows);
    });
  });
});

// @route   GET api/posts/:id
// @dexc    Get post by ID
// @access  Private
// Old version with MongoDB
// router.get('/:id', async (req, res) => {
// try {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     return res.status(404).json({ msg: 'Post not found' });
//   }
//   res.json(post);
// } catch (error) {
//   console.error(error.message);
//   if (error.kind === 'ObjectId') {
//     return res.status(404).json({ msg: 'Post not found' });
//   }
//   res.status(500).send('Server Error');
// }
// });
router.get('/:id', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    const getOnePosts = `SELECT * FROM posts WHERE id = ?`;
    connection.query(getOnePosts, [req.params.id], (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      res.send(rows);
    });
  });
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
// Old version with MongoDB
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     // Check user
//     const user = await User.findById(req.user.id).select('-password');
//     if (user.status !== 'superuser') {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     // Remove post
//     await post.remove();

//     res.json({ msg: 'Post removed' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;

  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    const checkPostQuery = 'SELECT 1 FROM posts WHERE id = ? LIMIT 1';
    connection.query(checkPostQuery, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        connection.release();
        return res.status(500).json({ error: 'Database error 2' });
      }

      if (rows.length === 0) {
        connection.release();
        return res.status(400).json({
          errors: [{ msg: "Post with such name doesn't exists" }],
        });
      }

      console.log(req.body, 'here you go');
      if (req.body.image) {
        fs.unlink(`./uploads/blog/${req.body.image}`, (err) => {
          if (err) throw err;

          console.log('Blog photo deleted');
        });
      }

      const deletePost = 'DELETE FROM posts WHERE id = ?';
      connection.query(deletePost, [id], (err, results) => {
        connection.release();

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error 3' });
        }

        results.message = 'You successfully deleted a post!';
        res.json(results.message);
      });
    });
  });
});

// @route PUT api/posts/:id
// @desc Edit a post
// @access Private
// Old version with MongoDB
// router.put('/:id', auth, async (req, res) => {
//   let post = await Post.findById(req.params.id);

//   if (!post) {
//     return res.status(404).json({ msg: 'Post not found' });
//   }

//   // Check user
//   const user = await User.findById(req.user.id).select('-password');
//   if (user.status !== 'superuser') {
//     return res.status(401).json({ msg: 'User not authorized' });
//   }

//   // Edit the post
//   const { title, text, image } = req.body;
//   Object.assign(post, { title, text, image });

//   await post.save();

//   res.json(post);
// });
router.put('/:id', auth, async (req, res) => {
  // let post = await Post.findById(req.params.id);
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    const checkPostQuery = 'SELECT 1 FROM posts WHERE id = ? LIMIT 1';
    connection.query(checkPostQuery, [req.params.id], (err, rows) => {
      if (err) {
        console.error(err);
        connection.release();
        return res.status(500).json({ error: 'Database rorror 2' });
      }

      if (rows.length === 0) {
        connection.release();
        return res.status(400).json({
          errors: [{ msg: "Post with such name doesn't exists" }],
        });
      }

      const edit_date = new Date().toJSON().slice(0, 10);
      const edited = true;
      const id = req.params.id;
      const { title, text, image, date } = req.body;

      const updatedPost = {
        id,
        title,
        text,
        image,
        date,
        edited,
        edit_date,
      };

      const updatePost =
        'UPDATE posts SET title = ?, text = ?, image = ?, date = ?, edited = ?, edit_date = ? WHERE id = ?;';

      connection.query(
        updatePost,
        [title, text, image, date, edited, edit_date, id],
        (err, results) => {
          connection.release();

          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error 3' });
          }
          // console.log(results);
          // results.message = `You just edited post: ${title}`;
          // res.json(results.message);
          res.json(updatedPost);
        }
      );
    });
  });
  // if (!post) {
  //   return res.status(404).json({ msg: 'Post not found' });
  // }

  // // Check user
  // const user = await User.findById(req.user.id).select('-password');
  // if (user.status !== 'superuser') {
  //   return res.status(401).json({ msg: 'User not authorized' });
  // }

  // // Edit the post
  // const { title, text, image } = req.body;
  // Object.assign(post, { title, text, image });

  // await post.save();

  // res.json(post);
});

module.exports = router;
// export default router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');
// const checkObjectId = require('../../middleware/checkObjectId');

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  '/',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text, images } = req.body;

    const id = uuidv4();
    const date = new Date().toJSON().slice(0, 10);

    const newPost = {
      id,
      title,
      text,
      images,
      date,
    };

    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 1' });
      }

      const addNewPost =
        'INSERT INTO posts (id, title, text, images, date) VALUES (?, ?, ?, ?, ?)';
      connection.query(
        addNewPost,
        [id, title, text, images, date],
        (err, results) => {
          connection.release();

          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error 3' });
          }

          results.message = 'You successfully added a new post!';
          res.json(results.message);
        }
      );
    });
  }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    const user = await User.findById(req.user.id).select('-password');
    if (user.status !== 'superuser') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove post
    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/:id
// @desc Edit a post
// @access Private
router.put('/:id', auth, async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  // Check user
  const user = await User.findById(req.user.id).select('-password');
  if (user.status !== 'superuser') {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  // Edit the post
  const { title, text, image } = req.body;
  Object.assign(post, { title, text, image });

  await post.save();

  res.json(post);
});

module.exports = router;
// export default router;

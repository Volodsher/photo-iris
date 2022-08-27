const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
// const checkObjectId = require('../../middleware/checkObjectId');

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    console.log('trying');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        postName: req.body.postName,
        name: user.name,
        avatar: user.avatar,
        // user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(err.message);
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
  const { postName, text } = req.body;
  Object.assign(post, { postName, text });

  await post.save();

  res.json(post);
});

module.exports = router;

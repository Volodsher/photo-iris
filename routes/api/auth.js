import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';

import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';

import User from '../../models/User.js';

// @route GET api/auth
// @dexc  Test route
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @dexc  Authenticate user & get token
// @access Public

router.post(
  '/',
  [
    check('nameOrEmail', 'Please include your email or name').exists(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nameOrEmail, password } = req.body;

    try {
      let user = await User.findOne({
        $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
      });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const User = require('../../models/User');
const normalize = require('normalize-url');
const connectDBMySQL = require('../../config/dbMySQL');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ $or: [{ name }, { email }] });

      connectDBMySQL.getConnection((err, connection) => {
        if (err) {
          console.error(err);
        }

        const sql = `SELECT 1 FROM users WHERE name = '${name}' OR email = '${email}' LIMIT 1;`;

        connection.query(sql, (err, results) => {
          connection.release(); // Release the connection back to the pool

          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
          }

          console.log(results);
          if (results) {
            return res.status(400).json({
              errors: [{ msg: 'User with such name or email already exists' }],
            });
          }
        });
      });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with such name or email already exists' }],
        });
      }

      // const avatar = normalize(
      //   gravatar.url(email, {
      //     s: '200',
      //     r: 'pg',
      //     d: 'mm',
      //   }),
      //   { forceHttps: true }
      // );

      user = new User({
        name,
        email,
        // avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

      connectDBMySQL.getConnection((err, connection) => {
        if (err) {
          console.error(err);
        }

        // const sql = `INSERT INTO users ('${user.name}', '${user.email}', '${user.password}') VALUES (?, ?)`;
        // const sql = `INSERT INTO users(id, name, email, password) VALUES (1, '${user.name}', '${user.email}', '${user.password}')`;
        const sql = `INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)`;

        connection.query(
          sql,
          [1, user.name, user.email, user.password],
          (err, results) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Database error' });
            }

            console.log(results);
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

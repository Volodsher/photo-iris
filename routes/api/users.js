const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      const checkUserQuery =
        'SELECT 1 FROM users WHERE name = ? OR email = ? LIMIT 1';
      connection.query(checkUserQuery, [name, email], (err, rows) => {
        if (err) {
          console.error(err);
          connection.release();
          return res.status(500).json({ error: 'Database error' });
        }

        if (rows.length > 0) {
          connection.release();
          return res.status(400).json({
            errors: [{ msg: 'User with such name or email already exists' }],
          });
        }

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error(err);
            connection.release();
            return res.status(500).json({ error: 'Server error' });
          }

          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              connection.release();
              return res.status(500).json({ error: 'Server error' });
            }

            const userId = uuidv4();
            const date = new Date().toJSON().slice(0, 10);
            console.log(date);

            const insertUserQuery =
              'INSERT INTO users(id, name, email, password, date) VALUES (?, ?, ?, ?, ?)';
            connection.query(
              insertUserQuery,
              [userId, name, email, hashedPassword, date],
              (err, results) => {
                connection.release();

                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Database error' });
                }

                const payload = {
                  user: {
                    id: userId,
                  },
                };

                jwt.sign(
                  payload,
                  config.get('jwtSecret'),
                  { expiresIn: 36000 },
                  (err, token) => {
                    if (err) {
                      console.error(err);
                      return res.status(500).json({ error: 'Server error' });
                    }

                    res.json({ token });
                  }
                );
              }
            );
          });
        });
      });
    });
  }
);

module.exports = router;

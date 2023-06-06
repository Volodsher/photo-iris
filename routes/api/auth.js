const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const connectDBMySQL = require('../../config/dbMySQL');

const User = require('../../models/User');

// @route GET api/auth
// @dexc  Test route
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');

    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      const getUserQuery =
        'SELECT id, name, email, status FROM users WHERE id = ? LIMIT 1';

      connection.query(getUserQuery, [req.user.id], async (err, rows) => {
        if (err) {
          console.error(err);
          connection.release();
          return res.status(500).json({ error: 'Database error' });
        }

        if (rows.length > 0) {
          // console.log(rows[0]);
          connection.release();
          res.json(rows[0]);
        } else {
          connection.release();
          return res.status(404).json({ error: 'Invalid Credentials' });
        }
      });
    });
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
      // Mongoose
      // let user = await User.findOne({
      //   $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
      // });

      connectDBMySQL.getConnection((err, connection) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Database error' });
        }

        const checkUserQuery =
          'SELECT * FROM users WHERE name = ? OR email = ? LIMIT 1';
        connection.query(
          checkUserQuery,
          [nameOrEmail, nameOrEmail],
          async (err, rows) => {
            if (err) {
              console.error(err);
              connection.release();
              return res.status(500).json({ error: 'Database error' });
            }

            let user; // Declare the user variable

            if (rows.length > 0) {
              user = rows[0]; // Assign the user data to the variable
              console.log(user);
              connection.release();
            } else {
              connection.release();
              return res.status(404).json({ error: 'Invalid Credentials' });
            }

            // Remaining code to validate the user and generate a JWT token
            try {
              if (!user) {
                return res
                  .status(400)
                  .json({ errors: [{ msg: 'Invalid Credentials ' }] });
              }

              const isMatch = await bcrypt.compare(password, user.password);
              console.log(isMatch);

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
      });

      // if (!user) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      // }

      // const isMatch = await bcrypt.compare(password, user.password);

      // if (!isMatch) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: 'Invalid Credentials' }] });
      // }

      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   config.get('jwtSecret'),
      //   { expiresIn: 36000 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error last');
    }
  }
);

module.exports = router;

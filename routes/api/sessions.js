const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const commonSessionsText = 'printed photo enlargement on premium photo paper';

router.get('/', (req, res) => {
  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    const getAllSessions = 'SELECT * FROM sessions ORDER BY session_order ASC';
    connection.query(getAllSessions, (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      const sessionsWithText = rows.map((ses) => {
        return {
          ...ses,
          mustHave: ses.mustHave + commonSessionsText,
        };
      });

      const fullSessions = sessionsWithText.map((mygallery, ind) => {
        let images = fs
          .readdirSync(`./uploads/gallery/${mygallery.name}`)
          .filter((file) => file !== '.DS_Store');
        return { ...mygallery, images: images };
      });

      res.send(fullSessions);
    });
  });
});

// @route  GET api/sessions
// @desc   Get session's pictures by session id
// @access Public

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  fs.readdir(`./uploads/gallery/${req.params.id}`, (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

// @route  POST api/sessions
// @desc   Create a session
// @access Private
router.post('/', check('name', 'Name is required').notEmpty(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    session_order,
    title,
    link,
    priceLink,
    image,
    price,
    about,
    additional,
    mustHave,
    images,
    last,
  } = req.body;

  connectDBMySQL.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    const checkUserQuery = 'SELECT 1 FROM sessions WHERE name = ? LIMIT 1';
    connection.query(checkUserQuery, [name], (err, rows) => {
      if (err) {
        console.error(err);
        connection.release();
        return res.status(500).json({ error: 'Database error 2' });
      }

      if (rows.length > 0) {
        connection.release();
        return res.status(400).json({
          errors: [{ msg: 'Sessions with such name already exists' }],
        });
      }

      const id = uuidv4();
      const date = new Date().toJSON().slice(0, 10);

      const addNewSession =
        'INSERT INTO sessions (id, name, session_order, title, link, priceLink, image, price, about, additional, mustHave, images, last, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(
        addNewSession,
        [
          id,
          name,
          session_order,
          title,
          link,
          priceLink,
          image,
          price,
          about,
          additional,
          mustHave,
          images,
          last,
          date,
        ],
        (err, results) => {
          connection.release();

          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error 3' });
          }

          results.message = 'You successfully added a new session!';
          res.json(results.message);
        }
      );
    });
  });
});

module.exports = router;
// export default router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const commonSessionsText = 'printed photo enlargement on premium photo paper';

// const initialSessions = [
//   {
//     id: 'qw',
//     name: 'family',
//     title: 'Family Fun',
//     link: '/mygallery#family',
//     priceLink: '/pricing#family',
//     image: '/sessions/family.jpg',
//     price: '195$',
//     about: `1 hour session \n25 edited and retouched high resolution digital images`,
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//   },
//   {
//     id: 'qwe',
//     name: 'famA',
//     title: '',
//     link: '/pricing#family',
//     images: [],
//   },
//   {
//     id: 'qwer',
//     name: 'famKr',
//     title: '',
//     link: '/pricing#family',
//     images: [],
//   },
//   {
//     id: 'qwert',
//     name: 'famN',
//     title: '',
//     link: '/pricing#family',
//     images: [],
//   },
//   {
//     id: 'qwerty',
//     name: 'famO',
//     title: '',
//     link: '/pricing#family',
//     images: [],
//   },
//   {
//     id: 'qwertyu',
//     name: 'famT',
//     title: '',
//     priceLink: '/pricing#family',
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyui',
//     name: 'kids',
//     title: "Kids' Adventures",
//     link: '/mygallery#kids',
//     priceLink: '/pricing#kids',
//     image: '/sessions/kids.jpg',
//     price: '150$',
//     about:
//       '45 min session \n15 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuio',
//     name: 'lovestory',
//     title: 'Love Story',
//     link: '/mygallery#lovestory',
//     priceLink: '/pricing#lovestory',
//     image: '/sessions/lovestory.jpg',
//     price: '195$',
//     about:
//       '1 hour session \n25 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop',
//     name: 'maternity',
//     title: 'Maternity',
//     link: '/mygallery#maternity',
//     priceLink: '/pricing#maternity',
//     image: '/sessions/maternity.jpg',
//     price: '195$',
//     about:
//       '1 hour session \n25 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[',
//     name: 'portrait',
//     title: 'Portrait',
//     link: '/mygallery#portrait',
//     priceLink: '/pricing#portrait',
//     image: '/sessions/portrait.jpg',
//     price: '150$',
//     about:
//       '45 min session \n10 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[]',
//     name: 'mini',
//     title: 'Mini Session',
//     link: '/mygallery#mini',
//     priceLink: '/pricing#mini',
//     image: '/sessions/mini.jpg',
//     price: '120$',
//     about: '30 min \n5 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[]q',
//     name: 'smileandpaws',
//     title: 'Smile and Paws',
//     link: '/mygallery#smileandpaws',
//     priceLink: '/pricing#smileandpaws',
//     image: '/sessions/smileandpaws.jpg',
//     price: '120$',
//     about: '30 min \n5 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[]qw',
//     name: 'business',
//     title: 'Business',
//     link: '/mygallery#business',
//     priceLink: '/pricing#business',
//     image: '/sessions/business.jpg',
//     price: '250$',
//     about:
//       '1,5 hours session \n30 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[]qwe',
//     name: 'wedding',
//     title: 'Wedding',
//     link: '/mygallery#wedding',
//     priceLink: '/pricing#wedding',
//     image: '/sessions/wedding.jpg',
//     price: '450$',
//     about:
//       '3 hours session \n20-40* edited and retouched high resolution digital images',
//     additional:
//       '* 20 high resolution digital images (Photoshoot on a sailboat)  \n  40 high resolution digital images (On-location)',
//     mustHave: ` 3 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[]qwer',
//     name: 'food',
//     title: 'Food Photography',
//     link: '/mygallery#food',
//     priceLink: '/pricing#food',
//     image: '/sessions/food.jpg',
//     price: '150$',
//     about:
//       '45 min session \n 15 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
//   {
//     id: 'qwertyuiop[]qwert',
//     name: 'pet',
//     title: 'Pet Photography',
//     link: '/mygallery#pet',
//     priceLink: '/pricing#pet',
//     image: '/sessions/pet.jpg',
//     price: '120$',
//     about: '30 min \n5 edited and retouched high resolution digital images',
//     mustHave: ` 1 ${commonSessionsText}`,
//     images: [],
//     last: true,
//   },
// ];

// new JSON with sessions and image arrays
// fs.readdirSync - this one is treaky because can stop Node server.
// But it's a simple application so there shouldn't be any mistakes. Let's leave it until refactoring.
// router.get('/', (req, res) => {
//   const sessions = initialSessions.map((session, ind) => {
//     let images = fs
//       .readdirSync(`./uploads/gallery/${session.name}`)
//       .filter((file) => file !== '.DS_Store');
//     return { ...session, images: images };
//   });

//   res.send(sessions);
// });

// router.get('/:id', (req, res) => {
//   console.log(req.params.id);
//   fs.readdir(`./uploads/gallery/${req.params.id}`, (err, files) => {
//     res.send(files.filter((file) => file !== '.DS_Store'));
//   });
// });

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
      console.log(date);

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

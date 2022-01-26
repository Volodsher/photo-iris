const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Picture = require('../../models/Picture');

//router.post('/', (req, res) => res.send('it is working'));

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('gallery', 'Pleas include a name of gallery').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, gallery } = req.body;
    if (!name) {
      res.status(400).json({ errors: [{ msg: 'Name shouldnt be empty' }] });
    }

    try {
      let picture = await Picture.findOne({ name });

      if (picture) {
        res.status(400).json({ errors: [{ msg: 'Name already exists' }] });
        return;
      }

      picture = new Picture({
        name,
        gallery,
      });

      await picture.save();
      console.log(picture);

      let allPicture = await Picture.find({});
      res.send(allPicture);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error or something else');
      return;
    }
  }
);

module.exports = router;

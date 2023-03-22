const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');
const { validationResult, check } = require('express-validator');

// for mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get('mailUser'),
    pass: config.get('mailPass'),
  },
});

let mailOptions = {
  from: 'hello@example.com',
  to: 'sheremeta.photos@gmail.com',
  subject: 'Subject',
  text: 'Email content',
};

router.post(
  '/',
  check('guestName').not().isEmpty(),
  check('session').not().isEmpty(),
  check('guestEmail').isEmail().normalizeEmail().withMessage('Not an email'),
  check('guestPhone').optional({ checkFalsy: true }).isNumeric(),
  check('textMessage').not().isEmpty().trim().escape(),

  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mailOptions = {
      ...mailOptions,
      subject: `Photo session: ${req.body.session} for ${req.body.guestName}`,
      text: `
        \nName: ${req.body.guestName}.
        \nPhoto session: ${req.body.session}.
        \nEmail: ${req.body.guestEmail}.
        \nPhone: ${req.body.guestPhone}.
        \nMassage: ${req.body.textMessage}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent');
        res.send('You just sent a mail!');
      }
    });
  }
);

module.exports = router;

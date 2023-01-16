const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');

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
  to: 'volodsher@gmail.com',
  subject: 'Subject',
  text: 'Email content',
};

router.post('/', async (req, res) => {
  console.log(req.body);
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

  console.log(typeof req.body);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
      res.send('You just sent a mail!');
    }
  });
});

module.exports = router;

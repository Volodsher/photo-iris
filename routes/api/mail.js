import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

// for mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'volodsher@gmail.com',
    pass: 'aqqfhjmnxsopacmq',
  },
});

const mailOptions = {
  from: 'hello@example.com',
  to: 'volodsher@gmail.com',
  subject: 'Subject',
  text: 'Email content',
};

router.get('/', async (req, res) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('you just sent a mail');
    }
  });
});

export default router;

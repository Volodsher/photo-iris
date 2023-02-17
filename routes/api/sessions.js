const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const fs = require('fs');

const mustHaveText =
  'HST is added separately from the price. Additional costs for make-up (at the request of the client), photo studio rentals, photo permits (if needed), costume rentals are NOT INCLUDED in a price. We require a 10% deposit to book your date.';

const initialSessions = [
  {
    key: 1,
    id: 'family',
    title: 'Family Fun',
    link: '/gallery#family',
    priceLink: '/pricing#family',
    image: '/sessions/family.jpg',
    price: '195$',
    about: `1hour session \n25 edited and retouched images`,
    mustHave: '',
    images: [],
  },
  {
    key: 2,
    id: 'famA',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    key: 3,
    id: 'famKr',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    key: 4,
    id: 'famN',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    key: 5,
    id: 'famO',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    key: 6,
    id: 'famT',
    title: '',
    link: '/pricing#family',
    images: [],
    last: true,
  },
  {
    key: 7,
    id: 'kids',
    title: "Kids' Adventures",
    link: '/gallery#kids',
    priceLink: '/pricing#kids',
    image: '/sessions/kids.jpg',
    price: '150$',
    about: '45 min session \n15 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 8,
    id: 'lovestory',
    title: 'Love Story',
    link: '/gallery#lovestory',
    priceLink: '/pricing#lovestory',
    image: '/sessions/lovestory.jpg',
    price: '195$',
    about: '1 hour session \n25 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 9,
    id: 'maternity',
    title: 'Maternity',
    link: '/gallery#maternity',
    priceLink: '/pricing#maternity',
    image: '/sessions/maternity.jpg',
    price: '195$',
    about: '1 hour session \n25 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 10,
    id: 'portrait',
    title: 'Portrait',
    link: '/gallery#portrait',
    priceLink: '/pricing#portrait',
    image: '/sessions/portrait.jpg',
    price: '150$',
    about: '45 min session \n10 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 11,
    id: 'mini',
    title: 'Mini Session',
    link: '/gallery#mini',
    priceLink: '/pricing#mini',
    image: '/sessions/mini.jpg',
    price: '120$',
    about: '30 min \n5 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 12,
    id: 'smileandpaws',
    title: 'Smile and Paws',
    link: '/gallery#smileandpaws',
    priceLink: '/pricing#smileandpaws',
    image: '/sessions/smileandpaws.jpg',
    price: '120$',
    about: '30 min \n5 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 13,
    id: 'business',
    title: 'Business',
    link: '/gallery#business',
    priceLink: '/pricing#business',
    image: '/sessions/business.jpg',
    price: '250$',
    about: '1,5 hours session \n30 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 14,
    id: 'wedding',
    title: 'Wedding',
    link: '/gallery#wedding',
    priceLink: '/pricing#wedding',
    image: '/sessions/wedding.jpg',
    price: '450$',
    about: '3 hours session \n50-75 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
  {
    key: 15,
    id: 'food',
    title: 'Food Photography',
    link: '/gallery#food',
    priceLink: '/pricing#food',
    image: '/sessions/food.jpg',
    price: '150$',
    about: '45 min session \n 15 edited and retouched images',
    mustHave: '',
    images: [],
    last: true,
  },
];

// old stuff
// import express from 'express';
// import auth from '../../middleware/auth.js';
// import fs from 'fs';

// good and simple GET all names from a forlder as array
// router.get('/', (req, res) => {
//   fs.readdir('./uploads/gallery', (err, files) => {
//     res.send(files.filter((file) => file !== '.DS_Store'));
//   });
// });

// new JSON with sessions and image arrays
// fs.readdir which is asynchronous
// router.get('/', (req, res) => {
//   const sessions = initialSessions.map((gallery, ind) => {
//     let images = [];

//     fs.readdir(`./uploads/gallery/${gallery.id}`, (err, files) => {
//       images = files.filter((file) => file !== '.DS_Store');
//       sessions[ind] = { ...gallery, images: images };
//     });
//   });

// new JSON with sessions and image arrays
// fs.readdirSync - this one is treaky because can stop Node server.
// But it's a simple application so there shouldn't be any mistakes. Let's leave it until refactoring.
router.get('/', (req, res) => {
  const sessions = initialSessions.map((session, ind) => {
    let images = fs
      .readdirSync(`./uploads/gallery/${session.id}`)
      .filter((file) => file !== '.DS_Store');
    return { ...session, images: images };
  });

  res.send(sessions);
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  fs.readdir(`./uploads/gallery/${req.params.id}`, (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

module.exports = router;
// export default router;

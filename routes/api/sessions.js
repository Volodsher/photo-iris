const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const fs = require('fs');

const mustHaveText1 =
  'HST is added separately from the price. Additional costs for make-up (at the request of the client), photo studio rentals, photo permits (if needed), costume rentals are NOT INCLUDED in a price. We require a 10% deposit to book your date.';

const mustHaveText2 = 'printed photo enlargement on premium photo paper';

const initialSessions = [
  {
    id: 'qw',
    name: 'family',
    title: 'Family Fun',
    link: '/mygallery#family',
    priceLink: '/pricing#family',
    image: '/sessions/family.jpg',
    price: '195$',
    about: `1 hour session \n25 edited and retouched high resolution digital images`,
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
  },
  {
    id: 'qwe',
    name: 'famA',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'qwer',
    name: 'famKr',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'qwert',
    name: 'famN',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'qwerty',
    name: 'famO',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'qwertyu',
    name: 'famT',
    title: '',
    priceLink: '/pricing#family',
    images: [],
    last: true,
  },
  {
    id: 'qwertyui',
    name: 'kids',
    title: "Kids' Adventures",
    link: '/mygallery#kids',
    priceLink: '/pricing#kids',
    image: '/sessions/kids.jpg',
    price: '150$',
    about:
      '45 min session \n15 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuio',
    name: 'lovestory',
    title: 'Love Story',
    link: '/mygallery#lovestory',
    priceLink: '/pricing#lovestory',
    image: '/sessions/lovestory.jpg',
    price: '195$',
    about:
      '1 hour session \n25 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop',
    name: 'maternity',
    title: 'Maternity',
    link: '/mygallery#maternity',
    priceLink: '/pricing#maternity',
    image: '/sessions/maternity.jpg',
    price: '195$',
    about:
      '1 hour session \n25 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[',
    name: 'portrait',
    title: 'Portrait',
    link: '/mygallery#portrait',
    priceLink: '/pricing#portrait',
    image: '/sessions/portrait.jpg',
    price: '150$',
    about:
      '45 min session \n10 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[]',
    name: 'mini',
    title: 'Mini Session',
    link: '/mygallery#mini',
    priceLink: '/pricing#mini',
    image: '/sessions/mini.jpg',
    price: '120$',
    about: '30 min \n5 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[]q',
    name: 'smileandpaws',
    title: 'Smile and Paws',
    link: '/mygallery#smileandpaws',
    priceLink: '/pricing#smileandpaws',
    image: '/sessions/smileandpaws.jpg',
    price: '120$',
    about: '30 min \n5 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[]qw',
    name: 'business',
    title: 'Business',
    link: '/mygallery#business',
    priceLink: '/pricing#business',
    image: '/sessions/business.jpg',
    price: '250$',
    about:
      '1,5 hours session \n30 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[]qwe',
    name: 'wedding',
    title: 'Wedding',
    link: '/mygallery#wedding',
    priceLink: '/pricing#wedding',
    image: '/sessions/wedding.jpg',
    price: '450$',
    about:
      '3 hours session \n20-40* edited and retouched high resolution digital images',
    additional:
      '* 20 high resolution digital images (Photoshoot on a sailboat)  \n  40 high resolution digital images (On-location)',
    mustHave: ` 3 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[]qwer',
    name: 'food',
    title: 'Food Photography',
    link: '/mygallery#food',
    priceLink: '/pricing#food',
    image: '/sessions/food.jpg',
    price: '150$',
    about:
      '45 min session \n 15 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
    images: [],
    last: true,
  },
  {
    id: 'qwertyuiop[]qwert',
    name: 'pet',
    title: 'Pet Photography',
    link: '/mygallery#pet',
    priceLink: '/pricing#pet',
    image: '/sessions/pet.jpg',
    price: '120$',
    about: '30 min \n5 edited and retouched high resolution digital images',
    mustHave: ` 1 ${mustHaveText2}`,
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
//   fs.readdir('./uploads/mygallery', (err, files) => {
//     res.send(files.filter((file) => file !== '.DS_Store'));
//   });
// });

// new JSON with sessions and image arrays
// fs.readdir which is asynchronous
// router.get('/', (req, res) => {
//   const sessions = initialSessions.map((mygallery, ind) => {
//     let images = [];

//     fs.readdir(`./uploads/mygallery/${mygallery.id}`, (err, files) => {
//       images = files.filter((file) => file !== '.DS_Store');
//       sessions[ind] = { ...mygallery, images: images };
//     });
//   });

// new JSON with sessions and image arrays
// fs.readdirSync - this one is treaky because can stop Node server.
// But it's a simple application so there shouldn't be any mistakes. Let's leave it until refactoring.
router.get('/', (req, res) => {
  const sessions = initialSessions.map((session, ind) => {
    let images = fs
      // .readdirSync(`./uploads/gallery/${session.id}`)
      .readdirSync(`./uploads/gallery/${session.name}`)
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

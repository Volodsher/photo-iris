const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const fs = require('fs');

const initialGalleries = [
  {
    id: 'family',
    title: 'Family Fun',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'famA',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'famKr',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'famN',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'famO',
    title: '',
    link: '/pricing#family',
    images: [],
  },
  {
    id: 'famT',
    title: '',
    link: '/pricing#family',
    images: [],
    last: true,
  },
  {
    id: 'kids',
    title: "Kids' Adventures",
    link: '/pricing#kids',
    images: [],
    last: true,
  },
  {
    id: 'lovestory',
    title: 'Love Story',
    link: '/pricing#lovestory',
    images: [],
    last: true,
  },
  {
    id: 'maternity',
    title: 'Maternity',
    link: '/pricing#maternity',
    images: [],
    last: true,
  },
  {
    id: 'portrait',
    title: 'Portrait',
    link: '/pricing#portrait',
    images: [],
    last: true,
  },
  {
    id: 'mini',
    title: 'Mini Session',
    link: '/pricing#mini',
    images: [],
    last: true,
  },
  {
    id: 'smileandpaws',
    title: 'Smile and Paws',
    link: '/pricing#smileandpaws',
    images: [],
    last: true,
  },
  {
    id: 'business',
    title: 'Business',
    link: '/pricing#business',
    images: [],
    last: true,
  },
  {
    id: 'wedding',
    title: 'Wedding',
    link: '/pricing#wedding',
    images: [],
    last: true,
  },
  {
    id: 'food',
    title: 'Food Feast',
    link: '/pricing#food',
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

// new JSON with galleries and image arrays
// fs.readdir which is asynchronous
// router.get('/', (req, res) => {
//   const galleries = initialGalleries.map((gallery, ind) => {
//     let images = [];

//     fs.readdir(`./uploads/gallery/${gallery.id}`, (err, files) => {
//       images = files.filter((file) => file !== '.DS_Store');
//       galleries[ind] = { ...gallery, images: images };
//     });
//   });

// new JSON with galleries and image arrays
// fs.readdirSync - this one is treaky because can stop Node server.
// But it's a simple application so there shouldn't be any mistakes. Let's leave it until refactoring.
router.get('/', (req, res) => {
  const galleries = initialGalleries.map((gallery, ind) => {
    let images = fs
      .readdirSync(`./uploads/gallery/${gallery.id}`)
      .filter((file) => file !== '.DS_Store');
    return { ...gallery, images: images };
  });

  res.send(galleries);
});

//   setTimeout(() => res.send(galleries), 200);
// });

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  fs.readdir(`./uploads/gallery/${req.params.id}`, (err, files) => {
    res.send(files.filter((file) => file !== '.DS_Store'));
  });
});

module.exports = router;
// export default router;

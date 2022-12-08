const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  gallery: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Picture = mongoose.model('picture', PictureSchema);

// export default Picture;
module.exports = Picture;

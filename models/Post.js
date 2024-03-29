const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // since we have only one post author we actuelly don't need to have userId
  // user: {
  //   type: Schema.Types.ObjectId,
  // },
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('post', PostSchema);

// export default mongoose.model('post', PostSchema);
module.exports = Post;

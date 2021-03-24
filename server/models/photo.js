const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  imageURL: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true,
    maxlength: 1000,
    minlength: 5
  },
  createdAt: {
    type: Date,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'like'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

module.exports = mongoose.model('photo', PhotoSchema);
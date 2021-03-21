const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
  timestamp: {
    type: Date,
    required: true
  },
  numLikes: {
    type: Number,
    required: true,
    min: 0
  },
  userIdOfAuthor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('post', PostSchema);
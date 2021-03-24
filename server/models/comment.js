const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    required: true
  },
  listOfReplies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      required: true
    }
  ],
  photoId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('comment', CommentSchema);
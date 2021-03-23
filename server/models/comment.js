const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userIdOfCommenter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
      ref: 'Comment',
      required: true
    }
  ],
  postId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('comment', CommentSchema);
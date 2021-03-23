const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userIdOfLiker: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  contentId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['photo', 'comment']
  },
  likedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('like', LikeSchema);
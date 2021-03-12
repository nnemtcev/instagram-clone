const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userIdOfLiker: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Post', 'Comment']
  },
  timestamp: {
    type: Date,
    required: true
  }
});

LikeSchema
.virtual('url')
.get(() => {
  const contentType = this.onModel === 'Post' ? 'posts' : 'comments';
  return `/${contentType}/${this.on}/${this.id}`;
});

module.exports = mongoose.model('like', LikeSchema);